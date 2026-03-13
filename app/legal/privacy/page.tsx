import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { PrivacyContent } from '@/components/privacy-content'

export default function PrivacyPage() {
    return (
        <>
            <SiteHeader />
            <div className="flex min-h-screen flex-col">
                <main className="flex-1">
                    <section className="container mx-auto py-24 px-4 md:px-8 max-w-3xl">
                        <PrivacyContent />
                    </section>
                </main>
            </div>
            <SiteFooter />
        </>
    )
}
