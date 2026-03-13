'use client'

import { useInView } from '@/lib/hooks/use-in-view'

interface FadeUpProps {
    children: React.ReactNode
    delay?: number
    className?: string
}

export function FadeUp({ children, delay = 0, className = '' }: FadeUpProps) {
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
