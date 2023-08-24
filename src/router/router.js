import express from 'express';
import 'dotenv/config';
import { createTask, deleteTask, getTask, updatedTask } from '../controllers/taskController.js';
import { validateTitle } from '../middlewares/validateBody.js';

const router = express.Router();

router.get('/tasks', getTask);
router.post('/tasks', validateTitle, createTask);
router.delete('/tasks/:id', deleteTask);
router.put('/tasks/:id', validateTitle, updatedTask);

export default router;