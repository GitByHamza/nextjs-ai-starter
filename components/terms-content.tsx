'use client'

import { FadeUp } from '@/components/ui/fade-up'

const sections = [
    {
        title: '1. Acceptance of Terms',
        body: "By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.",
    },
    {
        title: '2. Use License',
        body: "Permission is granted to temporarily download one copy of the materials (information or software) on SaaS Boilerplate's website for personal, non-commercial transitory viewing only.",
    },
    {
        title: '3. Disclaimer',
        body: "The materials on SaaS Boilerplate's website are provided on an 'as is' basis. SaaS Boilerplate makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
    },
    {
        title: '4. Limitations',
        body: "In no event shall SaaS Boilerplate or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SaaS Boilerplate's website.",
    },
]

export function TermsContent() {
    return (
        <div className="prose dark:prose-invert max-w-none text-muted-foreground">
            <FadeUp delay={0}>
                <h1 className="text-3xl font-bold tracking-tighter mb-2 text-foreground">
                    Terms of Service
                </h1>
            </FadeUp>

            <FadeUp delay={80}>
                <p className="mb-8 text-sm">Last updated: February 14, 2026</p>
            </FadeUp>

            {sections.map((section, i) => (
                <FadeUp key={section.title} delay={i * 60} className="mt-8">
                    <h2 className="text-xl font-semibold text-foreground mb-4">{section.title}</h2>
                    <p className="mb-4">{section.body}</p>
                </FadeUp>
            ))}

            <FadeUp delay={0} className="mt-8">
                <p className="text-sm">
                    Contact us at{' '}
                    <a href="mailto:legal@example.com" className="underline underline-offset-4 hover:text-foreground transition-colors">
                        legal@example.com
                    </a>{' '}
                    for any questions.
                </p>
            </FadeUp>
        </div>
    )
}
