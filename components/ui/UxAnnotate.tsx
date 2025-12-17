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

    // CLEANED: No more dashed borders. Invisible wrapper for "Discovery Mode".
    const containerStyles = ""

    const positionStyles = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-3", // Added slightly more margin
        bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
        left: "right-full top-1/2 -translate-y-1/2 mr-3",
        right: "left-full top-1/2 -translate-y-1/2 ml-3"
    }

    return (
        <div className={`relative inline-block group ${containerStyles} ${className}`}>
            {children}

            <div className={`
                absolute z-50 w-max max-w-xs
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                pointer-events-none
                ${positionStyles[position]}
            `}>
                <TooltipBubble lawName={law} description={insight} />
            </div>
        </div>
    )
}