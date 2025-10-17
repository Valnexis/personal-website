import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import cors from "cors";
import seedContent from "../data/a.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Open the SQLite database
const dbPromise = open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
});

async function initDB() {
    try {
        const db = await dbPromise;
        // create table if not exists
        await db.exec(`
        CREATE TABLE IF NOT EXISTS content (
            id TEXT PRIMARY KEY,
            title TEXT,
            subtitle TEXT,
            content TEXT,
            type TEXT
        );
        `);

        // check if table has rows
        const row = await db.get("SELECT COUNT(*) as cnt FROM content;");
        const count = row ? row.cnt : 0;
        if (count === 0) {
            // seed from seedContent
            const insertStmt = `INSERT OR REPLACE INTO content (id, title, subtitle, content, type) VALUES (?, ?, ?, ?, ?);`;
            for (const item of seedContent) {
                await db.run(insertStmt, item.id, item.title, item.subtitle || null, item.content, item.type);
            }
            console.log(`Seeded ${seedContent.length} rows into content table`);
        } else {
            console.log(`content table already has ${count} rows`);
        }
    } catch (err) {
        console.error('Failed to initialize DB', err);
        throw err;
    }
}

// Initialize DB immediately
initDB().catch((e) => {
    console.error('DB init error:', e);
});

// Default route
app.get("/", (req, res) => {
    res.send("API is running. Use /api/content to fetch data.");
});

// API endpoint to fetch all content
app.get("/api/content", async (req, res) => {
    try {
        const db = await dbPromise;
        const content = await db.all("SELECT * FROM content ORDER BY rowid");
        res.json(content);
    } catch (error) {
        console.error('Error in /api/content:', error);
        res.status(500).json({ error: "Failed to fetch content" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});