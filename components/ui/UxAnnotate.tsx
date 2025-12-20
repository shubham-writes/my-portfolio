'use client'

import { useUxStore } from '@/store/useUxStore'
import TooltipBubble from '../TooltipBubble'

interface UxAnnotateProps {
    children: React.ReactNode
    law: string
    insight: string
    position?: 'top' | 'bottom' | 'left' | 'right'
    variant?: 'default' | 'ghost'
    className?: string
}

export default function UxAnnotate({
    children,
    law,
    insight,
    position = 'bottom',
    variant = 'default',
    className = ''
}: UxAnnotateProps) {
    const showInsights = useUxStore((state) => state.showInsights)

    if (!showInsights) return <>{children}</>

    // Subtle highlight on hover for default variant (not ghost)
    const containerStyles = variant === 'default'
        ? "cursor-help transition-all duration-300 hover:scale-[1.02]"
        : ""

    // Tooltip positioning with proper spacing
    const positionStyles = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-4",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-4",
        left: "right-full top-1/2 -translate-y-1/2 mr-4",
        right: "left-full top-1/2 -translate-y-1/2 ml-4"
    }

    return (
        <div className={`relative inline-block group ${containerStyles} ${className}`}>
            {children}

            {/* Tooltip with smooth animations */}
            <div className={`
                absolute z-50 w-max
                opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                transition-all duration-300 ease-out
                pointer-events-none
                ${positionStyles[position]}
                ${position === 'top' ? 'group-hover:-translate-y-1' : ''}
                ${position === 'bottom' ? 'group-hover:translate-y-1' : ''}
                ${position === 'left' ? 'group-hover:-translate-x-1' : ''}
                ${position === 'right' ? 'group-hover:translate-x-1' : ''}
                group-hover:scale-100 scale-95
            `}>
                <TooltipBubble lawName={law} description={insight} position={position} />
            </div>

            {/* Optional: Subtle glow effect when insights are active */}
            {variant === 'default' && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none -z-10 blur-xl" />
            )}
        </div>
    )
}