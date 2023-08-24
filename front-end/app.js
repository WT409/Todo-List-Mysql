const input = document.querySelector('form input');


const fetchTasks = async () => {
  const response = await fetch('http://localhost:3000/tasks');
  const tasks = await response.json();
  return tasks;
};

const createTasks = async (task)=> {
  await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });

  loadTasks();
};

const updateTasks = async ({ id, title, status }) => {
  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({title, status})
  });

  loadTasks();
};

const deleteTasks = async (id) => {
  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE'
  });

  loadTasks();
};

const formatDate = (dateUTC) => {
  const options = { dateStyle: 'long', timeStyle: 'short' };
  const date = new Date(dateUTC).toLocaleString('pt-br', options);
  return date;
};

const createButton = (value, id = '') => {
  const button = createElement('button', value);
  if (id) button.setAttribute('id', id);
  return button;
};

const createSelect = (status) => {
  const select = createElement('select', `
    <option value="pendente">pendente</option>
    <option value="em andamento">em andamento</option>
    <option value="concluida">concluida</option>`);
  select.value = status;
  return select;
};

const createElement = (element, value = '') => {
  const elem = document.createElement(element);
  elem.innerHTML = value;
  return elem;
};

const loadTasks = async () => {
  const tasks = await fetchTasks();
  const tbody = document.querySelector('table tbody');
  tbody.innerHTML = '';
  tasks.forEach(task => {
    const { id, title, status, created_at } = task;


    const tr = createElement('tr');
    const titleElem = createElement('td', title);
    const createdAtElem = createElement('td', formatDate(created_at));
    const statusElem = createElement('td');
    const select = createSelect(status);
    const actionsElem = createElement('td');
    const buttonEdit = createButton('<span class="material-symbols-outlined">edit</span>');
    const buttonDelete = createButton('<span class="material-symbols-outlined">delete</span>', id);
    const editForm = createElement('form');
    const editInput = createElement('input');
    editInput.value = title;


    
    
    tr.appendChild(titleElem);
    tr.appendChild(createdAtElem);
    tr.appendChild(statusElem);
    statusElem.appendChild(select);
    actionsElem.appendChild(buttonEdit);
    actionsElem.appendChild(buttonDelete);
    tr.appendChild(actionsElem);

    tbody.appendChild(tr);

    editInput.addEventListener('change', ({target})=> {
      updateTasks({
        ...task,
        title: target.value
      });
    });

    select.addEventListener('change', ({target})=> {
      updateTasks({
        ...task,
        status: target.value
      });
    });

    buttonEdit.addEventListener('click', ()=> {
      titleElem.innerHTML = '';
      editForm.appendChild(editInput);
      titleElem.appendChild(editForm);
    });

    buttonDelete.addEventListener('click', ()=> {
      const getId = buttonDelete.getAttribute('id');
      deleteTasks(getId);
    });
  });
};
loadTasks();

input.addEventListener('change', ({target})=> createTasks({title: target.value}));