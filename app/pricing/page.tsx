import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { PricingSection } from '@/components/landing/pricing-section'
import { Badge } from '@/components/ui/badge'

export default function PricingPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
                <section className="container mx-auto py-24 px-4 md:px-8 max-w-screen-2xl">
                    <div className="flex flex-col items-center gap-4 text-center mb-12">
                        <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm">
                            Simple Pricing
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">Choose the plan that fits your needs.</h1>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl">
                            Transparent pricing. No hidden fees. Cancel anytime.
                        </p>
                    </div>
                    <PricingSection />
                </section>
            </main>
            <SiteFooter />
        </div>
    )
}
