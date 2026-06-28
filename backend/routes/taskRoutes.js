const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const validate = require('../middleware/validate');

// Reusable validation rules for task body
const taskValidationRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),

  body('priority')
    .notEmpty()
    .withMessage('Priority is required')
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be Low, Medium, or High'),

  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Status must be Pending, In Progress, or Completed'),

  body('dueDate')
    .notEmpty()
    .withMessage('Due date is required')
    .isISO8601()
    .withMessage('Due date must be a valid date'),
];

// Partial validation for updates (all fields optional but validated if present)
const taskUpdateRules = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),

  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be Low, Medium, or High'),

  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Status must be Pending, In Progress, or Completed'),

  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date'),
];

// Routes
router.route('/').get(getTasks).post(taskValidationRules, validate, createTask);

router
  .route('/:id')
  .get(getTaskById)
  .put(taskUpdateRules, validate, updateTask)
  .delete(deleteTask);

module.exports = router;
