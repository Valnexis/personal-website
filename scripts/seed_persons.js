import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import seedContent from '../src/data/a.js';

async function main() {
  const db = await open({ filename: './database.sqlite', driver: sqlite3.Database });
  const persons = [
    { id: 'person2', displayName: 'Person 2' },
    { id: 'person3', displayName: 'Person 3' },
  ];

  const insertStmt = `INSERT OR REPLACE INTO content (id, person_id, title, subtitle, content, type) VALUES (?, ?, ?, ?, ?, ?);`;

  for (const p of persons) {
    const row = await db.get('SELECT COUNT(*) as cnt FROM content WHERE person_id = ?', p.id);
    const count = row ? row.cnt : 0;
    if (count === 0) {
      console.log(`Seeding ${p.id} (${seedContent.length} rows)`);
      for (const item of seedContent) {
        const rowId = `${p.id}_${item.id}`;
        const title = `${item.title} (${p.displayName})`;
        const subtitle = item.subtitle || null;
        const body = item.content;
        const type = item.type;
        await db.run(insertStmt, rowId, p.id, title, subtitle, body, type);
      }
      console.log(`Seeded ${seedContent.length} rows for ${p.id}`);
    } else {
      console.log(`Already have ${count} rows for ${p.id}`);
    }
  }

  const counts = await db.all("SELECT person_id, COUNT(*) as cnt FROM content GROUP BY person_id;");
  console.log('Counts by person:', counts);
  await db.close();
}

main().catch(err => { console.error(err); process.exit(1); });

