"use client"

import { useMindGarden } from "@/contexts/MindGardenContext"
import { Sprout, CheckCircle } from "lucide-react"
import { useState } from "react"

export function AISuggestionPanel() {
  const { aiSuggestions } = useMindGarden()
  const [completedSuggestions, setCompletedSuggestions] = useState<string[]>([])

  const toggleSuggestion = (suggestion: string) => {
    setCompletedSuggestions((prev) =>
      prev.includes(suggestion) ? prev.filter((s) => s !== suggestion) : [...prev, suggestion],
    )
  }

  return (
    <div className="bg-gradient-to-br from-[#A8D5BA]/20 to-[#C5CAE9]/20 rounded-lg p-6 border border-[#A8D5BA]/30">
      <div className="flex items-center space-x-2 mb-4">
        <Sprout className="text-[#A8D5BA]" size={24} />
        <h3 className="text-lg font-semibold text-gray-800">Your Garden Suggests</h3>
      </div>

      <p className="text-gray-700 mb-4 text-sm">
        Based on how you're feeling today, your garden has grown some personalized suggestions to help you flourish:
      </p>

      <div className="space-y-3">
        {aiSuggestions.map((suggestion, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-white/70 rounded-lg border border-white/50">
            <button
              onClick={() => toggleSuggestion(suggestion)}
              className={`mt-0.5 transition-colors ${
                completedSuggestions.includes(suggestion) ? "text-[#A8D5BA]" : "text-gray-400 hover:text-[#A8D5BA]"
              }`}
            >
              <CheckCircle size={20} />
            </button>
            <span
              className={`flex-1 text-sm ${
                completedSuggestions.includes(suggestion) ? "line-through text-gray-500" : "text-gray-700"
              }`}
            >
              {suggestion}
            </span>
          </div>
        ))}
      </div>

      {completedSuggestions.length > 0 && (
        <div className="mt-4 p-3 bg-[#A8D5BA]/10 rounded-lg border border-[#A8D5BA]/20">
          <p className="text-sm text-gray-800 font-medium">
            🌱 Great job! You've completed {completedSuggestions.length} suggestion
            {completedSuggestions.length > 1 ? "s" : ""}. Your garden is growing!
          </p>
        </div>
      )}
    </div>
  )
}
