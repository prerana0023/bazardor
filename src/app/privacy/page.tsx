import Link from "next/link";

export const metadata = {
  title: "গোপনীয়তা নীতি — বাজার দর",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-5 px-4 py-8">
      <h1 className="text-2xl font-bold">গোপনীয়তা নীতি (Privacy Policy)</h1>
      <p className="text-sm text-base-content/60">সর্বশেষ আপডেট: অক্টোবর ২০২৬</p>

      <section className="space-y-2 rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="font-semibold">আমরা কোন তথ্য সংগ্রহ করি</h2>
        <p className="text-sm text-base-content/80">
          বাজার দর (BazarDor) অ্যাপে সাইন আপ বা সাইন ইন করলে আমরা শুধু আপনার নাম, ইমেইল ঠিকানা এবং
          (Google বা GitHub দিয়ে লগইন করলে) প্রোফাইল ছবি সংগ্রহ করি।
        </p>
      </section>

      <section className="space-y-2 rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="font-semibold">তথ্য কীভাবে ব্যবহার করা হয়</h2>
        <p className="text-sm text-base-content/80">
          এই তথ্য শুধু আপনার অ্যাকাউন্ট তৈরি, লগইন এবং প্রোফাইল দেখানোর জন্য ব্যবহার করা হয়। আমরা
          আপনার তথ্য বিক্রি বা তৃতীয় পক্ষের সাথে শেয়ার করি না।
        </p>
      </section>

      <section className="space-y-2 rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="font-semibold">তথ্য সংরক্ষণ ও নিরাপত্তা</h2>
        <p className="text-sm text-base-content/80">
          আপনার তথ্য MongoDB ডাটাবেসে নিরাপদে সংরক্ষণ করা হয়। পাসওয়ার্ড এনক্রিপ্টেড অবস্থায় থাকে।
        </p>
      </section>

      <section className="space-y-2 rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="font-semibold">যোগাযোগ</h2>
        <p className="text-sm text-base-content/80">
          গোপনীয়তা বিষয়ে কোনো প্রশ্ন থাকলে prerananandi14@gmail.com ঠিকানায় যোগাযোগ করুন।
        </p>
      </section>

      <Link href="/" className="btn btn-primary btn-sm sm:btn-md">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}