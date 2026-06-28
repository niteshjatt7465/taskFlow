import { useEffect, useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { HiOutlinePlus, HiOutlineXMark } from 'react-icons/hi2';
import TaskCard from '../components/TaskCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import TaskModal from '../components/TaskModal';
import TaskForm from '../components/TaskForm';

const HomePage = () => {
  const { tasks, loading, filters, loadTasks, setFilters } = useTasks();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFiltered =
    filters.search   !== '' ||
    filters.status   !== 'All' ||
    filters.priority !== 'All';

  const clearFilters = () =>
    setFilters({ search: '', status: 'All', priority: 'All', sort: 'newest' });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ── Page Header ─────────────────────────── */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            My{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">
              Tasks
            </span>
          </h1>
          <p className="mt-1.5 text-gray-400 text-sm">
            {loading
              ? 'Loading your tasks…'
              : `${tasks.length} task${tasks.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary self-start sm:self-auto"
          id="home-create-task-btn"
        >
          <HiOutlinePlus className="w-5 h-5" />
          New Task
        </button>
      </div>

      {/* ── Search + Filters ────────────────────── */}
      <div className="glass-card p-4 mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <SearchBar />
        <div className="flex items-center gap-3 flex-wrap">
          <FilterBar />
          {isFiltered && (
            <button
              onClick={clearFilters}
              className="btn-ghost text-sm text-red-400 border-red-500/20 hover:border-red-400/40 hover:text-red-300"
              id="clear-filters-btn"
            >
              <HiOutlineXMark className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Stats Row ───────────────────────────── */}
      {!loading && tasks.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: 'Total',
              count: tasks.length,
              color: 'text-white',
              bg: 'bg-white/5',
            },
            {
              label: 'Pending',
              count: tasks.filter((t) => t.status === 'Pending').length,
              color: 'text-gray-400',
              bg: 'bg-gray-500/10',
            },
            {
              label: 'In Progress',
              count: tasks.filter((t) => t.status === 'In Progress').length,
              color: 'text-blue-400',
              bg: 'bg-blue-500/10',
            },
            {
              label: 'Completed',
              count: tasks.filter((t) => t.status === 'Completed').length,
              color: 'text-emerald-400',
              bg: 'bg-emerald-500/10',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} border border-white/5 rounded-xl px-4 py-3 text-center`}
            >
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Task Grid ───────────────────────────── */}
      {loading ? (
        <Loader count={6} />
      ) : tasks.length === 0 ? (
        <EmptyState
          isFiltered={isFiltered}
          onCreateClick={() => setShowCreateModal(true)}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}

      {/* Create Task Modal */}
      {showCreateModal && (
        <TaskModal title="Create New Task" onClose={() => setShowCreateModal(false)}>
          <TaskForm onClose={() => setShowCreateModal(false)} />
        </TaskModal>
      )}
    </div>
  );
};

export default HomePage;
