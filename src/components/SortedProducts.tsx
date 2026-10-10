"use client";

import { useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";
import { SORT_OPTIONS, sortProducts, type SortMode } from "@/lib/sort";
import type { Product } from "@/lib/types";

export default function SortedProducts({ products }: { products: Product[] }) {
  const [mode, setMode] = useState<SortMode>("default");
  const list = useMemo(() => sortProducts(products, mode), [products, mode]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        <label htmlFor="sort" className="text-sm text-base-content/70">
          সাজান:
        </label>
        <select
          id="sort"
          value={mode}
          onChange={(e) => setMode(e.target.value as SortMode)}
          className="select select-bordered select-sm"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <ProductGrid products={list} />
    </div>
  );
}
