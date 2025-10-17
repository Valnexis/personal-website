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
        // create table if not exists (include person_id)
        await db.exec(`
        CREATE TABLE IF NOT EXISTS content (
            id TEXT PRIMARY KEY,
            person_id TEXT,
            title TEXT,
            subtitle TEXT,
            content TEXT,
            type TEXT
        );
        `);

        // Ensure person_id column exists (for older DBs without it)
        const cols = await db.all("PRAGMA table_info('content');");
        const hasPersonId = cols.some(c => c.name === 'person_id');
        if (!hasPersonId) {
            await db.exec("ALTER TABLE content ADD COLUMN person_id TEXT;");
            console.log('Added person_id column to content table');
        }

        // MIGRATION: if there are existing rows without a person_id, assign them to person1
        const orphans = await db.all("SELECT id, title FROM content WHERE person_id IS NULL OR person_id = '';");
        if (orphans && orphans.length > 0) {
            console.log(`Found ${orphans.length} existing rows without person_id — migrating to person1`);
            for (const row of orphans) {
                const oldId = row.id;
                const newId = `person1_${oldId}`;
                // Update the row: set new id and person_id to person1
                // If newId already exists, skip to avoid PK conflict
                const exists = await db.get("SELECT 1 FROM content WHERE id = ?", newId);
                if (exists) {
                    // remove the old row to avoid duplicate content (or keep — here we'll delete the old one)
                    await db.run("DELETE FROM content WHERE id = ?", oldId);
                } else {
                    await db.run("UPDATE content SET id = ?, person_id = ? WHERE id = ?", newId, 'person1', oldId);
                }
            }
            console.log('Migration complete');
        }

        // check per-person rows and seed if missing
        const persons = [
            { id: 'person1', displayName: 'You (Person 1)' },
            { id: 'person2', displayName: 'Person 2' },
            { id: 'person3', displayName: 'Person 3' },
        ];

        const insertStmt = `INSERT OR REPLACE INTO content (id, person_id, title, subtitle, content, type) VALUES (?, ?, ?, ?, ?, ?);`;

        for (const p of persons) {
            const row = await db.get("SELECT COUNT(*) as cnt FROM content WHERE person_id = ?", p.id);
            const count = row ? row.cnt : 0;
            if (count === 0) {
                console.log(`Seeding content for ${p.id}`);
                for (const item of seedContent) {
                    const rowId = `${p.id}_${item.id}`;
                    const title = p.id === 'person1' ? item.title : `${item.title} (${p.displayName})`;
                    const subtitle = item.subtitle || null;
                    const body = item.content;
                    const type = item.type;
                    await db.run(insertStmt, rowId, p.id, title, subtitle, body, type);
                }
                console.log(`Seeded ${seedContent.length} rows for ${p.id}`);
            } else {
                console.log(`content table already has ${count} rows for ${p.id}`);
            }
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

// API endpoint to fetch all content — supports ?person_id=person1
app.get("/api/content", async (req, res) => {
    try {
        const db = await dbPromise;
        const personId = req.query.person_id || req.query.person || null;
        let content;
        if (personId) {
            content = await db.all("SELECT * FROM content WHERE person_id = ? ORDER BY rowid", personId);
        } else {
            // if no person specified, default to person1
            content = await db.all("SELECT * FROM content WHERE person_id = ? ORDER BY rowid", 'person1');
        }
        res.json(content);
    } catch (error) {
        console.error('Error in /api/content:', error);
        res.status(500).json({ error: "Failed to fetch content" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});