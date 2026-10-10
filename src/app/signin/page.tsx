"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";

function SignInForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const redirect = sp.get("redirect");
  const target = redirect && redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sp.get("reason") === "protected") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "protected" });
    }
  }, [sp]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");

    setError("");
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const msg = error.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে";
      setError(msg);
      toast.error(msg);
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(target);
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-6">
      <h1 className="text-center text-2xl font-bold">সাইন ইন</h1>
      <p className="mb-5 text-center text-sm text-base-content/60">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>

      <form onSubmit={onSubmit} className="space-y-3">
        <label className="form-control">
          <span className="label-text mb-1">ইমেইল</span>
          <input name="email" type="email" required placeholder="you@example.com" className="input input-bordered w-full" />
        </label>
        <label className="form-control">
          <span className="label-text mb-1">পাসওয়ার্ড</span>
          <input name="password" type="password" required placeholder="••••••••" className="input input-bordered w-full" />
        </label>

        {error && (
          <div role="alert" className="alert alert-error py-2 text-sm">
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
        </button>
      </form>

      <div className="divider text-xs">অথবা</div>
      <SocialButtons callbackURL={target} />

      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="px-4 py-10">
      <Suspense fallback={<div className="skeleton mx-auto h-96 w-full max-w-md rounded-2xl" />}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
