import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./data/attacks.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS attacks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            targetUrl TEXT,
            attackMethod TEXT,
            status TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

export function saveAttackLog(targetUrl: string, attackMethod: string, status: string = 'started') {
    db.run(
        'INSERT INTO attacks (targetUrl, attackMethod, status) VALUES (?, ?, ?)',
        [targetUrl, attackMethod, status]
    );
}
