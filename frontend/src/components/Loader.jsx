/** Shimmer skeleton card shown while tasks are loading. */
const SkeletonCard = () => (
  <div className="glass-card p-5 space-y-4 overflow-hidden">
    {/* Header row */}
    <div className="flex justify-between items-start gap-3">
      <div className="h-5 w-3/5 shimmer-bg animate-shimmer rounded-lg" />
      <div className="h-6 w-16 shimmer-bg animate-shimmer rounded-full" />
    </div>

    {/* Description lines */}
    <div className="space-y-2">
      <div className="h-3.5 w-full shimmer-bg animate-shimmer rounded" />
      <div className="h-3.5 w-4/5 shimmer-bg animate-shimmer rounded" />
    </div>

    {/* Badges */}
    <div className="flex gap-2">
      <div className="h-6 w-20 shimmer-bg animate-shimmer rounded-full" />
      <div className="h-6 w-24 shimmer-bg animate-shimmer rounded-full" />
    </div>

    {/* Footer */}
    <div className="pt-2 border-t border-white/5 flex justify-between">
      <div className="h-4 w-24 shimmer-bg animate-shimmer rounded" />
      <div className="flex gap-2">
        <div className="h-8 w-8 shimmer-bg animate-shimmer rounded-lg" />
        <div className="h-8 w-8 shimmer-bg animate-shimmer rounded-lg" />
      </div>
    </div>
  </div>
);

/** Renders N skeleton cards in a responsive grid. */
const Loader = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default Loader;
