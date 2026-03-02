"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Bell, Shield, Key, CreditCard, Palette } from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "next-themes"
export default function SettingsPage() {
    const { theme, setTheme } = useTheme()
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = () => {
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
            toast.success("Settings saved successfully.")
        }, 1000)
    }

    return (
        <div className="space-y-6 max-w-5xl pb-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your account settings and set e-mail preferences.
                </p>
            </div>

            <Separator />

            <Tabs defaultValue="profile" orientation="vertical" className="flex flex-col md:grid md:grid-cols-[250px_1fr] gap-8 w-full">
                <TabsList className="flex flex-row md:flex-col h-auto bg-transparent items-start w-full space-x-2 md:space-x-0 md:space-y-1 rounded-none p-0 overflow-x-auto md:overflow-visible">
                    <TabsTrigger value="profile" className="w-full justify-start gap-2 data-[state=active]:bg-muted hover:bg-muted/50 transition-all rounded-md px-3 py-2 whitespace-nowrap">
                        <User className="h-4 w-4" /> Profile
                    </TabsTrigger>
                    <TabsTrigger value="account" className="w-full justify-start gap-2 data-[state=active]:bg-muted hover:bg-muted/50 transition-all rounded-md px-3 py-2 whitespace-nowrap">
                        <Shield className="h-4 w-4" /> Account
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="w-full justify-start gap-2 data-[state=active]:bg-muted hover:bg-muted/50 transition-all rounded-md px-3 py-2 whitespace-nowrap">
                        <Palette className="h-4 w-4" /> Appearance
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="w-full justify-start gap-2 data-[state=active]:bg-muted hover:bg-muted/50 transition-all rounded-md px-3 py-2 whitespace-nowrap">
                        <Bell className="h-4 w-4" /> Notifications
                    </TabsTrigger>
                    <TabsTrigger value="billing" className="w-full justify-start gap-2 data-[state=active]:bg-muted hover:bg-muted/50 transition-all rounded-md px-3 py-2 whitespace-nowrap">
                        <CreditCard className="h-4 w-4" /> Billing
                    </TabsTrigger>
                </TabsList>

                <div className="w-full max-w-3xl">
                    {/* PROFILE SETTINGS */}
                    <TabsContent value="profile" className="m-0 space-y-6 focus-visible:outline-none focus-visible:ring-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>Public Profile</CardTitle>
                                <CardDescription>
                                    This is how others will see you on the site.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src="" />
                                        <AvatarFallback className="text-2xl bg-primary/10 text-primary">JD</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline">Change Avatar</Button>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="name">Display Name</Label>
                                    <Input id="name" defaultValue="John Doe" className="max-w-md" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <textarea
                                        id="bio"
                                        className="flex min-h-[80px] w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Tell us a little bit about yourself"
                                        defaultValue="I am a software engineer building cool things."
                                    />
                                    <p className="text-[0.8rem] text-muted-foreground">
                                        Brief description for your profile. URLs are hyperlinked.
                                    </p>
                                </div>

                                <Button onClick={handleSave} disabled={isSaving}>
                                    {isSaving ? "Saving..." : "Update profile"}
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* ACCOUNT SETTINGS */}
                    <TabsContent value="account" className="m-0 space-y-6 focus-visible:outline-none focus-visible:ring-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Details</CardTitle>
                                <CardDescription>
                                    Update your account information and email address.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue="hello@example.com" className="max-w-md" disabled />
                                    <p className="text-[0.8rem] text-muted-foreground">
                                        Your email address is managed via your authentication provider.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-red-900/50 bg-red-900/10">
                            <CardHeader>
                                <CardTitle className="text-red-500">Danger Zone</CardTitle>
                                <CardDescription>
                                    Permanently delete your account and all of your content.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="destructive">Delete Account</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* APPEARANCE SETTINGS */}
                    <TabsContent value="appearance" className="m-0 space-y-6 focus-visible:outline-none focus-visible:ring-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>Appearance</CardTitle>
                                <CardDescription>
                                    Customize the look and feel of your dashboard.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <Label>Theme Preference</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
                                        <div
                                            onClick={() => setTheme("light")}
                                            className={`border-2 rounded-lg p-1 cursor-pointer transition-colors bg-white ${theme === 'light' ? 'border-primary' : 'border-muted hover:border-primary'}`}
                                        >
                                            <div className="bg-slate-100 rounded-md h-24 w-full p-2 space-y-2">
                                                <div className="bg-slate-200 h-4 w-1/2 rounded"></div>
                                                <div className="bg-white h-10 w-full rounded shadow-sm"></div>
                                            </div>
                                            <p className="text-center text-sm font-medium p-2 text-slate-900">Light</p>
                                        </div>
                                        <div
                                            onClick={() => setTheme("dark")}
                                            className={`border-2 rounded-lg p-1 cursor-pointer transition-colors bg-slate-950 ${theme === 'dark' ? 'border-primary' : 'border-muted hover:border-primary'}`}
                                        >
                                            <div className="bg-slate-900 rounded-md h-24 w-full p-2 space-y-2">
                                                <div className="bg-slate-800 h-4 w-1/2 rounded"></div>
                                                <div className="bg-slate-950 h-10 w-full rounded border border-slate-800"></div>
                                            </div>
                                            <p className="text-center text-sm font-medium p-2 text-slate-100">Dark</p>
                                        </div>
                                        <div
                                            onClick={() => setTheme("system")}
                                            className={`border-2 rounded-lg p-1 cursor-pointer transition-colors bg-slate-100 flex items-center justify-center ${theme === 'system' ? 'border-primary' : 'border-muted hover:border-primary'}`}
                                        >
                                            <div className="text-center">
                                                <Monitor className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                                                <p className="text-sm font-medium text-slate-900">System</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* NOTIFICATION SETTINGS */}
                    <TabsContent value="notifications" className="m-0 space-y-6 focus-visible:outline-none focus-visible:ring-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notifications</CardTitle>
                                <CardDescription>
                                    Configure how you receive updates and alerts.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between space-x-2 max-w-xl">
                                    <div className="flex flex-col space-y-1">
                                        <Label className="text-base">Marketing Emails</Label>
                                        <span className="text-sm text-muted-foreground">
                                            Receive emails about new products, features, and more.
                                        </span>
                                    </div>
                                    <Switch id="marketing" />
                                </div>
                                <Separator className="max-w-xl" />
                                <div className="flex items-center justify-between space-x-2 max-w-xl">
                                    <div className="flex flex-col space-y-1">
                                        <Label className="text-base">Security Alerts</Label>
                                        <span className="text-sm text-muted-foreground">
                                            Receive emails about your account security.
                                        </span>
                                    </div>
                                    <Switch id="security" defaultChecked disabled />
                                </div>
                                <Separator className="max-w-xl" />
                                <div className="flex items-center justify-between space-x-2 max-w-xl">
                                    <div className="flex flex-col space-y-1">
                                        <Label className="text-base">Usage Alerts</Label>
                                        <span className="text-sm text-muted-foreground">
                                            Receive notifications when you are close to your AI credit limits.
                                        </span>
                                    </div>
                                    <Switch id="usage" defaultChecked />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* BILLING REDIRECT */}
                    <TabsContent value="billing" className="m-0 space-y-6 focus-visible:outline-none focus-visible:ring-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>Subscription & Billing</CardTitle>
                                <CardDescription>
                                    Manage your Lemon Squeezy subscription, invoices, and payment methods.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={() => window.location.href = '/dashboard/billing'}>Go to Billing Portal</Button>
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
            viewBox="0 24"
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
