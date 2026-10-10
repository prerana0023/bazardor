export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl space-y-4 px-4 py-6">
      <div className="skeleton h-4 w-48" />
      <div className="skeleton h-32 w-full rounded-2xl" />
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="skeleton h-20" />
        <div className="skeleton h-20" />
        <div className="skeleton h-20" />
      </div>
      <div className="skeleton h-72 w-full rounded-2xl" />
    </div>
  );
}
