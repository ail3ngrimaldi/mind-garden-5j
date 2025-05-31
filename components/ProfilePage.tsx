"use client"

import { useMindGarden } from "@/contexts/MindGardenContext"
import { AIInsightCard } from "./AIInsightCard"
import { MoodTrendChart } from "./MoodTrendChart"
import { HealthMetrics } from "./HealthMetrics"
import { Calendar, TrendingUp, Heart } from "lucide-react"
import { MetricDisplay } from "./ui/MetricDisplay"
import { Card } from "./ui/Card"

const moodEmojiMap: { [key: string]: string } = {
  exhausted: "😴",
  burnout: "🔥",
  sad: "😢",
  thoughtful: "🤔",
  neutral: "😐",
  happy: "😊",
  energetic: "⚡",
  excited: "🤩",
}

export function ProfilePage() {
  const { moodHistory, totalXP, gardenLevel, userProfile } = useMindGarden()

  const currentStreak = calculateStreak(moodHistory)
  const averageMood =
    moodHistory.length > 0
      ? (
          moodHistory.reduce((sum, entry) => {
            const moodValues = {
              exhausted: 1,
              burnout: 1.5,
              sad: 2,
              thoughtful: 2.5,
              neutral: 3,
              happy: 4,
              energetic: 4.5,
              excited: 5,
            }
            return sum + (moodValues[entry.mood] || 3)
          }, 0) / moodHistory.length
        ).toFixed(1)
      : "0"

  return (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Wellness Journey</h2>
        <p className="text-gray-600">
          {userProfile.name ? `Hello, ${userProfile.name}` : "Insights and reflections on your growth"}
        </p>
      </div>

      {/* User Goals */}
      {userProfile.goals && userProfile.goals.length > 0 && (
        <Card className="bg-gradient-to-r from-[#A8D5BA]/10 to-[#C5CAE9]/10">
          <h3 className="font-semibold text-gray-800 mb-2">My Wellness Goals</h3>
          <ul className="list-disc list-inside space-y-1">
            {userProfile.goals.map((goal, index) => (
              <li key={index} className="text-sm text-gray-700">
                {goal}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <MetricDisplay icon={Calendar} value={currentStreak} label="Day Streak" color="#A8D5BA" />
        <MetricDisplay icon={TrendingUp} value={averageMood} label="Avg Mood" color="#E9A1B0" />
        <MetricDisplay icon={Heart} value={gardenLevel} label="Garden Level" color="#F4D35E" />
      </div>

      {/* Health Metrics */}
      <HealthMetrics />

      {/* Mood Trend */}
      <MoodTrendChart />

      {/* AI Insight */}
      <AIInsightCard />

      {/* Recent Activity */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Check-ins</h3>
        <div className="space-y-3">
          {moodHistory.slice(0, 5).map((entry, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{moodEmojiMap[entry.mood]}</span>
                <div>
                  <div className="font-medium text-gray-800">{new Date(entry.date).toLocaleDateString()}</div>
                  <div className="text-sm text-gray-600 capitalize">{entry.mood}</div>
                </div>
              </div>
              <div className="text-sm text-[#A8D5BA] font-medium">{entry.habitsCompleted.length} habits</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function calculateStreak(moodHistory: any[]): number {
  if (moodHistory.length === 0) return 0

  const sortedHistory = [...moodHistory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  let streak = 0
  const today = new Date()

  for (let i = 0; i < sortedHistory.length; i++) {
    const entryDate = new Date(sortedHistory[i].date)
    const daysDiff = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24))

    if (daysDiff === i) {
      streak++
    } else {
      break
    }
  }

  return streak
}
