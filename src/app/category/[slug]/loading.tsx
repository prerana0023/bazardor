import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-6">
      <div className="skeleton h-20 w-full rounded-2xl" />
      <div className="skeleton ml-auto h-8 w-48" />
      <GridSkeleton count={6} />
    </div>
  );
}
