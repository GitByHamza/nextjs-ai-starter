'use client'

import { useEffect, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { PricingSection } from '@/components/landing/pricing-section'

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

export function PricingContent() {
    return (
        <>
            <div className="flex flex-col items-center gap-4 text-center mb-12">
                <FadeUp delay={0}>
                    <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm">
                        Simple Pricing
                    </Badge>
                </FadeUp>

                <FadeUp delay={80}>
                    <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">
                        Choose the plan that fits your needs.
                    </h1>
                </FadeUp>

                <FadeUp delay={160}>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                        Transparent pricing. No hidden fees. Cancel anytime.
                    </p>
                </FadeUp>
            </div>

            <FadeUp delay={240}>
                <PricingSection />
            </FadeUp>
        </>
    )
}
