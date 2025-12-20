// components/TooltipBubble.tsx

interface TooltipBubbleProps {
  lawName: string
  description: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export default function TooltipBubble({
  lawName,
  description,
  position = 'bottom'
}: TooltipBubbleProps) {

  // Arrow positioning based on tooltip position
  const arrowStyles = {
    top: "bottom-[-6px] left-1/2 -translate-x-1/2 rotate-180",
    bottom: "top-[-6px] left-1/2 -translate-x-1/2",
    left: "right-[-6px] top-1/2 -translate-y-1/2 rotate-90",
    right: "left-[-6px] top-1/2 -translate-y-1/2 -rotate-90"
  }

  return (
    <div className="relative">
      {/* Main Tooltip Container - Glassmorphism Effect */}
      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">

        {/* Gradient Border Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Content */}
        <div className="relative p-4 max-w-xs">
          {/* Law Name with Gradient */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
            <h4 className="font-semibold text-sm bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              {lawName}
            </h4>
          </div>

          {/* Description */}
          <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400 font-light">
            {description}
          </p>

          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>
      </div>

      {/* Arrow/Pointer */}
      <div className={`absolute ${arrowStyles[position]} w-3 h-3`}>
        <div className="w-full h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-l border-t border-gray-200/50 dark:border-gray-700/50 rotate-45" />
      </div>
    </div>
  )
}