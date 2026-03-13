"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Shield, CreditCard, Palette, Monitor, Loader2, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
    const supabase = createClient()
    const router = useRouter()
    const { theme, setTheme } = useTheme()

    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [profile, setProfile] = useState<any>(null)

    // Load user data
    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                if (data) {
                    setProfile(data)
                }
            }
            setIsLoading(false)
        }
        fetchProfile()
    }, [supabase])

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!profile) return

        setIsSaving(true)

        const { error } = await supabase
            .from('profiles')
            .update({
                display_name: profile.display_name,
                bio: profile.bio,
            })
            .eq('id', profile.id)

        if (error) {
            toast.error("Failed to update profile: " + error.message)
        } else {
            toast.success("Profile updated successfully.")
        }
        setIsSaving(false)
    }

    const handleToggleNotification = async (field: string, value: boolean) => {
        if (!profile) return

        const updatedProfile = { ...profile, [field]: value }
        setProfile(updatedProfile)

        const { error } = await supabase
            .from('profiles')
            .update({ [field]: value })
            .eq('id', profile.id)

        if (error) {
            toast.error("Failed to update preference.")
            // Rollback local state if DB update fails
            setProfile(profile)
        } else {
            toast.success("Preferences updated.")
        }
    }

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("Are you absolutely sure? This will sign you out and you will need to contact support to fully purge your data.")
        if (!confirmDelete) return

        setIsSaving(true)
        // Sign out is the safest client-side action
        await supabase.auth.signOut()
        toast.info("Signed out. Please contact support for full account deletion.")
        router.push("/")
    }

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-5xl pb-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your account settings and preferences.
                </p>
            </div>

            <Separator />

            <Tabs defaultValue="profile" orientation="vertical" className="flex flex-col md:grid md:grid-cols-[250px_1fr] gap-8 w-full">
                <TabsList className="flex flex-row md:flex-col h-auto bg-transparent items-start w-full space-x-2 md:space-x-0 md:space-y-1 rounded-none p-0 overflow-x-auto md:overflow-visible">
                    <TabsTrigger value="profile" className="w-full justify-start gap-2 data-[state=active]:bg-muted rounded-md px-3 py-2">
                        <User className="h-4 w-4" /> Profile
                    </TabsTrigger>
                    <TabsTrigger value="account" className="w-full justify-start gap-2 data-[state=active]:bg-muted rounded-md px-3 py-2">
                        <Shield className="h-4 w-4" /> Account
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="w-full justify-start gap-2 data-[state=active]:bg-muted rounded-md px-3 py-2">
                        <Palette className="h-4 w-4" /> Appearance
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="w-full justify-start gap-2 data-[state=active]:bg-muted rounded-md px-3 py-2">
                        <Bell className="h-4 w-4" /> Notifications
                    </TabsTrigger>
                    <TabsTrigger value="billing" className="w-full justify-start gap-2 data-[state=active]:bg-muted rounded-md px-3 py-2">
                        <CreditCard className="h-4 w-4" /> Billing
                    </TabsTrigger>
                </TabsList>

                <div className="w-full max-w-3xl">
                    <TabsContent value="profile" className="m-0 space-y-6">
                        <form onSubmit={handleUpdateProfile}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Public Profile</CardTitle>
                                    <CardDescription>This is how others will see you on the site.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center gap-6">
                                        <Avatar className="h-20 w-20">
                                            <AvatarImage src={profile?.avatar_url} />
                                            <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                                                {profile?.email?.charAt(0).toUpperCase() || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <Button type="button" variant="outline" onClick={() => toast.info("Avatar upload integration coming soon!")}>
                                            Change Avatar
                                        </Button>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Display Name</Label>
                                        <Input
                                            id="name"
                                            value={profile?.display_name || ""}
                                            onChange={(e) => setProfile({...profile, display_name: e.target.value})}
                                            className="max-w-md"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <textarea
                                            id="bio"
                                            className="flex min-h-[80px] w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring outline-none transition-all"
                                            placeholder="Tell us a little bit about yourself"
                                            value={profile?.bio || ""}
                                            onChange={(e) => setProfile({...profile, bio: e.target.value})}
                                        />
                                    </div>

                                    <Button type="submit" disabled={isSaving}>
                                        {isSaving ? "Saving..." : "Update profile"}
                                    </Button>
                                </CardContent>
                            </Card>
                        </form>
                    </TabsContent>

                    <TabsContent value="account" className="m-0 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Details</CardTitle>
                                <CardDescription>Update your account information and email address.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" value={profile?.email || ""} className="max-w-md" disabled />
                                    <p className="text-[0.8rem] text-muted-foreground">
                                        Email changes are managed via your login provider.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-red-900/50 bg-red-900/10">
                            <CardHeader>
                                <CardTitle className="text-red-500 flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5" /> Danger Zone
                                </CardTitle>
                                <CardDescription>Sign out and request account deletion.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="destructive" onClick={handleDeleteAccount} disabled={isSaving}>
                                    Delete Account
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="appearance" className="m-0 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Appearance</CardTitle>
                                <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <Label>Theme Preference</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
                                        <div onClick={() => setTheme("light")} className={`border-2 rounded-lg p-1 cursor-pointer transition-all ${theme === 'light' ? 'border-primary' : 'border-muted hover:border-primary opacity-60'}`}>
                                            <div className="bg-slate-100 rounded-md h-20 w-full mb-2"></div>
                                            <p className="text-center text-sm font-medium">Light</p>
                                        </div>
                                        <div onClick={() => setTheme("dark")} className={`border-2 rounded-lg p-1 cursor-pointer transition-all ${theme === 'dark' ? 'border-primary' : 'border-muted hover:border-primary opacity-60'}`}>
                                            <div className="bg-slate-900 rounded-md h-20 w-full mb-2"></div>
                                            <p className="text-center text-sm font-medium">Dark</p>
                                        </div>
                                        <div onClick={() => setTheme("system")} className={`border-2 rounded-lg p-1 cursor-pointer transition-all ${theme === 'system' ? 'border-primary' : 'border-muted hover:border-primary opacity-60'}`}>
                                            <div className="bg-slate-500 rounded-md h-20 w-full mb-2 flex items-center justify-center"><Monitor className="text-white" /></div>
                                            <p className="text-center text-sm font-medium">System</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notifications" className="m-0 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notifications</CardTitle>
                                <CardDescription>Configure how you receive updates and alerts.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between space-x-2 max-w-xl">
                                    <Label className="text-base flex flex-col gap-1 cursor-pointer" htmlFor="marketing">
                                        Marketing Emails
                                        <span className="text-xs font-normal text-muted-foreground">New features and products.</span>
                                    </Label>
                                    <Switch
                                        id="marketing"
                                        checked={profile?.marketing_emails || false}
                                        onCheckedChange={(v) => handleToggleNotification('marketing_emails', v)}
                                    />
                                </div>
                                <Separator className="max-w-xl" />
                                <div className="flex items-center justify-between space-x-2 max-w-xl">
                                    <Label className="text-base flex flex-col gap-1 cursor-pointer" htmlFor="usage">
                                        Usage Alerts
                                        <span className="text-xs font-normal text-muted-foreground">Alerts when credits are low.</span>
                                    </Label>
                                    <Switch
                                        id="usage"
                                        checked={profile?.usage_alerts || false}
                                        onCheckedChange={(v) => handleToggleNotification('usage_alerts', v)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="billing" className="m-0 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Subscription & Billing</CardTitle>
                                <CardDescription>Manage your Lemon Squeezy subscription and invoices.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={() => router.push('/dashboard/billing')}>Go to Billing Portal</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}

function Monitor(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <line x1="8" x2="16" y1="21" y2="21" />
            <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
    )
}
