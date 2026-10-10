export function CardSkeleton() {
  return (
    <div className="card gap-3 border border-base-300 bg-base-100 p-4">
      <div className="flex items-center gap-3">
        <div className="skeleton h-11 w-11 shrink-0 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>
      <div className="skeleton h-3 w-1/4" />
      <div className="skeleton h-5 w-full" />
    </div>
  );
}

export function GridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
