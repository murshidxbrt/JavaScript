const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const filterSelect = document.getElementById('filterSelect');

addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
        updateLocalStorage();
    }
});

taskList.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
        const taskItem = event.target.parentNode;
        taskItem.classList.toggle('completed');
        updateLocalStorage();
    }
});

taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteButton')) {
        const taskItem = event.target.parentNode;
        taskList.removeChild(taskItem);
        updateLocalStorage();
    }
});

filterSelect.addEventListener('change', () => {
    const filterValue = filterSelect.value;
    const taskItems = taskList.querySelectorAll('li');

    taskItems.forEach((taskItem) => {
        switch (filterValue) {
            case 'all':
                taskItem.style.display = 'block';
                break;
            case 'active':
                taskItem.style.display = taskItem.classList.contains('completed') ? 'none' : 'block';
                break;
            case 'completed':
                taskItem.style.display = taskItem.classList.contains('completed') ? 'block' : 'none';
                break;
        }
    });
});

function addTask(taskText) {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <input type="checkbox">
        <span>${taskText}</span>
        <button class="deleteButton">Delete</button>
    `;

    taskList.appendChild(taskItem);
}

function updateLocalStorage() {
    const taskItems = taskList.querySelectorAll('li');
    const tasks = [];

    taskItems.forEach((taskItem) => {
        const taskText = taskItem.querySelector('span').textContent;
        const isCompleted = taskItem.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage on page load
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task) => {
        addTask(task.text);
        const taskItem = taskList.lastElementChild;
        if (task.completed) {
            taskItem.classList.add('completed');
        }
    });
}

loadTasksFromLocalStorage();
