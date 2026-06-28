/**
 * Priority badge — colour-coded pill for Low / Medium / High.
 */
const PRIORITY_STYLES = {
  Low:    'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  Medium: 'bg-amber-500/15  text-amber-400  border border-amber-500/30',
  High:   'bg-red-500/15    text-red-400    border border-red-500/30',
};

const PRIORITY_DOTS = {
  Low:    'bg-emerald-400',
  Medium: 'bg-amber-400',
  High:   'bg-red-400',
};

const PriorityBadge = ({ priority }) => {
  const style = PRIORITY_STYLES[priority] || 'bg-gray-500/15 text-gray-400';
  const dot   = PRIORITY_DOTS[priority]   || 'bg-gray-400';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${style}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {priority}
    </span>
  );
};

export default PriorityBadge;
