import { useState, useCallback } from 'react';
import { HiOutlineMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import { useTasks } from '../hooks/useTasks';

/** Debounce helper */
const useDebounce = (fn, delay = 400) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const SearchBar = () => {
  const { filters, setFilters } = useTasks();
  const [inputValue, setInputValue] = useState(filters.search || '');

  // Debounced filter update so we don't hammer the API on every keystroke
  const debouncedSearch = useCallback(
    useDebounce((value) => {
      setFilters({ search: value });
    }, 400),
    [setFilters]
  );

  const handleChange = (e) => {
    setInputValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  const clearSearch = () => {
    setInputValue('');
    setFilters({ search: '' });
  };

  return (
    <div className="relative flex-1 min-w-0">
      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
        <HiOutlineMagnifyingGlass className="w-4.5 h-4.5 text-gray-500" />
      </div>

      <input
        id="search-input"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search tasks by title or description…"
        className="form-input pl-10 pr-10"
        aria-label="Search tasks"
      />

      {inputValue && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Clear search"
          id="clear-search-btn"
        >
          <HiXMark className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
