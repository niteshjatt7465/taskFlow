import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';

const PRIORITIES = ['Low', 'Medium', 'High'];
const STATUSES   = ['Pending', 'In Progress', 'Completed'];

/** Format a JS Date (or ISO string) to yyyy-MM-dd for <input type="date"> */
const toDateInputValue = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

/**
 * Reusable Create/Edit task form.
 * If `task` prop is provided → Edit mode. Otherwise → Create mode.
 */
const TaskForm = ({ task = null, onClose }) => {
  const { addTask, editTask } = useTasks();
  const isEdit = Boolean(task);

  const [formData, setFormData] = useState({
    title:       task?.title       ?? '',
    description: task?.description ?? '',
    priority:    task?.priority    ?? 'Medium',
    status:      task?.status      ?? 'Pending',
    dueDate:     task?.dueDate     ? toDateInputValue(task.dueDate) : '',
  });

  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  // ─── Validation ──────────────────────────────
  const validate = () => {
    const errs = {};
    if (!formData.title.trim())
      errs.title = 'Title is required';
    else if (formData.title.trim().length < 3)
      errs.title = 'Title must be at least 3 characters';

    if (!formData.description.trim())
      errs.description = 'Description is required';

    if (!formData.priority)
      errs.priority = 'Priority is required';

    if (!formData.status)
      errs.status = 'Status is required';

    if (!formData.dueDate)
      errs.dueDate = 'Due date is required';

    return errs;
  };

  // ─── Field Handlers ───────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear individual field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // ─── Submit ───────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    const payload = {
      ...formData,
      title:       formData.title.trim(),
      description: formData.description.trim(),
    };

    const result = isEdit
      ? await editTask(task._id, payload)
      : await addTask(payload);

    setLoading(false);
    if (result.success) onClose();
  };

  // ─── Reusable Field Error ─────────────────────
  const FieldError = ({ field }) =>
    errors[field] ? (
      <p className="mt-1 text-xs text-red-400">{errors[field]}</p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Title */}
      <div>
        <label className="form-label" htmlFor="form-title">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          id="form-title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Design landing page"
          className={`form-input ${errors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : ''}`}
          maxLength={100}
        />
        <FieldError field="title" />
      </div>

      {/* Description */}
      <div>
        <label className="form-label" htmlFor="form-description">
          Description <span className="text-red-400">*</span>
        </label>
        <textarea
          id="form-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Describe the task in detail…"
          className={`form-input resize-none ${errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : ''}`}
          maxLength={1000}
        />
        <FieldError field="description" />
      </div>

      {/* Priority & Status row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Priority */}
        <div>
          <label className="form-label" htmlFor="form-priority">
            Priority <span className="text-red-400">*</span>
          </label>
          <select
            id="form-priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className={`form-input ${errors.priority ? 'border-red-500' : ''}`}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <FieldError field="priority" />
        </div>

        {/* Status */}
        <div>
          <label className="form-label" htmlFor="form-status">
            Status <span className="text-red-400">*</span>
          </label>
          <select
            id="form-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`form-input ${errors.status ? 'border-red-500' : ''}`}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <FieldError field="status" />
        </div>
      </div>

      {/* Due Date */}
      <div>
        <label className="form-label" htmlFor="form-dueDate">
          Due Date <span className="text-red-400">*</span>
        </label>
        <input
          id="form-dueDate"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className={`form-input ${errors.dueDate ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : ''}`}
        />
        <FieldError field="dueDate" />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="btn-ghost flex-1 justify-center"
          id="form-cancel-btn"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary flex-1 justify-center"
          id={isEdit ? 'form-update-btn' : 'form-create-btn'}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              {isEdit ? 'Updating…' : 'Creating…'}
            </span>
          ) : isEdit ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
