"use client"

import { useMindGarden } from "@/contexts/MindGardenContext"
import { Brain, Lightbulb } from "lucide-react"

export function InsightCard() {
  const { moodHistory } = useMindGarden()

  const generateInsight = () => {
    if (moodHistory.length === 0) {
      return "Welcome to MindGarden+! Start your wellness journey by completing your first daily check-in. Every small step counts toward building lasting habits."
    }

    const recentMoods = moodHistory.slice(0, 7)
    const moodCounts = recentMoods.reduce(
      (acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const dominantMood = Object.entries(moodCounts).sort(([, a], [, b]) => b - a)[0]?.[0]

    if (dominantMood === "happy" || dominantMood === "excited") {
      return "You've been radiating positive energy lately! Your consistent self-care practices are creating a beautiful foundation for wellbeing. Keep nurturing these healthy habits."
    } else if (dominantMood === "thoughtful") {
      return "I notice you've been in a reflective state recently. This introspective time is valuable for personal growth. Your garden thrives when you take time to understand yourself."
    } else if (dominantMood === "exhausted" || dominantMood === "burnout") {
      return "It looks like you've been going through a challenging time. Remember that rest is not a luxury but a necessity. Your garden grows strongest when you honor your need for restoration."
    } else {
      return "You're building a steady foundation for your wellness journey. Each check-in is like watering your garden - small actions that create lasting change over time."
    }
  }

  return (
    <div className="bg-gradient-to-br from-[#A8D5BA]/10 to-[#C5CAE9]/10 rounded-lg p-6 border border-[#A8D5BA]/20">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="text-[#A8D5BA]" size={24} />
        <h3 className="text-lg font-semibold text-gray-800">Garden Reflection</h3>
      </div>

      <div className="flex items-start space-x-3">
        <Lightbulb className="text-[#C5CAE9] mt-1 flex-shrink-0" size={20} />
        <p className="text-gray-700 leading-relaxed">{generateInsight()}</p>
      </div>
    </div>
  )
}
