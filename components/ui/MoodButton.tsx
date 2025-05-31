"use client"

interface MoodOption {
  value: string
  emoji: string
  label: string
}

interface MoodButtonProps {
  mood: MoodOption
  isSelected: boolean
  onClick: () => void
}

export function MoodButton({ mood, isSelected, onClick }: MoodButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-200 ${
        isSelected
          ? "bg-[#A8D5BA] text-white shadow-md border-[#8BC1A3]"
          : "border-gray-200 hover:bg-gray-50 text-gray-700"
      }`}
    >
      <span className="text-xl mb-1">{mood.emoji}</span>
      <span className="text-xs font-medium">{mood.label}</span>
    </button>
  )
}
