import { formatPct } from "@/lib/bn";

export default function ChangeBadge({ value }: { value: number }) {
  if (Math.abs(value) < 0.05) {
    return <span className="badge badge-ghost badge-sm whitespace-nowrap">— ০.০%</span>;
  }
  const up = value > 0;
  return (
    <span
      className={`badge badge-sm border-0 whitespace-nowrap ${
        up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {up ? "▲" : "▼"} {formatPct(value)}%
    </span>
  );
}
