import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <div className="skeleton h-56 w-full rounded-2xl" />
      <div className="skeleton h-5 w-40" />
      <GridSkeleton count={6} />
    </div>
  );
}
