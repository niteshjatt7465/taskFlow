/**
 * Status badge — colour-coded pill for Pending / In Progress / Completed.
 */
const STATUS_STYLES = {
  Pending:      'bg-gray-500/15    text-gray-400    border border-gray-500/30',
  'In Progress':'bg-blue-500/15    text-blue-400    border border-blue-500/30',
  Completed:    'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
};

const STATUS_ICONS = {
  Pending:      '○',
  'In Progress':'◐',
  Completed:    '●',
};

const StatusBadge = ({ status }) => {
  const style = STATUS_STYLES[status] || 'bg-gray-500/15 text-gray-400';
  const icon  = STATUS_ICONS[status]  || '○';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${style}`}
    >
      <span className="text-xs leading-none">{icon}</span>
      {status}
    </span>
  );
};

export default StatusBadge;
