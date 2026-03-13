📊 Full Project Analysis: `nextjs-ai-starter` — AI SaaS Boilerplate

## 🏗️ Architecture Overview

This is a **production-ready, full-stack SaaS boilerplate** built with the **Next.js 15 App Router**. It is designed as a launchpad for founders who want to ship an AI-powered SaaS product quickly. The architecture follows a clean separation of concerns across three layers: **public marketing**, **authenticated dashboard**, and **backend API routes**.

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router, Server Components, Server Actions) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS v4 + `tw-animate-css` |
| **UI Components** | Shadcn UI (New York style, Lucide icons) |
| **Database** | Supabase (PostgreSQL via `@supabase/ssr`) |
| **Auth** | Supabase Auth — Magic Link OTP + OAuth (GitHub, Google) |
| **Payments** | Lemon Squeezy (`@lemonsqueezy/lemonsqueezy.js`) |
| **AI** | Vercel AI SDK (`ai`, `@ai-sdk/google`, `@ai-sdk/openai`) + Google Gemini 2.0 Flash |
| **Email** | Resend + `@react-email/components` |
| **State Management** | TanStack React Query v5 |
| **Blog** | MDX via `next-mdx-remote` + `gray-matter` |
| **Charts** | Recharts |
| **Theming** | `next-themes` (Light / Tokyo Night Dark) |
| **Forms** | `react-hook-form` + `zod` |

---

## 📁 Project Structure (Annotated)

```/dev/null/structure.txt#L1-50
nextjs-ai-starter/
├── app/
│   ├── (auth)/login/         → Public login page (OTP + OAuth)
│   ├── auth/callback/        → OAuth exchange code handler
│   ├── admin/                → Admin panel (email-whitelisted access)
│   ├── api/
│   │   ├── chat/             → AI streaming route (Gemini)
│   │   ├── checkout/         → Lemon Squeezy checkout creation
│   │   └── webhooks/
│   │       └── lemon-squeezy/ → Handles payment events, upgrades users
│   ├── blog/                 → MDX-powered blog (list + [slug])
│   ├── dashboard/            → Protected area
│   │   ├── layout.tsx        → Sidebar nav + mobile drawer
│   │   ├── page.tsx          → Stats overview
│   │   ├── chat/             → AI chat interface
│   │   ├── history/          → Past conversations
│   │   ├── billing/          → Subscription management
│   │   └── settings/         → Profile, theme, notifications
│   ├── setup/                → Dev helper when .env is missing
│   ├── about/, features/, pricing/ → Marketing sub-pages
│   └── legal/privacy/, legal/terms/ → Legal pages
├── components/
│   ├── ui/                   → Shadcn primitives
│   ├── layout/               → SiteHeader, SiteFooter
│   ├── landing/              → HeroVideo, PricingSection
│   ├── dashboard/            → OverviewChart (Recharts)
│   ├── emails/               → UpgradeEmail (react-email)
│   └── providers.tsx         → QueryClient + ThemeProvider + Toaster
├── lib/
│   ├── supabase/             → client, server, admin, middleware clients
│   ├── hooks/                → useUserSubscription (React Query)
│   ├── emails/               → resend.ts utility
│   ├── blog.ts               → getAllPosts / getPostBySlug (fs-based MDX)
│   ├── lemon-squeezy.ts      → configureLemonSqueezy()
│   └── utils.ts              → cn() (clsx + tailwind-merge)
├── supabase/migrations/
│   ├── 00_init.sql           → profiles table, RLS policies, trigger
│   └── 01_add_plan_type.sql  → plan_type + subscription ID columns
├── scripts/
│   ├── make-user-pro.js      → Dev CLI: manually upgrade a user
│   ├── list-gemini-models.js → Dev utility: list available Gemini models
│   └── test-openai.js        → Dev utility: test OpenAI connectivity
├── content/posts/            → MDX blog posts
├── middleware.ts             → Session refresh + route protection
└── public/                  → Static assets
```

---

## 🔒 Authentication & Authorization Flow

The auth system uses **Supabase SSR** with two different client types depending on context:

- `lib/supabase/client.ts` — Browser client (`createBrowserClient`)
- `lib/supabase/server.ts` — Server Component client (`createServerClient` with cookies)
- `lib/supabase/admin.ts` — Admin client with `SUPABASE_SERVICE_ROLE_KEY` (bypasses RLS)
- `lib/supabase/middleware.ts` — Session refresh + route guard logic

The **middleware** (`middleware.ts`) intercepts **every request** (except static files), refreshes the Supabase session, and redirects to `/login` if unauthenticated users try to reach `/dashboard/**` or `/api/chat`. It also performs a clever **developer experience guard**: if `NEXT_PUBLIC_SUPABASE_URL` is missing or still set to the placeholder, it redirects to `/setup`.

Login supports three methods:
1. **Magic Link OTP** via email
2. **GitHub OAuth**
3. **Google OAuth**

All OAuth flows redirect through `/auth/callback`, which exchanges the code for a session and redirects to `/dashboard`.

---

## 🗄️ Database Schema

The single core table is `profiles`, auto-populated by a **Postgres trigger** (`handle_new_user`) that fires on every new `auth.users` insert:

```nextjs-ai-starter/supabase/migrations/00_init.sql#L1-35
-- profiles table
id            uuid (FK → auth.users, PK)
email         text
is_pro        boolean (default false)
stripe_customer_id  text       ← leftover from a prior Stripe integration
lemon_squeezy_customer_id text
credits       int (default 10)
created_at    timestamptz
-- Added in migration 01:
plan_type     text (default 'free')
lemon_squeezy_subscription_id text
```

RLS policies ensure users can only **select, insert, and update their own rows**. The webhook handler uses the **admin client** (service role key) to bypass RLS and upgrade user profiles server-side.

There are also two additional tables referenced in code (`conversations`, `messages`) that are **not defined in the migrations**. These must be created manually.

---

## 💳 Payment & Subscription Flow

The payment lifecycle is handled end-to-end:

1. **Checkout**: User clicks "Upgrade" → `POST /api/checkout` → creates a Lemon Squeezy checkout session with the user's email + `user_id` in `custom_data` → returns a redirect URL.
2. **Webhook**: Lemon Squeezy sends a signed `POST` to `/api/webhooks/lemon-squeezy`. The handler:
   - Verifies the **HMAC-SHA256 signature** (`X-Signature` header).
   - Extracts `user_id` from `custom_data`.
   - Maps the `variant_id` to a plan (`pro` → 500 credits, `enterprise` → 9999 credits).
   - Updates the `profiles` row using the **admin Supabase client**.
   - Sends a **Resend upgrade email** via `react-email`.
3. **Cancellation**: `subscription_cancelled` / `subscription_expired` events reset `is_pro` to `false`.

Three pricing tiers are supported with monthly/yearly variants: **Hobby (free)**, **Pro ($29/mo)**, **Enterprise ($99/mo)**.

---

## 🤖 AI Integration

The chat system uses **Vercel AI SDK** with Google Gemini 2.0 Flash:

```nextjs-ai-starter/app/api/chat/route.ts#L1-65
POST /api/chat
1. Authenticates user (401 if not logged in)
2. Checks credits (403 if free user has 0 credits)
3. Deducts 1 credit for free-tier users
4. Upserts a conversation row (using the client-generated chatId UUID)
5. Saves the user message to `messages` table
6. Streams the Gemini response with streamText()
7. Saves the AI reply via onFinish() callback
```

The client (`dashboard/chat/page.tsx`) uses `useChat` from `@ai-sdk/react`, generating a `crypto.randomUUID()` per session to identify conversations. The chat UI features avatars, streaming loading states, error display, and auto-scroll.

---

## 🎨 UI & Theming

- **Design system**: Shadcn UI (New York style) configured in `components.json`
- **Dark mode**: A hand-crafted **"Tokyo Night"** dark theme with colors like `#16161e` (background), `#7aa2f7` (primary blue), `#c0caf5` (foreground)
- **Animations**: `tw-animate-css` + custom `FadeUp` intersection-observer animation components in `about-content.tsx`, `features-content.tsx`, `pricing-content.tsx`
- **Font**: Inter (Google Fonts)
- **Hero**: The `HeroVideo` component renders a Mac-window-chrome mockup that shows a video → image → animated skeleton fallback in priority order, with a CSS 3D perspective tilt effect on hover

---

## 📝 Blog System

The blog is a **file-system-based MDX engine**:
- Posts live in `content/posts/*.mdx`
- `lib/blog.ts` reads files with `fs`, parses frontmatter with `gray-matter`
- Rendered with `next-mdx-remote/rsc` (React Server Components compatible)
- Styled with `@tailwindcss/typography` (`prose` classes)
- Metadata (`title`, `description`, `date`, `author`, `image`) is driven by MDX frontmatter

---

## 👑 Admin Panel

Located at `/app/admin/page.tsx`. Access is controlled by a **hardcoded email allowlist** (`ADMIN_EMAILS`). It displays:
- Total users, Pro subscribers, Free users, Estimated Revenue
- A complete user management table with plan badge, credits, signup date, and subscription ID

---

## 📧 Transactional Email

`lib/emails/resend.ts` wraps the Resend SDK. The `UpgradeEmail` component is a full `react-email` template sent after a successful subscription webhook.

---

## 🛠️ Developer Tooling

| Script | Purpose |
|---|---|
| `scripts/make-user-pro.js` | CLI tool: manually grant Pro status to a user by email |
| `scripts/list-gemini-models.js` | CLI tool: lists all available Gemini models from the API |
| `scripts/test-openai.js` | CLI tool: tests OpenAI API connectivity |
| `generate-thumbnail.js` | Generates a project thumbnail using the `canvas` package |

---

## ⚠️ Issues & Areas to Watch

1. **Missing DB migrations**: The `conversations` and `messages` tables are used heavily in the API (`/api/chat`, history page, dashboard) but **have no migration files**. A developer running the app from scratch will hit errors.

2. **Hardcoded Admin Email**: `app/admin/page.tsx` has `professorhamza000@gmail.com` hardcoded. This should be moved to an environment variable.

3. **`stripe_customer_id` ghost column**: The `profiles` table has a `stripe_customer_id` column that was never removed, hinting at an earlier Stripe integration that was replaced by Lemon Squeezy.

4. **`OverviewChart` uses static mock data**: The chart in `dashboard/page.tsx` renders hardcoded dummy data (`Jan–Jun` sales figures) with a comment saying "In a future step, we will connect to real data."

5. **`useInView` + `FadeUp` is duplicated** across `about-content.tsx`, `features-content.tsx`, and `pricing-content.tsx`. This utility should be extracted into a shared hook.

6. **History page links to `/chat/:id`** which doesn't exist — that route is not implemented.

7. **`google` cast in login** — `'google' as any` in the login page is a type workaround that indicates the OAuth provider type definition may be slightly mismatched.

8. **`NEXT_PUBLIC_LEMON_SQUEEZY_VARIANT_*` in webhooks**: Using `NEXT_PUBLIC_` env vars server-side in the webhook handler works, but is semantically wrong — these values are also exposed to the client browser.

9. **No `.env.local.example` in repo**: The README references `cp .env.local.example .env.local` but no such example file is visible in the project directory.

---

## ✅ Strengths

- **Excellent DX**: The `/setup` page catches developers who miss the `.env.local` configuration step.
- **Security-first**: HMAC webhook signature verification, RLS on the database, separate admin client.
- **Credit-gating system**: A clean, functional freemium gate on the AI endpoint.
- **Multi-platform AI**: The AI layer is abstracted via the Vercel AI SDK, making it easy to swap between Gemini and OpenAI.
- **Fully typed**: TypeScript strict mode throughout.
- **Responsive**: Desktop sidebar + mobile Sheet drawer on the dashboard layout.
- **Polished landing page**: Bento grid features section, 3D hero mockup, animated pricing cards, Tokyo Night dark theme.
