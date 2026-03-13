'use client'

import { FadeUp } from '@/components/ui/fade-up'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, Lock, Globe, BarChart3, MessageSquare, Box, Sparkles, Layers } from 'lucide-react'

const features = [
    { icon: Lock,         title: "Authentication Ready",    description: "Secure user authentication with Supabase Auth, including social logins and protected routes." },
    { icon: BarChart3,    title: "Analytics Dashboard",     description: "Built-in analytics to track user engagement and growth metrics right from the start." },
    { icon: MessageSquare,title: "AI Integration",          description: "Seamlessly integrated with Vercel AI SDK and Google Gemini for powerful AI capabilities." },
    { icon: Globe,        title: "Global Edge Network",     description: "Deployed on Vercel's Edge Network for lightning-fast performance worldwide." },
    { icon: Box,          title: "Database Included",       description: "Scalable PostgreSQL database hosted on Supabase with easy-to-use reliable APIs." },
    { icon: Sparkles,     title: "Modern UI/UX",            description: "Beautifully designed with Tailwind CSS and Shadcn UI components for a premium feel." },
    { icon: Layers,       title: "Lemon Squeezy Payments",  description: "Full e-commerce integration for subscriptions, one-time payments, and billing portal." },
    { icon: Zap,          title: "DX Focused",              description: "Optimized for developer experience with TypeScript, ESLint, and Prettier configuration." },
]

export function FeaturesContent() {
    return (
        <>
            <div className="flex flex-col items-center gap-4 text-center mb-16">
                <FadeUp delay={0}>
                    <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm">
                        Powerful Features
                    </Badge>
                </FadeUp>

                <FadeUp delay={80}>
                    <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">
                        Everything you need to ship faster.
                    </h1>
                </FadeUp>

                <FadeUp delay={160}>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                        Don't waste time building the boring stuff. Focus on your unique value proposition.
                    </p>
                </FadeUp>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, i) => (
                    <FadeUp key={feature.title} delay={i * 60}>
                        <Card className="bg-muted/5 border-muted/20 h-full">
                            <CardHeader>
                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <feature.icon className="h-5 w-5 text-primary" />
                                </div>
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    </FadeUp>
                ))}
            </div>
        </>
    )
}
