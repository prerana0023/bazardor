import Image from "next/image";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import type { Product } from "@/lib/types";

function SectionTitle({ dot, title, sub }: { dot: string; title: string; sub?: string }) {
  return (
    <div className="mb-3">
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <span className={`inline-block h-2.5 w-2.5 rounded-full ${dot}`} />
        {title}
      </h2>
      {sub && <p className="text-sm text-base-content/60">{sub}</p>}
    </div>
  );
}

export default async function Home() {
  let products: Product[] = [];
  let failed = false;
  try {
    products = await getProducts();
  } catch {
    failed = true;
  }

  const risers = products.filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = products.filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-6">
      {/* Hero */}
      <section className="grid items-center gap-6 rounded-2xl border border-base-300 bg-base-100 p-6 md:grid-cols-2 md:p-8">
        <div className="space-y-3">
          <span className="badge badge-outline badge-primary">প্রতিদিনের বাজার আপডেট</span>
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-base-content/70">
            চাল, ডাল, তেল, সবজি, মাছ ও মাংস — নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ দাম ও দামের ওঠানামা
            জানুন সহজে।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary btn-sm sm:btn-md">
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="/hero.svg"
            alt="ফলের ঝুড়ি"
            width={500}
            height={460}
            priority
            unoptimized
            className="h-auto w-full max-w-sm md:max-w-md"
          />
        </div>
      </section>

      {failed && (
        <div role="alert" className="alert alert-error">
          ডেটা লোড করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।
        </div>
      )}

      {risers.length > 0 && (
        <section>
          <SectionTitle dot="bg-green-600" title="আজ দাম বেড়েছে ▲" />
          <ProductGrid products={risers} />
        </section>
      )}

      {fallers.length > 0 && (
        <section>
          <SectionTitle dot="bg-red-600" title="আজ দাম কমেছে ▼" />
          <ProductGrid products={fallers} />
        </section>
      )}

      <section id="সব-পণ্য">
        <SectionTitle
          dot="bg-primary"
          title="সব পণ্য"
          sub={`মোট ${toBn(products.length)}টি পণ্য — দাম বাজারভেদে ভিন্ন হতে পারে`}
        />
        <ProductGrid products={products} />
      </section>
    </div>
  );
}