import { getTasksInDb, createTaskInDb, deleteTaskInDb, updateTaskInDb } from '../models/taskModel.js';

const getTask = async (req, res) => {
  const tasks = await getTasksInDb();

  return res.status(200).json(tasks);
};

const createTask = async (req, res) => {
  const task = await createTaskInDb(req.body);

  return res.status(201).json(task);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  await deleteTaskInDb(id);

  return res.status(204).json({ message: 'Deleted task' });
};

const updatedTask = async (req, res) => {
  const { id } = req.params;

  await updateTaskInDb(id, req.body);
  return res.status(204).json({ message: 'Updated task' });
};

export { getTask, createTask, deleteTask, updatedTask };