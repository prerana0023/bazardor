import { fromBn } from "./bn";
import type { Category, Market, Product } from "./types";
import productsSnapshot from "@/data/products.json";
import categoriesSnapshot from "@/data/categories.json";

// Official API first; the older mirrors are used only if it is unreachable.
const BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

/* ---------- low level ---------- */

async function request(path: string): Promise<any> {
  let lastErr: unknown = new Error("API unavailable");
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 300 } });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // rate-limited APIs return an HTML page; treat as failure and try the next base
      return await res.json();
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

const toArray = (json: any, keys: string[]): any[] => {
  if (Array.isArray(json)) return json;
  for (const k of ["data", ...keys]) {
    if (Array.isArray(json?.[k])) return json[k];
  }
  return [];
};

const toObject = (json: any, keys: string[]): any => {
  if (!json || Array.isArray(json)) return null;
  if (json.data && typeof json.data === "object" && !Array.isArray(json.data))
    return json.data;
  for (const k of keys) {
    if (json[k] && typeof json[k] === "object") return json[k];
  }
  return json;
};

const pick = (o: any, keys: string[], fallback?: any) => {
  for (const k of keys) {
    if (o?.[k] !== undefined && o?.[k] !== null && o?.[k] !== "") return o[k];
  }
  return fallback;
};

/* ---------- normalizers (matched to the real API shape) ---------- */

const UNITS: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  pc: "পিস",
  hali: "হালি",
  gram: "গ্রাম",
  g: "গ্রাম",
};

function formatUnit(u: string): string {
  const bn = UNITS[u.trim().toLowerCase()] ?? u.trim();
  return bn.startsWith("প্রতি") ? bn : `প্রতি ${bn}`;
}

// change: { dir: "up" | "down" | "flat", pct: 2.1 }  ->  +2.1 / -2.1 / 0
function parseChange(raw: any): number {
  const c = raw?.change;
  if (c && typeof c === "object") {
    const pct = Math.abs(fromBn(pick(c, ["pct", "percent", "value"], 0)));
    const dir = String(c.dir ?? "").toLowerCase();
    if (dir === "down") return -pct;
    if (dir === "flat") return 0;
    return pct;
  }
  return fromBn(c ?? 0);
}

function normalizeMarket(m: any): Market {
  const min = fromBn(pick(m, ["min", "minPrice"], 0));
  const max = fromBn(pick(m, ["max", "maxPrice"], 0));
  return {
    name: String(pick(m, ["market", "name", "bazar"], "—")),
    area: String(pick(m, ["division", "area", "location"], "")),
    min,
    max,
    avg: Math.round((min + max) / 2),
  };
}

export function normalizeProduct(raw: any): Product {
  const id = String(pick(raw, ["id", "_id", "slug"], ""));
  const slug = String(pick(raw, ["slug", "id", "_id"], id));
  const name = String(pick(raw, ["nameBn", "name_bn", "name", "title"], "পণ্য"));

  const category = String(pick(raw, ["category", "categorySlug"], ""));
  const categoryName = String(pick(raw, ["categoryNameBn", "categoryName"], category));
  const categoryIcon = String(pick(raw, ["categoryIcon"], "🛒"));

  let emoji = String(pick(raw, ["image", "emoji", "icon"], categoryIcon));
  if (/^(https?:|\/)/.test(emoji)) emoji = categoryIcon; // image URL -> use emoji

  const marketsRaw = pick(raw, ["markets"], []);
  const markets: Market[] = Array.isArray(marketsRaw) ? marketsRaw.map(normalizeMarket) : [];

  const price = fromBn(pick(raw, ["today", "price", "currentPrice"], 0));
  const mins = markets.map((m) => m.min).filter((n) => n > 0);
  const maxs = markets.map((m) => m.max).filter((n) => n > 0);
  const avgs = markets.map((m) => m.avg).filter((n) => n > 0);

  const min = mins.length ? Math.min(...mins) : price;
  const max = maxs.length ? Math.max(...maxs) : price;
  const avg = avgs.length
    ? Math.round(avgs.reduce((a, b) => a + b, 0) / avgs.length)
    : price;

  return {
    id,
    slug,
    name,
    emoji,
    category,
    categoryName,
    unit: formatUnit(String(pick(raw, ["unit", "unitName"], "kg"))),
    price,
    change: parseChange(raw),
    description: String(
      pick(raw, ["description", "summary", "subtitle"], `${name} — ${categoryName}র আজকের বাজারদর`)
    ),
    tags: [categoryName].filter(Boolean),
    markets,
    min,
    max,
    avg,
  };
}

function normalizeCategory(raw: any): Category {
  const slug = String(pick(raw, ["slug", "id", "_id"], ""));
  return {
    slug,
    name: String(pick(raw, ["nameBn", "name_bn", "name", "title"], slug)),
    icon: String(pick(raw, ["icon", "emoji", "image"], "🛒")),
  };
}

/* ---------- public API ---------- */

export async function getProducts(category?: string): Promise<Product[]> {
  const q = category ? `?category=${encodeURIComponent(category)}` : "";
  try {
    const json = await request(`/products${q}`);
    const list = toArray(json, ["products", "items"]);
    if (list.length > 0) return list.map(normalizeProduct);
  } catch {
    // API down or rate limited -> use the saved snapshot below
  }
  const all = toArray(productsSnapshot, ["products", "items"]).map(normalizeProduct);
  return category ? all.filter((p) => p.category === category) : all;
}

export async function getProduct(slug: string): Promise<Product | null> {
  const json = await request(`/products/${encodeURIComponent(slug)}`).catch(() => null);
  const raw = toObject(json, ["product"]);
  if (raw && pick(raw, ["nameBn", "name_bn", "name", "title"])) {
    return normalizeProduct(raw);
  }
  const all = await getProducts().catch(() => [] as Product[]);
  return all.find((p) => p.slug === slug || p.id === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const json = await request("/categories");
    const list = toArray(json, ["categories", "items"]);
    if (list.length > 0) return list.map(normalizeCategory);
  } catch {
    // fall back to the saved snapshot
  }
  return toArray(categoriesSnapshot, ["categories", "items"]).map(normalizeCategory);
}

export async function getCategory(slug: string): Promise<Category | null> {
  const json = await request(`/categories/${encodeURIComponent(slug)}`).catch(() => null);
  const raw = toObject(json, ["category"]);
  if (raw && pick(raw, ["nameBn", "name_bn", "name", "title"])) {
    return normalizeCategory(raw);
  }
  const all = await getCategories().catch(() => [] as Category[]);
  return all.find((c) => c.slug === slug) ?? null;
}