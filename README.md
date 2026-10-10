<div align="center">

# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে**

নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজারদর, দামের ওঠানামা এবং বাজারভিত্তিক তুলনা — সব এক জায়গায়।

[🌐 Live Demo](https://your-app.vercel.app) · [💻 GitHub Repo](https://github.com/prerana0023/bazardor)

</div>

---

## 📖 About

**BazarDor** is a daily market price tracker for Bangladesh. It shows today's prices for rice, lentils, oil, vegetables, fish, meat, dairy and spices, highlights which items went up or down, and lets signed-in users compare prices across different markets and divisions.

চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের দাম, কোন পণ্যের দাম বাড়ল বা কমল, এবং বিভিন্ন বাজারের দামের তুলনা দেখা যায় এই অ্যাপে।

## ✨ Key Features

| # | Feature | Details |
|---|---------|---------|
| 1 | 📈 **Live price ticker** | Infinite scrolling strip with emoji, name, price per unit and ▲/▼ change % |
| 2 | 🔺🔻 **Risers & fallers** | Top 6 products whose prices went up and down today |
| 3 | 🗂️ **Category pages with sorting** | Sort by default / price low→high / high→low. Bengali numerals are converted to real numbers before sorting |
| 4 | 🔐 **Authentication** | Email/password, Google and GitHub login with BetterAuth and toast notifications |
| 5 | 🛡️ **Protected product details** | Min / max / average price and a market-wise price table, visible only after login |
| 6 | 👤 **Profile & update info** | View profile and update your name |
| 7 | 📱 **Fully responsive** | Works on mobile, tablet and desktop, with skeleton loaders and a custom 404 page |

## 🧰 Tech Stack

| Purpose | Technology |
|---------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS, DaisyUI |
| Authentication | BetterAuth |
| Database | MongoDB Atlas |
| Notifications | react-hot-toast |
| Fonts | Hind Siliguri (Bengali) |
| Deployment | Vercel |

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/prerana0023/bazardor.git
cd bazardor

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string (include database name) |
| `BETTER_AUTH_SECRET` | Random secret, e.g. `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | `http://localhost:3000` locally, your live URL in production |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials |

OAuth callback URLs:
- Google: `{BETTER_AUTH_URL}/api/auth/callback/google`
- GitHub: `{BETTER_AUTH_URL}/api/auth/callback/github`

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Home (hero, risers, fallers, all products)
│   ├── category/[slug]/         # Category page with sorting
│   ├── product/[slug]/          # Protected product details
│   ├── signin/  signup/         # Auth pages
│   ├── profile/  profile/update/
│   ├── api/auth/[...all]/       # BetterAuth route handler
│   └── not-found.tsx            # Custom 404
├── components/                  # Navbar, Ticker, ProductCard, Footer ...
├── lib/                         # api, auth, Bengali number helpers, sort
└── middleware.ts                # Protects product & profile routes
```

## 🌐 Data Source

Prices are fetched live from the official project API:

- `https://openapi.programming-hero.com/api/bazardor` (primary)
- `https://api.api-store.workers.dev/api/bazardor` and `https://api.abcz.workers.dev/api/bazardor` (fallback mirrors)

If every server is unreachable, the app falls back to a saved snapshot of the same data so the site stays usable.

## 👩‍💻 Author

**Prerana Nandi** — [GitHub](https://github.com/prerana0023)

---

<div align="center">

সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।

</div>