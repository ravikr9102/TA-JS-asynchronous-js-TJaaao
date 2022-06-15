let root = document.querySelector('ul');
let inputText = document.querySelector('#text');
const url = `https://basic-todo-api.vercel.app/api/todo`;

fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    createUI(data);
  });


function createUI(data) {
  root.innerHTML = '';
  data.todos.forEach((todo) => {
    let li = document.createElement('li');
    li.classList.add('flex');
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.setAttribute('data-id', todo._id);
    let p = document.createElement('p');
    p.innerText = todo.title;
    let span = document.createElement('span');
    span.innerText = '❌';
    span.setAttribute('data-id', todo._id);

    li.append(input, p, span);
    root.append(li);

    input.addEventListener('input', handleCheck);
    span.addEventListener('click', handleDelete);
  });
}

// update

function handleCheck(event) {
  update(event.target.dataset.id, event.target.checked);
}

function update(id, value) {
  let data = {
    isCompleted: value,
  };
  fetch(url + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

// Delete

function handleDelete(event) {
  deleteTodo(event.target.dataset.id);
}

function deleteTodo(id) {
  fetch(url + '/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      createUI(data);
    });
}

// add

function addTodo(todo, isDone) {
  let data = {
    todo: {
      title: todo,
      isCompleted: isDone,
    },
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      createUI(data);
    });
}

inputText.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    console.log(event.target.value);
    addTodo(event.target.value, false);
    event.target.value = '';
  }
});
