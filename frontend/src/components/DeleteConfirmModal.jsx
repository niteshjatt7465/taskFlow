import { useEffect, useRef } from 'react';
import { HiOutlineExclamationTriangle, HiOutlineTrash } from 'react-icons/hi2';

/**
 * Confirmation dialog before deleting a task.
 * Accessible: traps focus and closes on Escape.
 */
const DeleteConfirmModal = ({ taskTitle, onConfirm, onCancel, isDeleting }) => {
  const cancelRef = useRef(null);

  useEffect(() => {
    cancelRef.current?.focus();
    const handler = (e) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-desc"
    >
      <div className="w-full max-w-md bg-surface-700 rounded-2xl border border-white/10 shadow-card animate-scale-in p-6">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5 mx-auto">
          <HiOutlineExclamationTriangle className="w-6 h-6 text-red-400" />
        </div>

        {/* Content */}
        <h3 id="delete-dialog-title" className="text-lg font-bold text-white text-center mb-2">
          Delete Task?
        </h3>
        <p id="delete-dialog-desc" className="text-sm text-gray-400 text-center mb-6 leading-relaxed">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-gray-200">"{taskTitle}"</span>?
          <br />
          This action <span className="text-red-400 font-medium">cannot be undone</span>.
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            ref={cancelRef}
            onClick={onCancel}
            className="btn-ghost flex-1 justify-center"
            id="delete-cancel-btn"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn-danger flex-1 justify-center"
            id="delete-confirm-btn"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Deleting…
              </span>
            ) : (
              <>
                <HiOutlineTrash className="w-4 h-4" />
                Delete Task
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
