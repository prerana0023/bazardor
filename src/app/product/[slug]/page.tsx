import Link from "next/link";
import { notFound } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import { getProduct } from "@/lib/api";
import { formatPrice } from "@/lib/bn";

const decode = (s: string) => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = decode((await params).slug);
  const p = await getProduct(slug).catch(() => null);
  if (!p) notFound();

  const stats = [
    { label: "সর্বনিম্ন দাম", value: p.min },
    { label: "সর্বোচ্চ দাম", value: p.max },
    { label: "গড় দাম", value: p.avg },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-5 px-4 py-6">
      <div className="breadcrumbs text-sm">
        <ul>
          <li><Link href="/">হোম</Link></li>
          {p.category && (
            <li><Link href={`/category/${encodeURIComponent(p.category)}`}>{p.categoryName}</Link></li>
          )}
          <li>{p.name}</li>
        </ul>
      </div>

      {/* Summary */}
      <section className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-base-200 text-4xl">
            {p.emoji}
          </span>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{p.name}</h1>
            <p className="text-sm text-base-content/70">{p.description}</p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {p.tags.map((t) => (
                <span key={t} className="badge badge-outline badge-primary badge-sm">{t}</span>
              ))}
              <span className="text-sm text-base-content/60">{p.unit}</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-base-200 px-4 py-3 sm:text-right">
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-2xl font-bold text-primary">{formatPrice(p.price)} টাকা</p>
          <ChangeBadge value={p.change} />
        </div>
      </section>

      {/* Price summary */}
      <section className="rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="mb-3 font-semibold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-base-300 p-4">
              <p className="text-xs text-base-content/60">{s.label}</p>
              <p className="text-xl font-bold">{formatPrice(s.value)} টাকা</p>
              <p className="text-xs text-base-content/50">{p.unit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Markets */}
      <section className="rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="mb-3 font-semibold">বাজারভিত্তিক আজকের দাম</h2>
        {p.markets.length === 0 ? (
          <p className="text-sm text-base-content/60">এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বোচ্চ</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {p.markets.map((m, i) => (
                  <tr key={`${m.name}-${i}`}>
                    <td className="font-medium">{m.name}</td>
                    <td>{m.area || "—"}</td>
                    <td className="text-right">{formatPrice(m.min)} টাকা</td>
                    <td className="text-right">{formatPrice(m.max)} টাকা</td>
                    <td className="text-right font-semibold">{formatPrice(m.avg)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}