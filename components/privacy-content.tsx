'use client'

import { useEffect, useRef, useState } from 'react'

function useInView() {
    const ref = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.15 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return { ref, inView }
}

function FadeUp({
    children,
    delay = 0,
    className = '',
}: {
    children: React.ReactNode
    delay?: number
    className?: string
}) {
    const { ref, inView } = useInView()

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0px)' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
            }}
        >
            {children}
        </div>
    )
}

const sections = [
    {
        title: '1. Information We Collect',
        body: 'We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.',
    },
    {
        title: '2. How We Use Information',
        body: 'We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to send you related information.',
    },
    {
        title: '3. Data Security',
        body: 'We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.',
    },
    {
        title: '4. Cookies',
        body: 'We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.',
    },
]

export function PrivacyContent() {
    return (
        <div className="prose dark:prose-invert max-w-none text-muted-foreground">
            <FadeUp delay={0}>
                <h1 className="text-3xl font-bold tracking-tighter mb-2 text-foreground">
                    Privacy Policy
                </h1>
            </FadeUp>

            <FadeUp delay={80}>
                <p className="mb-8 text-sm">Last updated: February 14, 2026</p>
            </FadeUp>

            {sections.map((section, i) => (
                <FadeUp key={section.title} delay={i * 60} className="mt-8">
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                        {section.title}
                    </h2>
                    <p className="mb-4">{section.body}</p>
                </FadeUp>
            ))}

            <FadeUp delay={0} className="mt-8">
                <p className="text-sm">
                    Contact us at{' '}
                    <a
                        href="mailto:privacy@example.com"
                        className="underline underline-offset-4 hover:text-foreground transition-colors"
                    >
                        privacy@example.com
                    </a>{' '}
                    for any questions.
                </p>
            </FadeUp>
        </div>
    )
}
