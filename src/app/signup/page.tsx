"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");

    if (name.length < 2) return fail("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
    if (password.length < 6) return fail("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");

    setError("");
    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) return fail(error.message || "রেজিস্ট্রেশন সম্পন্ন হয়নি");

    toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন");
    router.push("/signin");
  }

  function fail(msg: string) {
    setError(msg);
    toast.error(msg);
  }

  return (
    <div className="px-4 py-10">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-6">
        <h1 className="text-center text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mb-5 text-center text-sm text-base-content/60">কয়েক সেকেন্ডেই রেজিস্ট্রেশন সম্পন্ন করুন</p>

        <form onSubmit={onSubmit} className="space-y-3">
          <label className="form-control">
            <span className="label-text mb-1">নাম</span>
            <input name="name" required placeholder="আপনার নাম" className="input input-bordered w-full" />
          </label>
          <label className="form-control">
            <span className="label-text mb-1">ইমেইল</span>
            <input name="email" type="email" required placeholder="you@example.com" className="input input-bordered w-full" />
          </label>
          <label className="form-control">
            <span className="label-text mb-1">পাসওয়ার্ড</span>
            <input name="password" type="password" required minLength={6} placeholder="কমপক্ষে ৬ অক্ষর" className="input input-bordered w-full" />
          </label>

          {error && (
            <div role="alert" className="alert alert-error py-2 text-sm">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "রেজিস্টার করুন"}
          </button>
        </form>

        <div className="divider text-xs">অথবা</div>
        <SocialButtons />

        <p className="mt-5 text-center text-sm">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-semibold text-primary hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
