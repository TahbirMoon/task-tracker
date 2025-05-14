# 📘 Phase 3 – Further Development  
**Project Name**: Task Tracker  
**Student**: Tahbir Ahmed Moon  
**Phase**: 3 – Further Development  
**Repository**: https://github.com/TahbirMoon/task-tracker  

---

## ✅ 1. Edit Task Feature

To improve the user experience and make the task system more flexible, I added a feature that allows users to edit the task title and due date.

### 🔧 Code Added to `frontend/app.js`:

```js
// Edit task title or due date
function editTask(task, li) {
  const newTitle = prompt('Edit task title:', task.title);
  const newDueDate = prompt('Edit due date (YYYY-MM-DD):', task.dueDate);

  if (newTitle !== null) {
    fetch(`http://localhost:3000/tasks/update/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTitle,
        dueDate: newDueDate,
      }),
    })
    .then(response => {
      if (response.ok) {
        fetchTasks(); // Refresh task list
      } else {
        console.error('Failed to update task');
      }
    })
    .catch(error => console.error('Error:', error));
  }
}
```

### 🧩 Code Modified in Task List Loop (inside `fetchTasks`):

```js
// Create "Edit" button
const editButton = document.createElement('button');
editButton.textContent = 'Edit';
editButton.classList.add('edit');
editButton.addEventListener('click', () => editTask(task, li));
li.appendChild(editButton);
```

---

## 🧠 2. Backend Route to Update Task Data

To support editing on the backend, I added a new route to handle updates.

### 🔧 Code Added to `backend/server.js`:

```js
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
```

---

## 🎨 3. Style Enhancements

I added styling to make the new Edit button match the existing UI.

### ✨ Code Added to `frontend/style.css`:

```css
/* 🖋️ Edit button */
button.edit {
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  margin-left: 10px;
  cursor: pointer;
}
```

---

## ✅ 4. Other Minor Frontend Improvements

I also improved how the app shows completed tasks visually and handled button behavior more cleanly.

### ✨ Modified `markComplete()` function in `app.js`:

```js
function markComplete(id, button, taskText) {
  fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'PUT',
  })
  .then(response => {
    if (response.ok) {
      taskText.style.color = '#808080';
      button.textContent = 'Completed';
      button.disabled = true;

      const completedLabel = document.createElement('span');
      completedLabel.textContent = ' [Completed]';
      completedLabel.style.color = 'green';
      taskText.parentNode.appendChild(completedLabel);
    }
  })
  .catch(error => console.error('Error:', error));
}
```

---

## 🧾 Summary of Modified Files in This Phase

| File                 | Description                                                   |
|----------------------|---------------------------------------------------------------|
| `frontend/app.js`    | Added `editTask()` function, button creation, UI logic updates |
| `backend/server.js`  | Added `/tasks/update/:id` route for PUT request               |
| `frontend/style.css` | Styled the new Edit button                                    |
| `index.html`         | No structure change needed (buttons created via JavaScript)   |

---

## ⏱️ Time Spent

| Date       | Task                                             | Hours |
|------------|--------------------------------------------------|--------|
| Apr 25     | Coded the Edit Task feature                      | 3      |
| Apr 26     | Updated HTML/CSS, tested layout + behavior       | 2.5    |
| Apr 27     | Wrote and polished this full report              | 3      |
| **Total**  |                                                  | **8.5**  |

---

## ✅ Conclusion

This feature made the task app feel more real and useful. I learned how to send updates from the frontend to the backend, how to modify multiple parts of the codebase safely, and how to keep the UI clean while adding new features. The Edit button works smoothly, and the overall interaction is better than before. I’m happy with how this turned out, and it improves the app’s functionality in a practical way.
