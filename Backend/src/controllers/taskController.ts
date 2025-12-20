import { Request, Response } from 'express';
import { TaskService } from '../services/taskService.js';

interface CustomRequest extends Request {
  userId?: string | number;
  body: {
    title?: string;
    description?: string;
    completed?: boolean;
  };
}

export const getTasks = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const tasks = await TaskService.getTasks(req.userId as number);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const createTask = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body || {};

    const task = await TaskService.createTask({
      title: title || '',
      description,
      userId: req.userId as number,
    });
    res.status(201).json(task);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ message: 'Failed to create task', error: message });
  }
};

export const updateTask = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { title, description, completed } = req.body || {};
    const taskId = parseInt(req.params.id);

    const task = await TaskService.updateTask(taskId, req.userId as number, {
      title,
      description,
      completed,
    });
    res.json(task);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const statusCode = message === 'Task not found' ? 404 : 400;
    res.status(statusCode).json({ message: 'Failed to update task', error: message });
  }
};

export const deleteTask = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const taskId = parseInt(req.params.id);

    const result = await TaskService.deleteTask(taskId, req.userId as number);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const statusCode = message === 'Task not found' ? 404 : 400;
    res.status(statusCode).json({ message: 'Failed to delete task', error: message });
  }
};
