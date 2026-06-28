import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineCheckCircle, HiOutlinePlus, HiBars3, HiXMark } from 'react-icons/hi2';
import TaskModal from './TaskModal';
import TaskForm from './TaskForm';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-surface-800/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
                <HiOutlineCheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Task<span className="text-primary-400">Flow</span>
              </span>
            </Link>

            {/* Desktop CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-sm text-gray-400">Your personal task manager</span>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary text-sm"
                id="navbar-create-task-btn"
              >
                <HiOutlinePlus className="w-4 h-4" />
                New Task
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="sm:hidden p-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <HiXMark className="w-6 h-6" />
              ) : (
                <HiBars3 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="sm:hidden bg-surface-800 border-t border-white/5 px-4 py-4 animate-fade-in">
            <button
              onClick={() => {
                setShowCreateModal(true);
                setMobileOpen(false);
              }}
              className="btn-primary w-full justify-center"
              id="mobile-create-task-btn"
            >
              <HiOutlinePlus className="w-4 h-4" />
              New Task
            </button>
          </div>
        )}
      </header>

      {/* Create Task Modal */}
      {showCreateModal && (
        <TaskModal
          title="Create New Task"
          onClose={() => setShowCreateModal(false)}
        >
          <TaskForm onClose={() => setShowCreateModal(false)} />
        </TaskModal>
      )}
    </>
  );
};

export default Navbar;
