import express, { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router: Router = express.Router();

router.use(authMiddleware);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
