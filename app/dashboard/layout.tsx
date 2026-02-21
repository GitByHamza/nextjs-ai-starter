'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Loader2, Menu, LogOut, LayoutDashboard, CreditCard, MessageSquare, Clock, Settings, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useUserSubscription } from '@/lib/hooks/use-user-subscription'

const navItems = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/chat', label: 'AI Chat', icon: MessageSquare },
    { href: '/dashboard/history', label: 'History', icon: Clock },
    { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const { data: subscription, isLoading } = useUserSubscription()
    const supabase = createClient()

    async function handleSignOut() {
        await supabase.auth.signOut()
        router.refresh()
        router.push('/')
    }

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center bg-background"><Loader2 className="h-8 w-8 animate-spin" /></div>
    }

    return (
        <div className="flex min-h-screen flex-col md:flex-row bg-background">
            {/* Desktop Sidebar */}
            <aside className="hidden w-64 flex-col border-r bg-card p-4 md:flex">
                <div className="flex items-center gap-2 font-bold text-xl mb-8 px-2">
                    <div className="h-6 w-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                        <span className="text-xs">S</span>
                    </div>
                    <span>SaaS Boilerplate</span>
                </div>
                <nav className="flex flex-col gap-1 flex-grow">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant={pathname === item.href ? 'secondary' : 'ghost'}
                                className={`w-full justify-start gap-2 ${pathname === item.href ? 'bg-secondary' : ''}`}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Button>
                        </Link>
                    ))}
                </nav>

                {/* User Dropdown */}
                <div className="border-t pt-4 mt-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                                <Avatar className="h-9 w-9 border">
                                    <AvatarImage src={subscription?.user.user_metadata?.avatar_url} />
                                    <AvatarFallback>{subscription?.user.email?.substring(0, 2).toUpperCase() ?? 'U'}</AvatarFallback>
                                </Avatar>
                                <div className="text-sm overflow-hidden flex-1">
                                    <p className="font-medium truncate">{subscription?.user.user_metadata?.full_name || 'User'}</p>
                                    <p className="text-xs text-muted-foreground truncate w-[120px]">{subscription?.user.email}</p>
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" /> Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" /> Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleSignOut} className="text-red-500 focus:text-red-500">
                                <LogOut className="mr-2 h-4 w-4" /> Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="flex h-14 items-center border-b bg-background px-4 md:hidden sticky top-0 z-10">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-4">
                        <div className="flex items-center gap-2 font-bold text-xl mb-8">
                            <span>SaaS Boilerplate</span>
                        </div>
                        <nav className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        variant={pathname === item.href ? 'secondary' : 'ghost'}
                                        className="w-full justify-start gap-2"
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </Button>
                                </Link>
                            ))}
                            <div className="border-t my-4"></div>
                            <Button variant="ghost" className="w-full justify-start gap-2 text-red-500" onClick={handleSignOut}>
                                <LogOut className="h-4 w-4" /> Sign Out
                            </Button>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="ml-auto font-semibold">Dashboard</div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-auto bg-muted/5">
                <div className="mx-auto max-w-6xl">
                    {children}
                </div>
            </main>
        </div>
    )
}
