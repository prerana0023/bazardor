import { formatPct, formatPrice } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function Ticker({ products }: { products: Product[] }) {
  if (!products.length) return null;
  const items = products.slice(0, 20);
  // content is rendered twice so translateX(-50%) loops seamlessly
  const row = [...items, ...items];

  return (
    <div className="overflow-hidden border-b border-base-300 bg-base-100" aria-label="দামের তালিকা">
      <div className="marquee flex w-max items-center gap-8 whitespace-nowrap px-4 py-2 text-xs sm:text-sm">
        {row.map((p, i) => {
          const up = p.change > 0;
          const down = p.change < 0;
          return (
            <span key={`${p.id}-${i}`} className="inline-flex items-center gap-1.5">
              <span>{p.emoji}</span>
              <span className="font-medium">{p.name}</span>
              <span className="text-base-content/70">
                {formatPrice(p.price)} টাকা/{p.unit.replace("প্রতি ", "")}
              </span>
              <span className={up ? "text-green-600" : down ? "text-red-600" : "text-base-content/50"}>
                {up ? "▲" : down ? "▼" : "—"} {formatPct(p.change)}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
