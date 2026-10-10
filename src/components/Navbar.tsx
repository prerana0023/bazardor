"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import type { Category } from "@/lib/types";

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [date, setDate] = useState("");

  // computed on the client so server/client time zones never mismatch
  useEffect(() => {
    setDate(
      new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date())
    );
  }, []);

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
        onError: () => toast.error("সাইন আউট করা যায়নি"),
      },
    });
  }

  const linkCls = (active: boolean) =>
    `inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-sm transition ${
      active
        ? "bg-primary text-primary-content"
        : "text-base-content/80 hover:bg-base-200"
    }`;

  const user = session?.user;

  return (
    <header className="sticky top-0 z-30 border-b border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-lg">🛒</span>
          <span className="leading-tight">
            <span className="block font-bold">বাজার দর</span>
            <span className="block min-h-4 text-xs text-base-content/60">{date}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-8 w-24 rounded-lg" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-sm gap-2 px-2">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.image} alt="" className="h-7 w-7 rounded-full object-cover" />
                ) : (
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs text-primary-content">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="hidden max-w-28 truncate text-sm sm:inline">{user.name}</span>
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-40 mt-2 w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow"
              >
                <li className="px-3 py-2">
                  <span className="pointer-events-none flex-col items-start gap-0">
                    <span className="font-semibold">{user.name}</span>
                    <span className="text-xs text-base-content/60">{user.email}</span>
                  </span>
                </li>
                <li>
                  <Link href="/profile">আমার প্রোফাইল</Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="text-error">
                    সাইন আউট
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="mx-auto max-w-6xl overflow-x-auto px-4 pb-2" aria-label="ক্যাটাগরি">
        <ul className="flex w-max items-center gap-1">
          <li>
            <Link href="/" className={linkCls(pathname === "/")}>
              🏠 সব
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/category/${encodeURIComponent(c.slug)}`}
                className={linkCls(pathname === `/category/${c.slug}` || pathname === `/category/${encodeURIComponent(c.slug)}`)}
              >
                <span>{c.icon}</span> {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
