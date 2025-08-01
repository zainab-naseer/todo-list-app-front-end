import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const getTasks = async () => {
  const res = await axios.get(`${API_URL}/tasks`);
  return { tasks: res.data.tasks, totalTasks: res.data.totalTasks };
};

export const createTask = async (task: { title: string; color: string }) => {
  const res = await axios.post(`${API_URL}/task`, task);
  return res.data;
};

export const updateTask = async (id: number, updateObj: { title?: string; color?: string; completed?: boolean }) => {
  const res = await axios.put(`${API_URL}/tasks/${id}`, updateObj);
  return res.data;
};

export const deleteTask = async (id: number) => {
  const res = await axios.delete(`${API_URL}/tasks/${id}`);
  return res.data;
};
