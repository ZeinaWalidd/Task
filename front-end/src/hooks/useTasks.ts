import { useEffect, useState } from 'react';
import api from '../services/api.ts';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/tasks').then((res) => {
      setTasks(res.data);
      setLoading(false);
    });
  }, []);

  const addTask = async (title: string, description?: string) => {
    const res = await api.post('/tasks', { title, description });
    setTasks((prev) => [res.data, ...prev]);
  };

  const updateTask = async (id: number, updates: Partial<Task>) => {
    const res = await api.put(`/tasks/${id}`, updates);
    setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
  };

  const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const sortedTasks = [...tasks].sort((a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1
  );

  return {
    tasks: sortedTasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
  };
}
