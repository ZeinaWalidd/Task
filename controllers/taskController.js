import prisma from '../prisma/client.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.tasks.findMany({
      where: { userId: req.userId },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Please enter a title' });
    }

    const task = await prisma.tasks.create({
      data: {
        title,
        description: description || null,
        userId: req.userId,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const taskId = parseInt(req.params.id);

    const updateResult = await prisma.tasks.updateMany({
      where: { id: taskId, userId: req.userId },
      data: {
        title: title || undefined,
        description: description === '' ? null : (description || undefined),
        completed: completed !== undefined ? completed : undefined,
      },
    });

    if (updateResult.count === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const task = await prisma.tasks.findUnique({ where: { id: taskId } });
    res.json(task);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);

    const deleteResult = await prisma.tasks.deleteMany({
      where: { id: taskId, userId: req.userId },
    });

    if (deleteResult.count === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
