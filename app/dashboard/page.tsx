'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useUserSubscription } from '@/lib/hooks/use-user-subscription'
import { OverviewChart } from '@/components/dashboard/overview-chart'
import { Users, Activity, CreditCard } from 'lucide-react'

export default function DashboardPage() {
    const { data } = useUserSubscription()

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-muted/10 border-muted/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-500">$14,800</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-muted/10 border-muted/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-500">+1,100</div>
                        <p className="text-xs text-muted-foreground">+180 new today</p>
                    </CardContent>
                </Card>
                <Card className="bg-muted/10 border-muted/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data?.profile?.credits ?? '-'}</div>
                        <p className="text-xs text-muted-foreground">Available for AI generation</p>
                    </CardContent>
                </Card>
                <Card className="bg-muted/10 border-muted/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Subscription Status</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${data?.profile?.is_pro ? 'text-green-500' : ''}`}>
                            {data?.profile?.is_pro ? 'Active Pro' : 'Free Tier'}
                        </div>
                        <p className="text-xs text-muted-foreground">Upgrade for unlimited access</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {/* Huge Beautiful Chart goes here spanning entire width below the stats */}
                <OverviewChart />
            </div>
        </div>
    )
}
