import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SaaS Boilerplate — Ship Your AI SaaS in Hours",
    template: "%s | SaaS Boilerplate",
  },
  description:
    "The ultimate Next.js 15 starter kit with Supabase, Lemon Squeezy payments, and AI integration. Production-ready, type-safe, and beautifully designed.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "SaaS Boilerplate — Ship Your AI SaaS in Hours",
    description:
      "The ultimate Next.js 15 starter kit with Supabase, Lemon Squeezy payments, and AI integration.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Boilerplate — Ship Your AI SaaS in Hours",
    description:
      "The ultimate Next.js 15 starter kit with Supabase, Lemon Squeezy payments, and AI integration.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
