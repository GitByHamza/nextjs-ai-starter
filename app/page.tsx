import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, Lock, Globe, BarChart3, MessageSquare } from 'lucide-react'
import { PricingSection } from '@/components/landing/pricing-section'
import { HeroVideo } from '@/components/landing/hero-video'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { createClient } from '@/lib/supabase/server'

export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 px-4 md:px-8 max-w-screen-2xl">
          <div className="flex flex-col items-center gap-4 text-center">
            <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm">
              v1.0 Public Beta is Live ✨
            </Badge>
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] max-w-3xl">
              Build Your AI SaaS in <span className="text-blue-600 dark:text-blue-400">Hours</span>, Not Weeks.
            </h1>
            <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
              The ultimate Next.js 15 starter kit with Supabase, Lemon Squeezy, and AI integration.
              Production-ready, type-safe, and beautifully accessible.
            </p>
            <div className="flex gap-4">
              <Link href={user ? "/dashboard" : "/login"}>
                <Button size="lg">I want this Boilerplate</Button>
              </Link>
              <Link href="https://github.com" target="_blank">
                <Button variant="outline" size="lg">View Demo</Button>
              </Link>
            </div>
          </div>

          {/* 3D Mockup Placeholder / Video */}
          <div className="mt-14 flex justify-center perspective-1000">
            <HeroVideo
              videoUrl={process.env.NEXT_PUBLIC_HERO_VIDEO_URL}
              imageUrl={process.env.NEXT_PUBLIC_HERO_IMAGE_URL}
            />
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="container mx-auto py-8 md:py-12 lg:py-24 px-4 md:px-8 max-w-screen-2xl">
          <div className="flex flex-col items-center gap-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">Packed with Features</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">Everything you need to launch your startup today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <Card className="md:col-span-2 bg-gradient-to-br from-card to-muted/20 border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5 text-blue-500" /> Auth Ready</CardTitle>
                <CardDescription>Supabase SSR authentication flow with protected middleware routes.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md bg-background/50 border p-4 font-mono text-xs text-muted-foreground">
                  Request → Middleware → Supabase Auth → Protected Route
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-green-500" /> Analytics</CardTitle>
                <CardDescription>Built-in analytics ready.</CardDescription>
              </CardHeader>
              <CardContent className="h-32 flex items-center justify-center">
                <div className="flex items-end gap-1 h-16">
                  <div className="w-2 bg-primary/20 h-8 rounded-t"></div>
                  <div className="w-2 bg-primary/40 h-12 rounded-t"></div>
                  <div className="w-2 bg-primary/60 h-10 rounded-t"></div>
                  <div className="w-2 bg-primary h-14 rounded-t"></div>
                  <div className="w-2 bg-primary/80 h-10 rounded-t"></div>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-purple-500" /> AI Streaming</CardTitle>
                <CardDescription>Vercel AI SDK integrated.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-end"><div className="bg-blue-600/20 text-blue-600 text-xs px-2 py-1 rounded">Hello AI</div></div>
                  <div className="flex justify-start"><div className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">Generating...</div></div>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5 text-orange-500" /> Global Scale</CardTitle>
                <CardDescription>Deployed on Vercel Edge Network.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-xs text-muted-foreground font-mono">
                  <span>US-EAST-1: 🟢</span>
                  <span>EU-WEST-1: 🟢</span>
                  <span>AS-EAST-1: 🟢</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing Section (Client Component) */}
        <PricingSection />
      </main>

      <SiteFooter />
    </div>
  )
}

