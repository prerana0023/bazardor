import Link from "next/link";

export default function NotFoundView({
  title = "পেজটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে লিংকটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-md rounded-2xl border border-base-300 bg-base-100 p-8 text-center">
        <p className="text-5xl font-bold text-primary">৪০৪</p>
        <h1 className="mt-3 text-xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm text-base-content/70">{message}</p>
        <Link href="/" className="btn btn-primary btn-sm mt-6 sm:btn-md">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </section>
  );
}
