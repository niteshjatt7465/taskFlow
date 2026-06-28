const Task = require('../models/Task');

// ─────────────────────────────────────────────
// @desc    Get all tasks (with search, filter, sort)
// @route   GET /api/tasks
// @access  Public
// ─────────────────────────────────────────────
const getTasks = async (req, res) => {
  const { search, status, priority, sort } = req.query;

  // Build filter query
  const filter = {};

  if (status && status !== 'All') {
    filter.status = status;
  }

  if (priority && priority !== 'All') {
    filter.priority = priority;
  }

  if (search && search.trim()) {
    filter.$or = [
      { title: { $regex: search.trim(), $options: 'i' } },
      { description: { $regex: search.trim(), $options: 'i' } },
    ];
  }

  // Build sort query
  let sortQuery = { createdAt: -1 }; // default: newest first

  if (sort === 'oldest') {
    sortQuery = { createdAt: 1 };
  } else if (sort === 'dueDate') {
    sortQuery = { dueDate: 1 };
  } else if (sort === 'priority') {
    // Custom priority sort: High > Medium > Low
    sortQuery = { priority: -1 };
  }

  const tasks = await Task.find(filter).sort(sortQuery);

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
};

// ─────────────────────────────────────────────
// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Public
// ─────────────────────────────────────────────
const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    const error = new Error(`Task not found with id: ${req.params.id}`);
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    data: task,
  });
};

// ─────────────────────────────────────────────
// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
// ─────────────────────────────────────────────
const createTask = async (req, res) => {
  const { title, description, priority, status, dueDate } = req.body;

  const task = await Task.create({
    title,
    description,
    priority,
    status,
    dueDate,
  });

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: task,
  });
};

// ─────────────────────────────────────────────
// @desc    Update an existing task
// @route   PUT /api/tasks/:id
// @access  Public
// ─────────────────────────────────────────────
const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    const error = new Error(`Task not found with id: ${req.params.id}`);
    error.statusCode = 404;
    throw error;
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    {
      new: true,          // return the updated document
      runValidators: true, // run schema validators on update
    }
  );

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: updatedTask,
  });
};

// ─────────────────────────────────────────────
// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
// ─────────────────────────────────────────────
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    const error = new Error(`Task not found with id: ${req.params.id}`);
    error.statusCode = 404;
    throw error;
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
    data: { id: req.params.id },
  });
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
