// components/TooltipBubble.tsx

interface TooltipBubbleProps {
  lawName: string
  description: string
}

export default function TooltipBubble({ lawName, description }: TooltipBubbleProps) {
  return (
    <div className="absolute z-50 bg-white dark:bg-gray-900 text-black dark:text-white border p-3 rounded-xl shadow-lg text-sm max-w-xs">
      <strong>{lawName}</strong>
      <p>{description}</p>
    </div>
  )
}
