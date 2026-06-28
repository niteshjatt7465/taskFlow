import { useTasks } from '../hooks/useTasks';
import { HiOutlineFunnel, HiOutlineArrowsUpDown } from 'react-icons/hi2';

const STATUS_OPTIONS   = ['All', 'Pending', 'In Progress', 'Completed'];
const PRIORITY_OPTIONS = ['All', 'Low', 'Medium', 'High'];
const SORT_OPTIONS = [
  { value: 'newest',   label: 'Newest First' },
  { value: 'oldest',   label: 'Oldest First' },
  { value: 'dueDate',  label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
];

const SelectFilter = ({ id, label, icon: Icon, value, onChange, options }) => (
  <div className="flex items-center gap-2">
    <label htmlFor={id} className="sr-only">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Icon className="w-4 h-4 text-gray-500" />
      </div>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input pl-9 pr-8 py-2.5 text-sm appearance-none cursor-pointer min-w-[150px]"
        aria-label={label}
      >
        {options.map((opt) => (
          <option
            key={typeof opt === 'string' ? opt : opt.value}
            value={typeof opt === 'string' ? opt : opt.value}
          >
            {typeof opt === 'string' ? opt : opt.label}
          </option>
        ))}
      </select>
      {/* Custom chevron */}
      <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);

const FilterBar = () => {
  const { filters, setFilters } = useTasks();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <SelectFilter
        id="filter-status"
        label="Filter by Status"
        icon={HiOutlineFunnel}
        value={filters.status}
        onChange={(v) => setFilters({ status: v })}
        options={STATUS_OPTIONS}
      />

      <SelectFilter
        id="filter-priority"
        label="Filter by Priority"
        icon={HiOutlineFunnel}
        value={filters.priority}
        onChange={(v) => setFilters({ priority: v })}
        options={PRIORITY_OPTIONS}
      />

      <SelectFilter
        id="sort-tasks"
        label="Sort tasks"
        icon={HiOutlineArrowsUpDown}
        value={filters.sort}
        onChange={(v) => setFilters({ sort: v })}
        options={SORT_OPTIONS}
      />
    </div>
  );
};

export default FilterBar;
