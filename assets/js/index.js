document.addEventListener('DOMContentLoaded', () => {
  // secret page
  const getButton = document.getElementById('retrieve');
  getButton.addEventListener('click', loadTasks);

  const addButton = document.getElementById('task-button');
  addButton.addEventListener('click', addTask);
});


const loadTasks = () => {
  fetch('api/tasks')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('task-list');

      list.innerHTML = ''; // reset list each time

      data.forEach(item => {
        const task = document.createElement('li');
        task.setAttribute('id', item.id);
        task.innerText = item.task;

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('id', item.id);
        deleteButton.innerText = 'X';
        deleteButton.addEventListener('click', () => {
          deleteTask(deleteButton.id);
        });

        task.appendChild(deleteButton);
        list.appendChild(task);
      });
    })
    .catch(err => console.log(err));
};

const addTask = () => {
  const newTask = document.getElementById('task').value;

  if(newTask === ''){
    alert('Enter a task to add');
  }

  fetch('/api/tasks', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ id: Math.floor(Math.random() * 1000), task: newTask})
  })
    .then(loadTasks)
    .catch(err => console.log(err));
};

const deleteTask = (id) => {
  fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(loadTasks)
    .catch(err => console.log(err));
};

const login = () => {
  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;

  // check if user passed in value
  if (user === '' || pass === ''){
    alert('Inputs cannot be empty.');
  }
};
  