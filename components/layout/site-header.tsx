import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export async function SiteHeader() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                            <Zap className="h-4 w-4" />
                        </div>
                        <span>SaaS Boilerplate</span>
                    </Link>
                </div>
                <nav className="flex items-center gap-6 text-sm font-medium">
                    <Link href="/features" className="transition-colors hover:text-foreground/80 text-foreground/60 hidden md:block">Features</Link>
                    <Link href="/pricing" className="transition-colors hover:text-foreground/80 text-foreground/60 hidden md:block">Pricing</Link>
                    <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60 hidden md:block">About</Link>
                    <div className="flex items-center gap-2">
                        {user ? (
                            <Link href="/dashboard">
                                <Button size="sm">Dashboard</Button>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" size="sm">Login</Button>
                                </Link>
                                <Link href="/login">
                                    <Button size="sm">Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}
