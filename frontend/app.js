document.addEventListener('DOMContentLoaded', () => {
  fetchTasks(); // Fetch and display tasks when the page loads

  // Event listener for form submission to add tasks
  document.getElementById('task-form').addEventListener('submit', addTask);
});

// Fetch all tasks from the backend and display them
function fetchTasks() {
  fetch('http://localhost:3000/tasks')
    .then(response => response.json())
    .then(tasks => {
      const taskList = document.getElementById('task-list');
      taskList.innerHTML = '';  // Clear current list

      tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.title} - Due: ${task.dueDate || 'N/A'}`;

        // Add a visual indicator for completed tasks (grey text color or "Completed" label)
        if (task.completed) {
          li.style.color = '#808080';  // Change text color to grey for completed tasks
          
          // Add "Completed" label
          const completedLabel = document.createElement('span');
          completedLabel.textContent = ' [Completed]';
          completedLabel.style.color = 'green';  // Optional: make the "Completed" label green
          li.appendChild(completedLabel);
        }

        // Create the Complete/Undo button
        const completeButton = document.createElement('button');
        if (task.completed) {
          completeButton.textContent = 'Completed'; // If the task is complete, show 'Completed'
          completeButton.disabled = true;  // Disable the button so it cannot be clicked again
        } else {
          completeButton.textContent = 'Complete';
          completeButton.classList.add('complete');
          completeButton.addEventListener('click', () => markComplete(task.id, completeButton, li));  // Mark task as complete when clicked
        }

        // Delete task button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
      });
    })
    .catch(error => console.error('Error:', error));
}

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

// Mark a task as complete
function markComplete(id, button, taskElement) {
  fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'PUT',
  })
  .then(response => {
    if (response.ok) {
      // Update the UI to reflect the completion
      taskElement.style.color = '#808080';  // Change text color to grey for completed tasks
      taskElement.style.backgroundColor = '#d3ffd3';  // Green background

      // Add "Completed" label
      const completedLabel = document.createElement('span');
      completedLabel.textContent = ' [Completed]';
      completedLabel.style.color = 'green';  // Optional: make the "Completed" label green
      taskElement.appendChild(completedLabel);

      // Change the button text to "Completed" and disable it
      button.textContent = 'Completed';
      button.disabled = true;  // Disable the button to prevent re-clicking
    } else {
      console.error('Failed to mark task as complete');
    }
  })
  .catch(error => console.error('Error:', error));
}

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
