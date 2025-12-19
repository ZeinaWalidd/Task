import prisma from '../prisma/client.js';

export interface CreateTaskPayload {
  title: string;
  description?: string;
  userId: number;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  completed?: boolean;
}

export class TaskService {
  static async getTasks(userId: number) {
    return await prisma.tasks.findMany({
      where: { userId },
    });
  }

  static async getTaskById(taskId: number, userId: number) {
    return await prisma.tasks.findFirst({
      where: { id: taskId, userId },
    });
  }

  static async createTask(data: CreateTaskPayload) {
    const { title, description, userId } = data;

    if (!title) {
      throw new Error('Please enter a title');
    }

    return await prisma.tasks.create({
      data: {
        title,
        description: description || null,
        userId,
      },
    });
  }

  static async updateTask(taskId: number, userId: number, data: UpdateTaskPayload) {
    const updateResult = await prisma.tasks.updateMany({
      where: { id: taskId, userId },
      data: {
        title: data.title || undefined,
        description: data.description === '' ? null : (data.description || undefined),
        completed: data.completed !== undefined ? data.completed : undefined,
      },
    });

    if (updateResult.count === 0) {
      throw new Error('Task not found');
    }

    return await prisma.tasks.findUnique({
      where: { id: taskId },
    });
  }

  static async deleteTask(taskId: number, userId: number) {
    const deleteResult = await prisma.tasks.deleteMany({
      where: { id: taskId, userId },
    });

    if (deleteResult.count === 0) {
      throw new Error('Task not found');
    }

    return { message: 'Task deleted successfully' };
  }
}
