import NotFoundView from "@/components/NotFoundView";
import SortedProducts from "@/components/SortedProducts";
import { getCategory, getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import type { Category, Product } from "@/lib/types";

const decode = (s: string) => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = decode((await params).slug);

  const [category, products] = await Promise.all([
    getCategory(slug).catch(() => null as Category | null),
    getProducts(slug).catch(() => [] as Product[]),
  ]);

  // invalid slug or empty category -> 404-style empty state
  if (!category && products.length === 0) {
    return <NotFoundView title="ক্যাটাগরি পাওয়া যায়নি" message="এই ক্যাটাগরিতে কোনো পণ্য নেই বা লিংকটি ভুল।" />;
  }
  if (products.length === 0) {
    return <NotFoundView title="কোনো পণ্য নেই" message="এই ক্যাটাগরিতে এখনো কোনো পণ্য যোগ করা হয়নি।" />;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-6">
      <header className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-4">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-base-200 text-2xl">
          {category?.icon ?? "🛒"}
        </span>
        <div>
          <h1 className="text-xl font-bold">{category?.name ?? slug}</h1>
          <p className="text-sm text-base-content/60">
            মোট {toBn(products.length)}টি পণ্যের আজকের দাম
          </p>
        </div>
      </header>
      <SortedProducts products={products} />
    </div>
  );
}
