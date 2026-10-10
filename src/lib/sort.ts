import type { Product } from "./types";

export type SortMode = "default" | "asc" | "desc";

export const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

// price is already a real number (Bengali digits converted in api.ts via fromBn)
export function sortProducts(list: Product[], mode: SortMode): Product[] {
  if (mode === "default") return list;
  const copy = [...list];
  copy.sort((a, b) => (mode === "asc" ? a.price - b.price : b.price - a.price));
  return copy;
}
