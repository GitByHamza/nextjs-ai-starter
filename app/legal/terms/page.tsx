import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'

export default function TermsPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
                <section className="container mx-auto py-24 px-4 md:px-8 max-w-3xl">
                    <h1 className="text-3xl font-bold tracking-tighter mb-8">Terms of Service</h1>
                    <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                        <p className="mb-4">Last updated: February 14, 2026</p>

                        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
                        <p className="mb-4">
                            By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Use License</h2>
                        <p className="mb-4">
                            Permission is granted to temporarily download one copy of the materials (information or software) on SaaS Boilerplate's website for personal, non-commercial transitory viewing only.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Disclaimer</h2>
                        <p className="mb-4">
                            The materials on SaaS Boilerplate's website are provided on an 'as is' basis. SaaS Boilerplate makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>

                        <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Limitations</h2>
                        <p className="mb-4">
                            In no event shall SaaS Boilerplate or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SaaS Boilerplate's website.
                        </p>

                        <p className="mt-8 text-sm">
                            Contact us at legal@example.com for any questions.
                        </p>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    )
}
