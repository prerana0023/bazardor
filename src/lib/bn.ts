const BN = "০১২৩৪৫৬৭৮৯";

/** 123 -> ১২৩ */
export const toBn = (v: number | string): string =>
  String(v).replace(/\d/g, (d) => BN[Number(d)]);

/** "১,৮৫০ টাকা" / "1850" -> 1850 (numeric value, never string compare) */
export const fromBn = (v: unknown): number => {
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  const t = String(v ?? "")
    .replace(/[০-৯]/g, (d) => String(BN.indexOf(d)))
    .replace(/,/g, "")
    .replace(/[^\d.\-]/g, "");
  const n = parseFloat(t);
  return Number.isFinite(n) ? n : 0;
};

/** 1850 -> ১,৮৫০ */
export const formatPrice = (n: number): string =>
  toBn(n.toLocaleString("en-IN", { maximumFractionDigits: 2 }));

/** 2.14 -> ২.১ */
export const formatPct = (n: number): string => toBn(Math.abs(n).toFixed(1));
