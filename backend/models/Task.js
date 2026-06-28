const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    priority: {
      type: String,
      enum: {
        values: ['Low', 'Medium', 'High'],
        message: 'Priority must be Low, Medium, or High',
      },
      required: [true, 'Priority is required'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'In Progress', 'Completed'],
        message: 'Status must be Pending, In Progress, or Completed',
      },
      required: [true, 'Status is required'],
      default: 'Pending',
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
  },
  {
    timestamps: true, // auto-adds createdAt and updatedAt
  }
);

// Index for search and filter performance
taskSchema.index({ title: 'text', description: 'text' });
taskSchema.index({ status: 1, priority: 1, dueDate: 1 });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
