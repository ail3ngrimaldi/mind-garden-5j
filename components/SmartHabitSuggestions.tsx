"use client"

import { useMindGarden } from "@/contexts/MindGardenContext"
import { Card } from "./ui/Card"
import { Badge } from "./ui/Badge"
import { Brain, Clock, Activity, Heart } from "lucide-react"

export function SmartHabitSuggestions() {
  const { currentMood, moodHistory, healthData, getHealthStatus } = useMindGarden()

  const generateSmartHabits = () => {
    const healthStatus = getHealthStatus()
    const timeOfDay = new Date().getHours()
    const recentMoods = moodHistory.slice(0, 3).map((entry) => entry.mood)

    const habits: Array<{ habit: string; reason: string; priority: "high" | "medium" | "low"; icon: any }> = []

    // Time-based suggestions
    if (timeOfDay >= 6 && timeOfDay <= 9) {
      habits.push({
        habit: "Start with 5 minutes of morning stretching",
        reason: "Morning routine",
        priority: "high",
        icon: Clock,
      })
    } else if (timeOfDay >= 12 && timeOfDay <= 14) {
      habits.push({
        habit: "Take a mindful lunch break away from screens",
        reason: "Midday reset",
        priority: "medium",
        icon: Clock,
      })
    } else if (timeOfDay >= 18 && timeOfDay <= 22) {
      habits.push({
        habit: "Practice evening wind-down routine",
        reason: "Evening preparation",
        priority: "high",
        icon: Clock,
      })
    }

    // Health-based suggestions
    if (!healthStatus.isActive) {
      habits.push({
        habit: "Take a 10-minute walk to boost energy",
        reason: `Low activity: ${healthData.steps} steps`,
        priority: "high",
        icon: Activity,
      })
    }

    if (!healthStatus.isCalm) {
      habits.push({
        habit: "Practice 4-7-8 breathing technique",
        reason: `Elevated heart rate: ${healthData.heartRate} BPM`,
        priority: "high",
        icon: Heart,
      })
    }

    // Pattern-based suggestions
    if (recentMoods.includes("exhausted") || recentMoods.includes("burnout")) {
      habits.push({
        habit: "Set one boundary to protect your energy",
        reason: "Recent exhaustion pattern",
        priority: "high",
        icon: Brain,
      })
    }

    // Mood-specific suggestions
    const moodHabits = {
      exhausted: [
        { habit: "Take a 15-minute power nap", reason: "Energy restoration", priority: "high" as const },
        { habit: "Drink a large glass of water", reason: "Hydration boost", priority: "medium" as const },
      ],
      burnout: [
        { habit: "Write down 3 things you can delegate", reason: "Workload management", priority: "high" as const },
        { habit: "Practice saying 'no' to one request today", reason: "Boundary setting", priority: "high" as const },
      ],
      sad: [
        { habit: "Call someone who makes you smile", reason: "Social connection", priority: "high" as const },
        { habit: "Listen to your favorite uplifting playlist", reason: "Mood elevation", priority: "medium" as const },
      ],
      happy: [
        { habit: "Share your positive energy with someone", reason: "Amplify joy", priority: "medium" as const },
        { habit: "Write down what's making you happy", reason: "Gratitude practice", priority: "low" as const },
      ],
      energetic: [
        { habit: "Channel energy into a creative project", reason: "Productive outlet", priority: "medium" as const },
        { habit: "Do 10 minutes of energizing exercise", reason: "Energy utilization", priority: "high" as const },
      ],
    }

    const moodSpecific = moodHabits[currentMood] || []
    habits.push(...moodSpecific.map((h) => ({ ...h, icon: Brain })))

    // Remove duplicates and sort by priority
    const uniqueHabits = habits.filter((habit, index, self) => index === self.findIndex((h) => h.habit === habit.habit))

    return uniqueHabits
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      })
      .slice(0, 4) // Limit to 4 suggestions
  }

  const smartHabits = generateSmartHabits()

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="text-[#A8D5BA]" size={24} />
        <h3 className="text-lg font-semibold text-gray-800">AI-Powered Suggestions</h3>
      </div>

      <div className="space-y-3">
        {smartHabits.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-start space-x-3">
                <Icon className="text-[#A8D5BA] mt-1 flex-shrink-0" size={16} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 mb-1">{item.habit}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{item.reason}</span>
                    <Badge
                      variant={item.priority === "high" ? "danger" : item.priority === "medium" ? "warning" : "neutral"}
                    >
                      {item.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 p-3 bg-[#A8D5BA]/10 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          💡 These suggestions adapt based on your mood patterns, health data, and time of day
        </p>
      </div>
    </Card>
  )
}
