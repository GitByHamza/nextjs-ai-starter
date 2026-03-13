'use client'

import { FadeUp } from '@/components/ui/fade-up'
import { Badge } from '@/components/ui/badge'
import { PricingSection } from '@/components/landing/pricing-section'

export function PricingContent() {
    return (
        <>
            <div className="flex flex-col items-center gap-4 text-center mb-12">
                <FadeUp delay={0}>
                    <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm">
                        Simple Pricing
                    </Badge>
                </FadeUp>

                <FadeUp delay={80}>
                    <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">
                        Choose the plan that fits your needs.
                    </h1>
                </FadeUp>

                <FadeUp delay={160}>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                        Transparent pricing. No hidden fees. Cancel anytime.
                    </p>
                </FadeUp>
            </div>

            <FadeUp delay={240}>
                <PricingSection />
            </FadeUp>
        </>
    )
}
