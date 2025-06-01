"use client"

import { useMindGarden } from "@/contexts/MindGardenContext"
import { Card } from "./ui/Card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export function MoodTrendChart() {
  const { moodHistory } = useMindGarden()

  // Get last 7 days of mood data
  const last7Days = moodHistory.slice(0, 7).reverse()

  const getMoodValue = (mood: string): number => {
    const moodMap = {
      exhausted: 1,
      burnout: 1.5,
      sad: 2,
      thoughtful: 2.5,
      neutral: 3,
      happy: 4,
      energetic: 4.5,
      excited: 5,
    }
    return moodMap[mood] || 3
  }

  const getMoodColor = (mood: string): string => {
    const colorMap = {
      exhausted: "#EF4444",
      burnout: "#F97316",
      sad: "#3B82F6",
      thoughtful: "#8B5CF6",
      neutral: "#6B7280",
      happy: "#10B981",
      energetic: "#F59E0B",
      excited: "#EC4899",
    }
    return colorMap[mood] || "#6B7280"
  }

  const getMoodEmoji = (mood: string): string => {
    const emojiMap = {
      exhausted: "😴",
      burnout: "😵",
      sad: "😢",
      thoughtful: "🤔",
      neutral: "😐",
      happy: "😊",
      energetic: "⚡",
      excited: "🤩",
    }
    return emojiMap[mood] || "😐"
  }

  const calculateTrend = () => {
    if (last7Days.length < 2) return "stable"

    const recent = last7Days.slice(-3).reduce((sum, entry) => sum + getMoodValue(entry.mood), 0) / 3
    const older =
      last7Days.slice(0, -3).reduce((sum, entry) => sum + getMoodValue(entry.mood), 0) /
      Math.max(last7Days.length - 3, 1)

    if (recent > older + 0.3) return "improving"
    if (recent < older - 0.3) return "declining"
    return "stable"
  }

  const trend = calculateTrend()
  const averageMood =
    last7Days.length > 0
      ? (last7Days.reduce((sum, entry) => sum + getMoodValue(entry.mood), 0) / last7Days.length).toFixed(1)
      : "0"

  if (last7Days.length === 0) {
    return (
      <Card>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Mood Trend</h3>
        <div className="text-center text-gray-500 py-8">
          <p>Start tracking your mood to see trends here</p>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Mood Trend (Last 7 Days)</h3>
        <div className="flex items-center space-x-2">
          {trend === "improving" && <TrendingUp className="text-green-500" size={20} />}
          {trend === "declining" && <TrendingDown className="text-red-500" size={20} />}
          {trend === "stable" && <Minus className="text-gray-500" size={20} />}
          <span
            className={`text-sm font-medium ${
              trend === "improving" ? "text-green-600" : trend === "declining" ? "text-red-600" : "text-gray-600"
            }`}
          >
            {trend}
          </span>
        </div>
      </div>

      {/* Mood Timeline */}
      <div className="space-y-3">
        {last7Days.map((entry, index) => {
          const moodValue = getMoodValue(entry.mood)
          const percentage = (moodValue / 5) * 100

          return (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-12 text-xs text-gray-600 text-right">
                {new Date(entry.date).toLocaleDateString("en-US", { weekday: "short" })}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: getMoodColor(entry.mood),
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm">{getMoodEmoji(entry.mood)}</span>
                </div>
              </div>
              <div className="w-16 text-xs text-gray-600 capitalize">{entry.mood}</div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Average mood:</span>
          <span className="font-medium text-gray-800">{averageMood}/5.0</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-600">Trend:</span>
          <span
            className={`font-medium ${
              trend === "improving" ? "text-green-600" : trend === "declining" ? "text-red-600" : "text-gray-600"
            }`}
          >
            {trend === "improving" ? "📈 Improving" : trend === "declining" ? "📉 Needs attention" : "➡️ Stable"}
          </span>
        </div>
      </div>
    </Card>
  )
}
