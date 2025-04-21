# Phase 2: Basic Structure and Main Functionalities – Task Tracker

## Project Overview
This project is a **Task Tracker** web application, developed as part of the **Advanced Web Development** course. The application allows users to manage tasks by adding, completing, and deleting them. The backend is built with **Node.js** using **Express.js**, and the database is handled using **SQLite**. The frontend is implemented with **HTML**, **CSS**, and **vanilla JavaScript**.

## Technologies Used
- **Backend**:
  - Node.js
  - Express.js
  - SQLite3
- **Frontend**:
  - HTML
  - CSS
  - Vanilla JavaScript
- **Development Tools**:
  - Visual Studio Code
  - Git (for version control)

## Functionalities Implemented
### 1. Add Task
- **Functionality**: Users can add new tasks with a title and an optional due date.
- **Backend**: The task is added to the **SQLite** database using a `POST` request to the `/tasks` endpoint.
- **Frontend**: The task is displayed in the task list once it’s successfully added.

**Code Snippet:**
```js
// Add a new task
function addTask(event) {
  event.preventDefault();  // Prevent form submission from refreshing the page

  const title = document.getElementById('title').value;
  const dueDate = document.getElementById('dueDate').value;

  fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, dueDate }),
  })
    .then(() => {
      fetchTasks(); // Refresh the task list after adding the new task
      document.getElementById('task-form').reset(); // Clear the form fields
    })
    .catch(error => console.error('Error:', error));
}

2. Mark Task as Complete
Functionality: Users can mark tasks as complete by clicking the Complete button. Once completed, the task's text color changes to grey, and a Completed label appears.

Backend: The completed field in the database is updated using a PUT request to the /tasks/:id endpoint.

Frontend: The task is visually updated by changing its color and disabling the Complete button.

Code Snippet:

js
Copy
// Mark a task as complete
function markComplete(id, button, taskElement) {
  fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'PUT',
  })
  .then(response => {
    if (response.ok) {
      taskElement.style.color = '#808080';  // Change text color to grey for completed tasks
      taskElement.style.backgroundColor = '#d3ffd3';  // Green background

      // Add "Completed" label
      const completedLabel = document.createElement('span');
      completedLabel.textContent = ' [Completed]';
      completedLabel.style.color = 'green';  // Optional: make the "Completed" label green
      taskElement.appendChild(completedLabel);

      // Change the button text to "Completed" and disable it
      button.textContent = 'Completed';
      button.disabled = true;
    } else {
      console.error('Failed to mark task as complete');
    }
  })
  .catch(error => console.error('Error:', error));
}
3. Delete Task
Functionality: Users can delete tasks by clicking the Delete button next to the task.

Backend: A DELETE request is made to the /tasks/:id endpoint to remove the task from the SQLite database.

Frontend: The task is removed from the UI upon successful deletion.

Code Snippet:

js
Copy
// Delete a task
function deleteTask(id) {
  fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) {
        fetchTasks();  // Refresh the task list after deleting the task
      } else {
        console.error('Failed to delete task');
      }
    })
    .catch(error => console.error('Error:', error));
}
Code Quality and Documentation
Code Structure: The project is divided into clear sections for the backend (handling database queries) and frontend (managing UI interactions). Each function is responsible for one action (adding, completing, or deleting tasks).

Documentation: Each function has been well-documented with inline comments explaining the logic. The code is clear, and the structure is organized for future scalability.

Error Handling:

Errors are handled by using catch statements to log any issues during the fetch calls (e.g., when adding, completing, or deleting tasks).

If any errors occur on the backend (like a failed database query), an error message is returned to the frontend.

Testing and Error Handling
Manual Testing:
Add Task: Test the functionality by adding a new task via the form. After submitting, the task should appear in the task list.

Complete Task: Mark a task as complete and ensure that:

The task text color changes to grey.

A [Completed] label appears.

The Complete button is disabled.

Delete Task: Click the Delete button and verify that the task disappears from the list and the database.

Error Handling:
If a task cannot be added, completed, or deleted, an error message is logged to the console for debugging.

The app prevents users from interacting with the Complete button for tasks that are already marked as complete.

Challenges and Lessons Learned
Challenges:
Asynchronous Operations: Managing asynchronous operations in JavaScript was challenging, especially when ensuring that the frontend updates after tasks are added, completed, or deleted. Using Promises and the fetch API helped in handling these asynchronous operations.

UI Design: Initially, the design was basic, but later improvements were made to provide better feedback for users (e.g., marking completed tasks with a color change and adding a "Completed" label).

Lessons Learned:
Backend-Frontend Integration: The app highlighted the importance of integrating backend and frontend components correctly (sending data via HTTP requests and updating the UI accordingly).

UI/UX Design: Even a simple interface can significantly improve the user experience. Adding small visual cues (like grey text for completed tasks) enhances usability.
