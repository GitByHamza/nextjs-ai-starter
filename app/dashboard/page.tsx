'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useUserSubscription } from '@/lib/hooks/use-user-subscription'

export default function DashboardPage() {
    const { data } = useUserSubscription()

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data?.profile?.credits ?? '-'}</div>
                        <p className="text-xs text-muted-foreground">Available for AI generation</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Subscription Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{data?.profile?.is_pro ? 'Active Pro' : 'Free Tier'}</div>
                        <p className="text-xs text-muted-foreground">Upgrade for unlimited access</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
