# 🛒 বাজার দর (BazarDor)

নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজারদর এক নজরে দেখার একটি Next.js ওয়েব অ্যাপ। চাল, ডাল, সবজি, মাছ-মাংস ইত্যাদির আজকের দাম, দামের ওঠানামা এবং বাজারভিত্তিক তুলনা দেখা যায়।

**Live:** `https://your-app.vercel.app` &nbsp;|&nbsp; **Repo:** `https://github.com/your-name/bazardor`

## ✨ Key Features
1. **লাইভ প্রাইস টিকার** – নেভবারের নিচে অবিরাম স্ক্রলিং দামের স্ট্রিপ (▲/▼ শতাংশসহ)
2. **আজ দাম বাড়া ও কমা পণ্য** – হোম পেজে সর্বোচ্চ ৬টি করে risers ও fallers
3. **ক্যাটাগরি পেজ ও সর্টিং** – বাংলা সংখ্যাকে সঠিক numeric মানে ধরে দাম অনুযায়ী সাজানো
4. **পণ্যের বিস্তারিত পেজ** – সর্বনিম্ন/সর্বোচ্চ/গড় দাম এবং বাজারভিত্তিক দামের টেবিল (Protected route)
5. **BetterAuth অথেন্টিকেশন** – Email/Password, Google ও GitHub লগইন, toast নোটিফিকেশন
6. **প্রোফাইল আপডেট** – নাম পরিবর্তনের ফর্ম
7. **সম্পূর্ণ responsive** – মোবাইল, ট্যাবলেট ও ডেস্কটপ; skeleton loader ও কাস্টম 404 পেজ

## 🧰 Technologies
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · DaisyUI · BetterAuth · MongoDB · react-hot-toast

## 🚀 Run locally
```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

## 🔐 Environment variables
See `.env.example`. OAuth callback URLs:
- Google: `{BETTER_AUTH_URL}/api/auth/callback/google`
- GitHub: `{BETTER_AUTH_URL}/api/auth/callback/github`

## 🌐 Data
`https://api.api-store.workers.dev/api/bazardor` (fallback: `https://api.abcz.workers.dev/api/bazardor`)
