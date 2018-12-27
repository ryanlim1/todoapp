window.onload = () => {
  const task = document.getElementById('task');
  const taskButton = document.getElementById('task-button');
  const retrieve = document.getElementById('retrieve');
  const taskList = document.getElementById('task-list');
  const removeButton = document.getElementById('remove');

  const user = document.getElementById('user');
  const pass = document.getElementById('pass');
  const submit = document.getElementById('submit');

  retrieve.addEventListener('click', () => {
    taskList.innerHTML = '';
    fetch('/getTasks')
      .then(result => result.json())
      .then((items) => {
        items = Object.values(items);
        items = items[0];
        console.log(items);
        items.forEach((todo) => {
          const itemElement = document.createElement('li');
          // itemElement.innerText = todo.item;
          itemElement.innerHTML = `<li>${todo.item}<button class="remove">X</button></li>`;
          return taskList.appendChild(itemElement);
        });
        document.body.appendChild(taskList);
      });
  });

  taskButton.addEventListener('click', () => {
    fetch('/postTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item: task.value })
    })
      .then(result => result.json())
      .then((res) => {
        const item = Object.values(res)[0];
        console.log(item);
        const itemElement = document.createElement('li');
        itemElement.innerHTML = `<li>${item.item}<button id="remove">X</button></li>`;
        task.innerText = '';
        taskList.appendChild(itemElement);
      });
    document.body.appendChild(taskList);
  });

//   removeButton.addEventListener('click', () => {
//     fetch('/deleteTask', {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ item: this.innerText })
//     });
//   });
};
