import axios from 'axios';

// Base URL: in production use VITE_API_URL env var; in dev Vite proxy handles /api
const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/tasks`
  : '/api/tasks';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Response interceptor — surface the server error message to callers
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.message ||
      error.message ||
      'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

/**
 * Fetch all tasks with optional query params.
 * @param {{ search?: string, status?: string, priority?: string, sort?: string }} params
 */
export const fetchTasks = (params = {}) =>
  api.get('/', { params }).then((res) => res.data.data);

/**
 * Fetch a single task by ID.
 * @param {string} id
 */
export const fetchTaskById = (id) =>
  api.get(`/${id}`).then((res) => res.data.data);

/**
 * Create a new task.
 * @param {object} taskData
 */
export const createTask = (taskData) =>
  api.post('/', taskData).then((res) => res.data.data);

/**
 * Update an existing task.
 * @param {string} id
 * @param {object} taskData
 */
export const updateTask = (id, taskData) =>
  api.put(`/${id}`, taskData).then((res) => res.data.data);

/**
 * Delete a task by ID.
 * @param {string} id
 */
export const deleteTask = (id) =>
  api.delete(`/${id}`).then((res) => res.data);
