import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { OverviewChart } from '@/components/dashboard/overview-chart'
import { MessageSquare, Activity, CreditCard, Star } from 'lucide-react'

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch actual user data
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single()

    // Count real conversations
    const { count: chatCount } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id)

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                {/* Real User Chat Count */}
                <Card className="bg-muted/10 border-muted/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Chats</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-500">{chatCount || 0}</div>
                        <p className="text-xs text-muted-foreground">Conversations generated</p>
                    </CardContent>
                </Card>

                {/* Real Credits */}
                <Card className="bg-muted/10 border-muted/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Remaining Credits</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{profile?.is_pro ? 'Unlimited' : profile?.credits}</div>
                        <p className="text-xs text-muted-foreground">Available for AI generation</p>
                    </CardContent>
                </Card>

                {/* Real Subscription Status */}
                <Card className="bg-muted/10 border-muted/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Plan Status</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${profile?.is_pro ? 'text-green-500' : ''}`}>
                            {profile?.is_pro ? 'Pro Tier' : 'Free Tier'}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {profile?.is_pro ? 'Thanks for subscribing!' : 'Upgrade for unlimited access'}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 grid-cols-1">
                <OverviewChart />
                {/* Note: In a future step, we will connect the chart to real historical data grouped by month */}
            </div>
        </div>
    )
}