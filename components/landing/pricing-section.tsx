'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export function PricingSection() {
    const [isYearly, setIsYearly] = useState(false)

    return (
        <section id="pricing" className="container mx-auto py-8 md:py-12 lg:py-24 px-4 md:px-8 max-w-screen-2xl bg-muted/30">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">Simple Pricing</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">Choose the plan that fits your needs.</p>
                <div className="flex items-center space-x-2 mt-4">
                    <span className={`text-sm ${!isYearly ? 'font-bold' : 'text-muted-foreground'}`}>Monthly</span>
                    <Switch checked={isYearly} onCheckedChange={setIsYearly} />
                    <span className={`text-sm ${isYearly ? 'font-bold' : 'text-muted-foreground'}`}>Yearly <span className="text-green-500 text-xs ml-1">(-20%)</span></span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <PricingCard
                    title="Hobby"
                    price="0"
                    description="For learning and side projects."
                    features={['Up to 3 projects', 'Basic Analytics', 'Community Support']}
                />
                <PricingCard
                    title="Pro"
                    price={isYearly ? "290" : "29"}
                    description="For serious founders."
                    features={['Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'Custom Domain']}
                    highlighted
                    yearly={isYearly}
                    variantId={isYearly ? process.env.NEXT_PUBLIC_LEMON_SQUEEZY_VARIANT_PRO_YEARLY : process.env.NEXT_PUBLIC_LEMON_SQUEEZY_VARIANT_PRO_MONTHLY}
                />
                <PricingCard
                    title="Enterprise"
                    price={isYearly ? "990" : "99"}
                    description="For scaling teams."
                    features={['SSO', 'SLA', 'Dedicated Manager', 'Audit Logs']}
                    yearly={isYearly}
                    variantId={isYearly ? process.env.NEXT_PUBLIC_LEMON_SQUEEZY_VARIANT_ENTERPRISE_YEARLY : process.env.NEXT_PUBLIC_LEMON_SQUEEZY_VARIANT_ENTERPRISE_MONTHLY}
                />
            </div>
        </section>
    )
}

function PricingCard({ title, price, description, features, highlighted = false, yearly = false, variantId }: { title: string, price: string, description: string, features: string[], highlighted?: boolean, yearly?: boolean, variantId?: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        if (!variantId) return;
        
        try {
            setIsLoading(true);
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ variantId }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else if (data.error === "Unauthorized") {
                window.location.href = "/login";
            } else {
                console.error("Checkout error:", data.error);
                alert("Checkout failed: " + data.error);
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Checkout failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className={`flex flex-col ${highlighted ? 'border-primary shadow-lg scale-105' : ''}`}>
            <CardHeader>
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="text-3xl font-bold mb-6">
                    ${price}<span className="text-sm font-normal text-muted-foreground">/{yearly ? 'yr' : 'mo'}</span>
                </div>
                <div className="space-y-2">
                    {features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                {title === "Hobby" ? (
                    <Button className="w-full" variant="outline" onClick={() => window.location.href = "/login"}>
                        Get Started
                    </Button>
                ) : (
                    <Button 
                        className="w-full" 
                        variant={highlighted ? 'default' : 'outline'}
                        onClick={handleCheckout}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Get Started"}
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
