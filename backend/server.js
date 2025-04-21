const express = require('express');
const cors = require('cors');
const path = require('path');  // To handle paths correctly
const db = require('./db');  // Import database connection
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());  // Middleware to parse JSON requests

// Serve static files (like index.html, style.css, app.js) from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// API routes
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

app.post('/tasks', (req, res) => {
  const { title, dueDate } = req.body;
  db.run('INSERT INTO tasks (title, dueDate) VALUES (?, ?)', [title, dueDate], function(err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).json({ id: this.lastID });
  });
});

// Mark task as completed
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;  // Get the task ID from the URL parameter
  db.run('UPDATE tasks SET completed = 1 WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).send(err.message);  // If there's an error, return it
    }
    res.sendStatus(200);  // Successfully updated, return status 200
  });
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;  // Get the task ID from the URL parameter
  db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).send(err.message);
    res.sendStatus(200);  // Successfully deleted, return status 200
  });
});

// Root route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
