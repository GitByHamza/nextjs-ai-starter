'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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

const values = [
    { label: 'Quality First', description: 'We never compromise on code quality or user experience.' },
    { label: 'Community Driven', description: 'We listen to our users and build what they need.' },
    { label: 'Open Source', description: 'We believe in the power of open collaboration.' },
]

export function AboutContent() {
    return (
        <div className="prose dark:prose-invert max-w-none">
            <FadeUp delay={0}>
                <h1 className="text-4xl font-bold tracking-tighter mb-8">About Us</h1>
            </FadeUp>

            <FadeUp delay={80}>
                <p className="text-xl text-muted-foreground mb-6">
                    We are a team of passionate developers building the next generation of SaaS tools.
                </p>
            </FadeUp>

            <FadeUp delay={140}>
                <p className="mb-4">
                    Our mission is to empower developers and founders to launch their ideas faster.
                    We believe that by providing a robust, production-ready boilerplate, we can help
                    you skip the repetitive layout work and focus on what makes your product unique.
                </p>
            </FadeUp>

            <FadeUp delay={180}>
                <p className="mb-4">
                    Founded in 2026, we have helped thousands of users build and deploy their applications
                    with confidence. Our stack assumes the best practices of modern web development,
                    leveraging Next.js, Supabase, and AI technologies.
                </p>
            </FadeUp>

            <FadeUp delay={220}>
                <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
            </FadeUp>

            <ul className="list-none pl-0 space-y-2 mb-8">
                {values.map((value, i) => (
                    <FadeUp key={value.label} delay={260 + i * 60}>
                        <li className="flex gap-2">
                            <span className="font-bold">{value.label}:</span>
                            <span className="text-muted-foreground">{value.description}</span>
                        </li>
                    </FadeUp>
                ))}
            </ul>

            <FadeUp delay={440}>
                <div className="flex gap-4 mt-8">
                    <Link href="/features">
                        <Button>Check out our Features</Button>
                    </Link>
                </div>
            </FadeUp>
        </div>
    )
}
