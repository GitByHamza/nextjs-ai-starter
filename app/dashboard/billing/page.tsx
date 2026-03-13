'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { useUserSubscription } from '@/lib/hooks/use-user-subscription'
import { Check, CreditCard, Zap } from 'lucide-react'

export default function BillingPage() {
    const { data: subscription } = useUserSubscription()
    const isPro = subscription?.profile?.is_pro
    const credits = subscription?.profile?.credits ?? 0
    const maxCredits = isPro ? 'Unlimited' : 10
    const percentage = isPro ? 100 : (credits / 10) * 100

    const handleUpgrade = async () => {
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Send the variant ID to the backend!
                body: JSON.stringify({
                    // IMPORTANT: We use the NEXT_PUBLIC_ version of the variable here
                    variantId: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_VARIANT_PRO_MONTHLY
                })
            })
            const data = await response.json()
            if (data.url) {
                window.location.href = data.url
            } else {
                console.error('Failed to create checkout:', data.error)
            }
        } catch (error) {
            console.error('Error creating checkout:', error)
        }
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Billing & Plans</h2>
                <p className="text-muted-foreground">Manage your subscription and usage.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Usage Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-yellow-500" />
                            Credit Usage
                        </CardTitle>
                        <CardDescription>Your monthly AI generation credits.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>Used {isPro ? '∞' : 10 - credits} of {maxCredits}</span>
                                <span className="text-muted-foreground">{isPro ? 'Pro' : `${percentage}% Left`}</span>
                            </div>
                            <Progress value={isPro ? 100 : percentage} className="h-2" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {isPro
                                ? 'You have unlimited credits as a Pro member.'
                                : 'Upgrade to Pro for unlimited AI generations.'
                            }
                        </p>
                    </CardContent>
                </Card>

                {/* Subscription Status */}
                <Card className={isPro ? 'border-primary' : ''}>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                Subscription
                            </CardTitle>
                            {isPro && <Badge>Active</Badge>}
                        </div>
                        <CardDescription>Current plan details.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-2">
                            {isPro ? 'Pro Plan' : 'Free Tier'}
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Access to GPT-4o</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> {isPro ? 'Unlimited' : '10'} Credits/mo</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Priority Support</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        {isPro ? (
                            <Button variant="outline" className="w-full">Manage Subscription</Button>
                        ) : (
                            <Button className="w-full" onClick={handleUpgrade}>Upgrade to Pro</Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
