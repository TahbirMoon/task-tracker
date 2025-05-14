const express = require('express');
const cors = require('cors');
const path = require('path');  // Built-in module to handle file paths
const db = require('./db');    // Our SQLite database connection
const app = express();
const PORT = 3000;

// Enable CORS and JSON parsing for incoming requests
app.use(cors());
app.use(express.json());

// Serve frontend files (HTML, CSS, JS) from the 'frontend' folder
app.use(express.static(path.join(__dirname, '../frontend')));

// ==================== ROUTES ====================

// Get all tasks from the database
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// Add a new task to the database
app.post('/tasks', (req, res) => {
  const { title, dueDate } = req.body;
  db.run('INSERT INTO tasks (title, dueDate) VALUES (?, ?)', [title, dueDate], function (err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).json({ id: this.lastID });  // Respond with the ID of the new task
  });
});

// Mark a task as completed
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.run('UPDATE tasks SET completed = 1 WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).send(err.message);
    res.sendStatus(200);  // Task marked as completed
  });
});

// ✅ Update an existing task's title and dueDate
app.put('/tasks/update/:id', (req, res) => {
  const { id } = req.params;
  const { title, dueDate } = req.body;

  db.run(
    'UPDATE tasks SET title = ?, dueDate = ? WHERE id = ?',
    [title, dueDate, id],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.sendStatus(200);  // Task updated
    }
  );
});

// Delete a task from the database
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).send(err.message);
    res.sendStatus(200);  // Task deleted
  });
});

// Serve the frontend HTML when visiting root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
