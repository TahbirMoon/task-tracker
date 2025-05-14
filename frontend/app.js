document.addEventListener('DOMContentLoaded', () => {
  fetchTasks();

  document.getElementById('task-form').addEventListener('submit', addTask);
});

function fetchTasks() {
  fetch('http://localhost:3000/tasks')
    .then(response => response.json())
    .then(tasks => {
      const taskList = document.getElementById('task-list');
      taskList.innerHTML = '';

      tasks.forEach(task => {
        const li = document.createElement('li');

        const taskText = document.createElement('span');
        taskText.textContent = `${task.title} - Due: ${task.dueDate || 'N/A'}`;
        li.appendChild(taskText);

        if (task.completed) {
          taskText.style.color = '#808080';

          const completedLabel = document.createElement('span');
          completedLabel.textContent = ' [Completed]';
          completedLabel.style.color = 'green';
          li.appendChild(completedLabel);
        }

        const completeButton = document.createElement('button');
        if (task.completed) {
          completeButton.textContent = 'Completed';
          completeButton.disabled = true;
        } else {
          completeButton.textContent = 'Complete';
          completeButton.classList.add('complete');
          completeButton.addEventListener('click', () => markComplete(task.id, completeButton, taskText));
        }

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(task, li));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(completeButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
      });
    })
    .catch(error => console.error('Error:', error));
}

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
      } else {
        console.error('Failed to mark task as complete');
      }
    })
    .catch(error => console.error('Error:', error));
}

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

// ✅ Updated this part only
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
          fetchTasks();
        } else {
          console.error('Failed to update task');
        }
      })
      .catch(error => console.error('Error:', error));
  }
}
