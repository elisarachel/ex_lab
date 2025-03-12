const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'tasks.db');

const db = new sqlite3.Database(dbPath, (err) => {
	if (err) console.error(err.message);
	console.log('Connected to SQLite database.');
});

db.serialize(() => {
	db.run(`
		CREATE TABLE IF NOT EXISTS tasks (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT NOT NULL,
			description TEXT,
			completed BOOLEAN DEFAULT 0
		)
  	`);
});
	
module.exports = db;