"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session?.user?.name]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name.trim().length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }
    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      return;
    }
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md space-y-4 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="text-sm text-base-content/60">আপনার নাম পরিবর্তন করুন</p>
      </div>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
        {isPending ? (
          <div className="space-y-3">
            <div className="skeleton h-4 w-16" />
            <div className="skeleton h-12 w-full" />
            <div className="skeleton h-12 w-full" />
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3">
            <label className="form-control">
              <span className="label-text mb-1">নাম</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input input-bordered w-full"
              />
            </label>
            <button type="submit" disabled={loading} className="btn btn-primary w-full">
              {loading ? <span className="loading loading-spinner loading-sm" /> : "তথ্য আপডেট করুন"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
