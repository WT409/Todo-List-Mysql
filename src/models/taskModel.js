import connection from './connection.js';
const getTasksInDb = async () => {
  const [tasks] = await connection.execute('SELECT * FROM tasks');
  return tasks;
};

const createTaskInDb = async (taskInfo) => {
  const { title } = taskInfo;
  const created_at = new Date(Date.now()).toUTCString();
  const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?,?,?)';

  const [createdTask] = await connection.execute(query, [title, 'pendente', created_at]);

  return { insertId: createdTask.insertId };
};

const deleteTaskInDb = async (taskId)=> {
  const query = 'DELETE FROM tasks WHERE id = ?';

  const removedTask = await connection.execute(query, [taskId]);

  return removedTask;
};

const updateTaskInDb = async (taskId, taskInfo)=> {
  const { title, status } = taskInfo;
  const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';

  const [updatedTask] = await connection.execute(query, [title, status, taskId]);

  return updatedTask;
};

export { getTasksInDb, createTaskInDb, deleteTaskInDb, updateTaskInDb };