import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
                <section className="container mx-auto py-24 px-4 md:px-8 max-w-3xl">
                    <h1 className="text-4xl font-bold tracking-tighter mb-8">About Us</h1>
                    <div className="prose dark:prose-invert max-w-none">
                        <p className="text-xl text-muted-foreground mb-6">
                            We are a team of passionate developers building the next generation of SaaS tools.
                        </p>
                        <p className="mb-4">
                            Our mission is to empower developers and founders to launch their ideas faster.
                            We believe that by providing a robust, production-ready boilerplate, we can help
                            you skip the repetitive layout work and focus on what makes your product unique.
                        </p>
                        <p className="mb-4">
                            Founded in 2026, we have helped thousands of users build and deploy their applications
                            with confidence. Our stack assumes the best practices of modern web development,
                            leveraging Next.js, Supabase, and AI technologies.
                        </p>
                        <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
                        <ul className="list-disc pl-6 space-y-2 mb-8">
                            <li>**Quality First**: We never compromise on code quality or user experience.</li>
                            <li>**Community Driven**: We listen to our users and build what they need.</li>
                            <li>**Open Source**: We believe in the power of open collaboration.</li>
                        </ul>
                        <div className="flex gap-4 mt-8">
                            <Link href="/features">
                                <Button>Check out our Features</Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    )
}
