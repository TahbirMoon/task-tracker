# 📘 Phase 3 – Further Development  
**Project Name**: Task Tracker  
**Student**: Tahbir Ahmed Moon  
**Phase**: 3 – Further Development  
**Repository**: https://github.com/TahbirMoon/task-tracker  

---

## ✅ 1. Feature Added – Edit Task

To improve user experience and flexibility, I added an **Edit Task** feature. This allows users to modify the title and due date of a task after it's been created — something that wasn’t possible in the original version. This makes the app feel more realistic and user-friendly.

---

## 🔍 2. Related Use Case from Phase 1

This feature expands on the original use case:

> “The user wants to manage their tasks flexibly, including making changes after creation.”

In Phase 1, the system allowed adding, deleting, and marking tasks as complete, but not editing. This feature fills that gap.

---

## 🔄 3. Implementation

### ✅ Frontend Updates

I created a new **Edit** button for each task that opens `prompt()` dialogs to input a new title and due date. Then a `PUT` request updates the task on the server.

#### 🔧 Code Added to `frontend/app.js`:

```js
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

#### 🧩 Code Modified Inside `fetchTasks()` Loop:

```js
const editButton = document.createElement('button');
editButton.textContent = 'Edit';
editButton.classList.add('edit');
editButton.addEventListener('click', () => editTask(task, li));
li.appendChild(editButton);
```

---

### ✅ Backend Update

I added a new `PUT` route to `backend/server.js` to handle task updates:

```js
app.put('/tasks/update/:id', (req, res) => {
  const { id } = req.params;
  const { title, dueDate } = req.body;

  db.run(
    'UPDATE tasks SET title = ?, dueDate = ? WHERE id = ?',
    [title, dueDate, id],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.sendStatus(200);
    }
  );
});
```

---

### ✅ Styling

The new Edit button was styled in `frontend/style.css` to match the existing buttons:

```css
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

## 🧠 4. Challenges and Solutions

| Challenge | Solution |
|----------|----------|
| Letting users change values easily without a full form | Used `prompt()` as a temporary quick solution |
| Avoiding errors with empty inputs | Checked for `null` and handled fetch errors |
| Keeping UI updated | Called `fetchTasks()` after a successful update |

---

## 🧾 5. Summary of Modified Files

| File                 | Description                                                   |
|----------------------|---------------------------------------------------------------|
| `frontend/app.js`    | Added `editTask()` function and Edit button logic              |
| `backend/server.js`  | Added `/tasks/update/:id` route for PUT requests               |
| `frontend/style.css` | Styled the new Edit button                                     |
| `index.html`         | No change (buttons are created dynamically via JavaScript)     |

---

## ⏱️ 6. Time Spent


| Date       | Used hours | Subject(s)                   | Outcome                                      |
|------------|------------|------------------------------|----------------------------------------------|
| 25.04.2025 | 3.0        | Edit Task feature (frontend) | Added `editTask()` function with prompt input |
| 26.04.2025 | 2.5        | Styling + layout testing     | Styled Edit button and tested interactions   |
| 27.04.2025 | 3.0        | Report writing               | Wrote and polished full Phase 3 markdown     |
| **Total**  | **8.5**    | –                            | –                                            |


---

## ✅ 7. Conclusion

This improvement made the app feel more real and practical. I learned how to connect the frontend and backend to update data, how to manage UI state after changes, and how to style and insert new features without breaking the layout. The Edit button works well and adds flexibility to the task tracker.

---
