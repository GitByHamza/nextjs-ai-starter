# 🚀 SaaS Boilerplate

The ultimate Next.js 15 starter kit for founders who want to build and ship fast. Focus on your unique product, not the infrastructure.

![Hero Image](public/og-image.png)

## ✨ Features

- **Framework**: Next.js 15 (App Router, Server Actions)
- **Styling**: Tailwind CSS v4 + Shadcn UI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Email + OAuth like Google)
- **Payments**: Lemon Squeezy (Subscriptions + Webhooks handling)
- **AI Integration**: Vercel AI SDK + Google Gemini / OpenAI Support
- **Theming**: Premium "Tokyo Night" Dark Mode Support
- **Components**: Pre-built Landing Page, Dashboard, Pricing, Legal pages.

---

## 🛠️ Quick Setup

### 1. Clone & Install
```bash
git clone <your-repo-url> my-saas
cd my-saas
npm install
```

### 2. Environment Variables
Copy the example environment file:
```bash
cp .env.local.example .env.local
```
Fill in the values in your `.env.local` based on the steps below.

### 3. Supabase Setup (Database & Auth)
1. Create a project at [Supabase](https://supabase.com/).
2. Get your **Project URL** and **Anon Key** (Settings -> API). Add to `.env.local`.
3. Get the **Service Role Key** (Keep this secure!). Add to `.env.local`.
4. Go to **SQL Editor** in Supabase and run the provided schemas (if any) or enable the provided integrations.
5. Create a `profiles` table to store user metadata (Credits, Stripe/Lemon Squeezy Customer ID).
*(See detailed Supabase setup guide in the documentation folder)*

### 4. Lemon Squeezy Setup (Payments)
1. Create a store at [Lemon Squeezy](https://www.lemonsqueezy.com/).
2. Create a Product and a Variant (e.g., "Pro Subscription"). Grab the **Variant ID**.
3. Go to **Settings -> API** and generate an API key. Add to `.env.local`.
4. Set up Webhooks pointing to `https://yourdomain.com/api/webhooks/lemon-squeezy`.
*(Note: For local development, use a tool like Ngrok to test webhooks).*

### 5. AI Integration Setup
1. Get an API key from [Google AI Studio](https://aistudio.google.com/) for Gemini.
2. Add `GOOGLE_GENERATIVE_AI_API_KEY` to `.env.local`.
3. *(Alternative)* If using OpenAI, provide `OPENAI_API_KEY`.

### 6. Run the App
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 📜 License

This is a commercial boilerplate.
- **You CAN**: Use this code to build unlimited SaaS products for yourself or clients and make money from those apps.
- **You CANNOT**: Resell, redistribute, or openly share the raw source code or claim it as your own boilerplate product.

Built by [Your Name/Company].
