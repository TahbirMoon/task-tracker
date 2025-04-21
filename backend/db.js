const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Use absolute path to the database in the `database/` folder
const db = new sqlite3.Database(path.join(__dirname, '../database/tasks.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to the SQLite database');
  }
});

// Create table if it doesn't already exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      dueDate TEXT,
      completed INTEGER DEFAULT 0
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Tasks table ensured');
    }
  });
});

module.exports = db;
