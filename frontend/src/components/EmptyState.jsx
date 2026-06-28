import { HiOutlineClipboardDocumentList, HiOutlinePlus } from 'react-icons/hi2';

/**
 * Empty state displayed when no tasks match the current filters.
 * @param {Function} onCreateClick – opens the create task modal
 * @param {boolean} isFiltered – whether filters are active (changes copy)
 */
const EmptyState = ({ onCreateClick, isFiltered = false }) => (
  <div className="flex flex-col items-center justify-center py-24 px-4 text-center animate-fade-in">
    {/* Icon */}
    <div className="w-20 h-20 rounded-2xl bg-primary-600/10 border border-primary-500/20 flex items-center justify-center mb-6">
      <HiOutlineClipboardDocumentList className="w-10 h-10 text-primary-400" />
    </div>

    {/* Heading */}
    <h3 className="text-2xl font-bold text-white mb-3">
      {isFiltered ? 'No tasks match your filters' : 'No tasks yet'}
    </h3>

    {/* Subtext */}
    <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
      {isFiltered
        ? 'Try adjusting or clearing your search, status, or priority filters to find what you\'re looking for.'
        : 'Get started by creating your first task. Stay organised and on top of your work!'}
    </p>

    {/* CTA */}
    {!isFiltered && (
      <button
        onClick={onCreateClick}
        className="btn-primary"
        id="empty-state-create-btn"
      >
        <HiOutlinePlus className="w-5 h-5" />
        Create Your First Task
      </button>
    )}
  </div>
);

export default EmptyState;
