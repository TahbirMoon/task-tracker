# Phase 2 – Basic Structure and Main Functionalities – Task Tracker

## 1. Environment (Quantitative)

| Category    | Used                          |
|-------------|-------------------------------|
| Environment | Local (localhost:3000)        |
| Backend     | Node.js + Express             |
| Frontend    | HTML + Vanilla JavaScript     |
| Database    | SQLite                        |

---

## 2. Project Overview

For this phase of the course, I created a simple Task Tracker web app where users can add new tasks, mark them as completed, and delete them. I used Node.js and Express to build the backend API, and SQLite as the database. On the frontend, I kept things basic with HTML, CSS, and vanilla JavaScript—no frontend frameworks.

---

## 3. Development Environment

I ran everything locally on my laptop. The backend API runs on `localhost:3000`, and the frontend is just opened directly in the browser.

```bash
# Start backend server
cd backend
node server.js
```

```text
# Open frontend manually
frontend/index.html
```

---

## 4. Folder Structure

```text
task-tracker/
├── backend/
│   ├── db.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── app.js
│   └── style.css
├── database/
│   └── tasks.db
├── phase2-basic-structure/
│   ├── 2_Basic_structure_and_main_functionalities.md
│   └── logbook.md
```

---

## 5. Database Design

I used a single SQLite table called `tasks` to store task information.

| Field     | Type    | Description                             |
|-----------|---------|-----------------------------------------|
| id        | INTEGER | Auto-incremented primary key            |
| title     | TEXT    | Task name                               |
| dueDate   | TEXT    | Optional due date                       |
| completed | BOOLEAN | 0 = not done, 1 = completed             |

---

## 6. Functionalities Implemented

### ✅ 1. Add Task

Users can submit a form with a task name and an optional due date. It sends a POST request to the backend and saves the data to the database.

```js
function addTask(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const dueDate = document.getElementById('dueDate').value;

  fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, dueDate }),
  })
  .then(() => {
    fetchTasks();
    document.getElementById('task-form').reset();
  })
  .catch(error => console.error('Error:', error));
}
```

---

### ✅ 2. Mark Task as Complete

Clicking "Complete" updates the task using a PUT request. Once done, it turns grey and adds a "Completed" label. The button also gets disabled.

```js
function markComplete(id, button, taskElement) {
  fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'PUT',
  })
  .then(response => {
    if (response.ok) {
      taskElement.style.color = '#808080';
      taskElement.style.backgroundColor = '#d3ffd3';

      const completedLabel = document.createElement('span');
      completedLabel.textContent = ' [Completed]';
      completedLabel.style.color = 'green';
      taskElement.appendChild(completedLabel);

      button.textContent = 'Completed';
      button.disabled = true;
    } else {
      console.error('Failed to mark task as complete');
    }
  })
  .catch(error => console.error('Error:', error));
}
```

---

### ✅ 3. Delete Task

This deletes the task using a DELETE request to the backend, then refreshes the list.

```js
function deleteTask(id) {
  fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (response.ok) {
      fetchTasks();
    } else {
      console.error('Failed to delete task');
    }
  })
  .catch(error => console.error('Error:', error));
}
```

---

## 7. Code Quality and Documentation

- I kept all frontend and backend files separate for clarity.
- Function names clearly reflect what they do.
- There are comments in the code to explain key steps.
- The folder structure is clean and easy to understand.

---

## 8. Testing and Error Handling

### Manual Testing

| Test Case        | What I Did                           | What I Expected                     | Result |
|------------------|--------------------------------------|-------------------------------------|--------|
| Add Task         | Submitted a new task                 | It appeared in the list             | ✅     |
| Complete Task    | Clicked the Complete button          | Text turned grey + "Completed" label | ✅     |
| Delete Task      | Clicked Delete on a task             | Task disappeared from list & DB     | ✅     |
| Empty Task       | Tried submitting empty form          | Blocked by HTML validation          | ✅     |
| Delete Completed | Deleted a completed task             | It was removed successfully         | ✅     |

### Error Handling

- All fetch requests have `.catch()` for errors.
- Backend sends proper status codes (like 200, 500).
- Completed tasks can’t be interacted with again.

---

## 9. User Interface and Interaction

- Simple form with task name and optional date.
- Each task shows two buttons: Complete & Delete.
- Completed tasks turn grey and get a green label.
- Basic, but works well and clearly.

---

## 10. Challenges and Lessons Learned

### Challenges

- Making sure tasks update correctly after fetch()
- Styling based on task status (especially dynamically)

### What I Learned

- I got a better grasp of how frontend and backend connect.
- Even a simple UI can feel much better with good feedback.
- Testing small features early saves a lot of debugging time later.

---

## 11. Hours Spent (Summary)

I tracked my work across different days and logged it in the table below.


| Date       | Used hours | Subject(s)                   | Outcome                                    |
|------------|------------|------------------------------|--------------------------------------------|
| 20.04.2025 | 2.5        | Initial planning and layout  | Designed basic UI and folder structure     |
| 21.04.2025 | 3          | Add Task feature             | Implemented task creation logic            |
| 22.04.2025 | 3.5        | Complete Task feature        | Added logic to mark tasks as done          |
| 23.04.2025 | 2.5        | Delete Task feature          | Built delete button + backend route        |
| 24.04.2025 | 2.5        | Testing and debugging        | Fixed styling and fetch refresh issues     |
| 25.04.2025 | 2          | UI polish and minor changes  | Adjusted layout for completed tasks        |
| 26.04.2025 | 2.5        | Writing this report          | Wrote and formatted Phase 2 markdown       |
| 27.04.2025 | 1.5        | Git + cleanup                | Organized repo and pushed to GitHub        |
| **Total**  | **20**     | –                            | –                                          |



---

## 12. Repository and Version Link

- GitHub Repo: https://github.com/TahbirMoon/task-tracker.git 
- Version for submission: *( https://github.com/TahbirMoon/task-tracker/releases/tag/phase2-final )*
