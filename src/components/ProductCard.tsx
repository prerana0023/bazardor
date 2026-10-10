import Link from "next/link";
import ChangeBadge from "./ChangeBadge";
import { formatPrice } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${encodeURIComponent(p.slug)}`}
      className="card border border-base-300 bg-base-100 transition hover:border-primary hover:shadow-md"
    >
      <div className="card-body gap-3 p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-base-200 text-2xl">
            {p.emoji}
          </span>
          <div className="min-w-0">
            <h3 className="truncate font-semibold">{p.name}</h3>
            <p className="text-sm text-base-content/60">{p.unit}</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <div className="flex items-center justify-between gap-2">
            <span className="text-lg font-bold">{formatPrice(p.price)} টাকা</span>
            <ChangeBadge value={p.change} />
          </div>
        </div>
      </div>
    </Link>
  );
}
