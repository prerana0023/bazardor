"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-base-content/60">আপনার অ্যাকাউন্টের তথ্য</p>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        {isPending || !user ? (
          <div className="flex w-full items-center gap-4">
            <div className="skeleton h-16 w-16 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-1/2" />
              <div className="skeleton h-3 w-2/3" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt="" className="h-16 w-16 rounded-full object-cover" />
              ) : (
                <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-2xl text-primary-content">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold">{user.name}</p>
                <p className="truncate text-sm text-base-content/60">{user.email}</p>
              </div>
            </div>
            <Link href="/profile/update" className="btn btn-outline btn-primary btn-sm">
              তথ্য আপডেট করুন
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
