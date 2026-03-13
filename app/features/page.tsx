import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { FeaturesContent } from '@/components/features-content'

export default function FeaturesPage() {
    return (
        <>
            <SiteHeader />
            <div className="flex min-h-screen flex-col">
                <main className="flex-1">
                    <section className="container mx-auto py-24 px-4 md:px-8 max-w-screen-2xl">
                        <FeaturesContent />
                    </section>
                </main>
            </div>
            <SiteFooter />
        </>
    )
}
