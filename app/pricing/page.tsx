import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { PricingContent } from '@/components/pricing-content'

export default function PricingPage() {
    return (
        <>
            <SiteHeader />
            <div className="flex min-h-screen flex-col">
                <main className="flex-1">
                    <section className="container mx-auto py-24 px-4 md:px-8 max-w-screen-2xl">
                        <PricingContent />
                    </section>
                </main>
            </div>
            <SiteFooter />
        </>
    )
}
