import { createContext, useContext, useReducer, useCallback } from 'react';
import * as taskService from '../services/taskService';
import { toast } from 'react-toastify';

// ─── Initial State ────────────────────────────────────────────────────────────
const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    status: 'All',
    priority: 'All',
    sort: 'newest',
  },
};

// ─── Action Types ─────────────────────────────────────────────────────────────
const ACTIONS = {
  SET_LOADING:    'SET_LOADING',
  SET_TASKS:      'SET_TASKS',
  ADD_TASK:       'ADD_TASK',
  UPDATE_TASK:    'UPDATE_TASK',
  DELETE_TASK:    'DELETE_TASK',
  SET_ERROR:      'SET_ERROR',
  SET_FILTERS:    'SET_FILTERS',
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload, error: null };

    case ACTIONS.SET_TASKS:
      return { ...state, tasks: action.payload, loading: false };

    case ACTIONS.ADD_TASK:
      return { ...state, tasks: [action.payload, ...state.tasks], loading: false };

    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t._id === action.payload._id ? action.payload : t
        ),
        loading: false,
      };

    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((t) => t._id !== action.payload),
        loading: false,
      };

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case ACTIONS.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };

    default:
      return state;
  }
};

// ─── Context ──────────────────────────────────────────────────────────────────
export const TaskContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  /** Load tasks applying current filters */
  const loadTasks = useCallback(async (filters = state.filters) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const params = {
        search:   filters.search   || undefined,
        status:   filters.status   !== 'All' ? filters.status   : undefined,
        priority: filters.priority !== 'All' ? filters.priority : undefined,
        sort:     filters.sort     || 'newest',
      };
      const tasks = await taskService.fetchTasks(params);
      dispatch({ type: ACTIONS.SET_TASKS, payload: tasks });
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
      // Use a stable toastId so repeat calls don't stack multiple identical toasts
      toast.error(
        err.message.includes('500') || err.message.includes('Network')
          ? '⚠️ Cannot reach the server. Make sure the backend is running.'
          : err.message,
        { toastId: 'load-tasks-error' }
      );
    }
  }, [state.filters]);

  /** Create a new task and prepend to list */
  const addTask = async (taskData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const newTask = await taskService.createTask(taskData);
      dispatch({ type: ACTIONS.ADD_TASK, payload: newTask });
      toast.success('Task created successfully! 🎉');
      return { success: true };
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
      toast.error(err.message);
      return { success: false, error: err.message };
    }
  };

  /** Update an existing task */
  const editTask = async (id, taskData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const updatedTask = await taskService.updateTask(id, taskData);
      dispatch({ type: ACTIONS.UPDATE_TASK, payload: updatedTask });
      toast.success('Task updated successfully! ✅');
      return { success: true };
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
      toast.error(err.message);
      return { success: false, error: err.message };
    }
  };

  /** Delete a task by ID */
  const removeTask = async (id) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      await taskService.deleteTask(id);
      dispatch({ type: ACTIONS.DELETE_TASK, payload: id });
      toast.success('Task deleted successfully! 🗑️');
      return { success: true };
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
      toast.error(err.message);
      return { success: false, error: err.message };
    }
  };

  /** Update filter state and immediately reload */
  const setFilters = useCallback((newFilters) => {
    const merged = { ...state.filters, ...newFilters };
    dispatch({ type: ACTIONS.SET_FILTERS, payload: newFilters });
    loadTasks(merged);
  }, [state.filters, loadTasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        loading: state.loading,
        error: state.error,
        filters: state.filters,
        loadTasks,
        addTask,
        editTask,
        removeTask,
        setFilters,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// ─── Custom Hook ──────────────────────────────────────────────────────────────
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used inside <TaskProvider>');
  }
  return context;
};
