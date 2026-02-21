"use client"

import { useState, useRef, useEffect } from "react"

interface HeroVideoProps {
    videoUrl?: string
    imageUrl?: string
}

export function HeroVideo({ videoUrl, imageUrl }: HeroVideoProps) {
    const [videoError, setVideoError] = useState(false)
    const [imageError, setImageError] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    // Reset error state if inputs change
    useEffect(() => {
        setVideoError(false)
        setImageError(false)
    }, [videoUrl, imageUrl])

    // Helper for the Mac Window Header
    const MacWindowHeader = () => (
        <div className="absolute inset-x-0 top-0 h-10 bg-background/80 border-b flex items-center px-4 gap-2 z-10 transition-opacity duration-300 group-hover:opacity-100">
            <div className="h-3 w-3 rounded-full bg-red-400/80"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-400/80"></div>
            <div className="h-3 w-3 rounded-full bg-green-400/80"></div>
        </div>
    )

    // 1. Render Video if available and no error
    if (videoUrl && !videoError) {
        return (
            <div className="relative w-full max-w-4xl aspect-[16/9] rounded-xl border border-[#414868] shadow-2xl overflow-hidden transform rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out group bg-black">
                <MacWindowHeader />
                <video
                    ref={videoRef}
                    src={videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    onError={() => setVideoError(true)}
                />
            </div>
        )
    }

    // 2. Render Image if available and no error (Fallback from Video)
    if (imageUrl && !imageError) {
        return (
            <div className="relative w-full max-w-4xl aspect-[16/9] rounded-xl border border-[#414868] shadow-2xl overflow-hidden transform rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out group bg-black">
                <MacWindowHeader />
                {/* Using standard img tag to support external URLs easily */}
                <img
                    src={imageUrl}
                    alt="Dashboard Preview"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                />
            </div>
        )
    }

    // 3. Fallback Skeleton (If neither Video nor Image works)
    return (
        <div className="relative w-full max-w-4xl aspect-[16/9] rounded-xl border border-[#414868] bg-gradient-to-br from-[#24283b] via-[#1f2335] to-[#24283b] shadow-2xl overflow-hidden transform rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out group">
            <div className="absolute inset-x-0 top-0 h-10 bg-background/80 border-b flex items-center px-4 gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400/80"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400/80"></div>
                <div className="h-3 w-3 rounded-full bg-green-400/80"></div>
            </div>
            <div className="pt-14 p-8 grid grid-cols-4 gap-4 h-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50">
                <div className="col-span-1 rounded-lg bg-muted/50 h-full animate-pulse"></div>
                <div className="col-span-3 grid grid-rows-3 gap-4">
                    <div className="row-span-2 rounded-lg bg-muted/50 h-full animate-pulse delay-75"></div>
                    <div className="row-span-1 grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-muted/50 h-full animate-pulse delay-150"></div>
                        <div className="rounded-lg bg-muted/50 h-full animate-pulse delay-200"></div>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none"></div>
        </div>
    )
}
