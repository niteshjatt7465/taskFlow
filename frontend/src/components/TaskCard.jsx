import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineCalendarDays,
  HiOutlineClock,
} from 'react-icons/hi2';
import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';
import TaskModal from './TaskModal';
import TaskForm from './TaskForm';
import DeleteConfirmModal from './DeleteConfirmModal';

/** Format ISO date string to a readable format */
const formatDate = (dateStr) => {
  if (!dateStr) return 'No date';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/** Check if due date is past today */
const isOverdue = (dueDate, status) => {
  if (status === 'Completed') return false;
  return new Date(dueDate) < new Date();
};

const TaskCard = ({ task }) => {
  const { removeTask } = useTasks();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const overdue = isOverdue(task.dueDate, task.status);

  const handleDelete = async () => {
    setDeleting(true);
    const result = await removeTask(task._id);
    if (!result.success) setDeleting(false);
    // If success the card disappears from state — no need to close modal
  };

  return (
    <>
      <article
        className={`glass-card p-5 flex flex-col gap-4 hover:shadow-card-hover hover:-translate-y-1
          transition-all duration-300 group animate-slide-up
          ${overdue ? 'border-red-500/30' : ''}`}
      >
        {/* ── Top Row: Title + Priority ── */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-white leading-snug line-clamp-2 flex-1 group-hover:text-primary-300 transition-colors duration-200">
            {task.title}
          </h3>
          <PriorityBadge priority={task.priority} />
        </div>

        {/* ── Description ── */}
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
          {task.description}
        </p>

        {/* ── Status Badge ── */}
        <div>
          <StatusBadge status={task.status} />
        </div>

        {/* ── Dates Row ── */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
          <span
            className={`flex items-center gap-1 ${overdue ? 'text-red-400 font-medium' : ''}`}
            title="Due Date"
          >
            <HiOutlineCalendarDays className="w-3.5 h-3.5 shrink-0" />
            {overdue ? '⚠ ' : ''}Due: {formatDate(task.dueDate)}
          </span>
          <span className="flex items-center gap-1" title="Created At">
            <HiOutlineClock className="w-3.5 h-3.5 shrink-0" />
            {formatDate(task.createdAt)}
          </span>
        </div>

        {/* ── Footer: Actions ── */}
        <div className="pt-3 border-t border-white/5 flex justify-end gap-2">
          <button
            onClick={() => setShowEditModal(true)}
            className="p-2 text-gray-400 hover:text-primary-400 hover:bg-primary-500/10
                       rounded-lg transition-all duration-200"
            aria-label={`Edit task: ${task.title}`}
            id={`edit-task-btn-${task._id}`}
          >
            <HiOutlinePencilSquare className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10
                       rounded-lg transition-all duration-200"
            aria-label={`Delete task: ${task.title}`}
            id={`delete-task-btn-${task._id}`}
          >
            <HiOutlineTrash className="w-4.5 h-4.5" />
          </button>
        </div>
      </article>

      {/* Edit Modal */}
      {showEditModal && (
        <TaskModal title="Edit Task" onClose={() => setShowEditModal(false)}>
          <TaskForm task={task} onClose={() => setShowEditModal(false)} />
        </TaskModal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmModal
          taskTitle={task.title}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          isDeleting={deleting}
        />
      )}
    </>
  );
};

export default TaskCard;
