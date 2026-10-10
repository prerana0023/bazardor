import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import { getCategories, getProducts } from "@/lib/api";
import type { Category, Product } from "@/lib/types";
import "./globals.css";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "চাল, ডাল, সবজি, মাছ-মাংসসহ নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর।",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [categories, products] = await Promise.all([
    getCategories().catch(() => [] as Category[]),
    getProducts().catch(() => [] as Product[]),
  ]);

  return (
   <html lang="bn" data-theme="bazar" data-scroll-behavior="smooth">
      <body className={`${hind.variable} flex min-h-screen flex-col font-sans`}>
        <Navbar categories={categories} />
        <Ticker products={products} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
