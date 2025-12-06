// Tasks page
checkAuth();

let filterMode = 'pending';

async function loadTasks() {
  try {
    const completed = filterMode === 'completed';
    const response = await tasksAPI.getAll(completed);
    const tasks = response.tasks || [];
    displayTasks(tasks);
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
}

function displayTasks(tasks) {
  const container = document.getElementById('tasksList');
  
  if (!tasks || tasks.length === 0) {
    container.innerHTML = `<p>No ${filterMode} tasks</p>`;
    return;
  }

  container.innerHTML = tasks.map(task => {
    const daysUntil = getDaysUntil(task.dueDate);
    const isOverdue = daysUntil < 0 && !task.completed;
    
    return `
      <div class="list-item" style="opacity: ${task.completed ? 0.6 : 1}; border-left: 4px solid ${getPriorityColor(task.priority)}">
        <div class="item-info">
          <div class="item-title" style="text-decoration: ${task.completed ? 'line-through' : 'none'}">
            ${task.title}
          </div>
          <div class="item-details">
            Assigned to: ${task.assignedTo} | Due: ${formatDateDisplay(task.dueDate)}
            ${task.description ? `<br/>Description: ${task.description}` : ''}
            <span class="${getPriorityClass(task.priority)}"> • ${task.priority}</span>
            ${isOverdue ? '<span style="color: #e74c3c;"> • OVERDUE</span>' : ''}
          </div>
        </div>
        <div class="item-actions">
          ${!task.completed ? 
            `<button onclick="completeTask('${task._id}')" class="btn btn-secondary small">Complete</button>` :
            ''
          }
          <button onclick="deleteTask('${task._id}')" class="btn btn-danger small">Delete</button>
        </div>
      </div>
    `;
  }).join('');
}

async function addTask(e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const assignedTo = document.getElementById('assignedTo').value;
  const dueDate = document.getElementById('taskDueDate').value;
  const priority = document.getElementById('taskPriority').value;
  const category = document.getElementById('taskCategory').value;

  try {
    const response = await tasksAPI.create({
      title,
      description,
      assignedTo,
      dueDate,
      priority,
      category,
    });

    if (response.success) {
      document.getElementById('taskForm').reset();
      loadTasks();
      alert('Task created successfully!');
    }
  } catch (error) {
    console.error('Error adding task:', error);
    alert('Error adding task');
  }
}

async function completeTask(id) {
  try {
    const response = await tasksAPI.complete(id);
    if (response.success) {
      loadTasks();
    }
  } catch (error) {
    console.error('Error completing task:', error);
  }
}

async function deleteTask(id) {
  if (confirm('Are you sure?')) {
    try {
      const response = await tasksAPI.delete(id);
      if (response.success) {
        loadTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }
}

function filterTasks(mode) {
  filterMode = mode;
  document.querySelectorAll('.tab-button').forEach((btn, idx) => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  loadTasks();
}

document.getElementById('taskDueDate').valueAsDate = new Date();
document.getElementById('taskForm').addEventListener('submit', addTask);

loadTasks();
