import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'

export default function PrivacyPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
                <section className="container mx-auto py-24 px-4 md:px-8 max-w-3xl">
                    <h1 className="text-3xl font-bold tracking-tighter mb-8">Privacy Policy</h1>
                    <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                        <p className="mb-4">Last updated: February 14, 2026</p>

                        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
                        <p className="mb-4">
                            We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. How We Use Information</h2>
                        <p className="mb-4">
                            We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to send you related information.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Data Security</h2>
                        <p className="mb-4">
                            We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Cookies</h2>
                        <p className="mb-4">
                            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
                        </p>

                        <p className="mt-8 text-sm">
                            Contact us at privacy@example.com for any questions.
                        </p>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    )
}
