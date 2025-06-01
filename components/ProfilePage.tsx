"use client"

import { useMindGarden } from "@/contexts/MindGardenContext"
import { Calendar, TrendingUp, Heart, CheckCircle, Pencil } from "lucide-react"
import { Card } from "./ui/Card"
import { Badge } from "./ui/Badge"

const moodEmojiMap: { [key: string]: string } = {
  exhausted: "😴",
  burnout: "😵",
  sad: "😢",
  thoughtful: "🤔",
  neutral: "😐",
  happy: "😊",
  energetic: "⚡",
  excited: "🤩",
  anxious: "😰",
}

const moodColorMap: { [key: string]: string } = {
  exhausted: "#8B5A3C",
  burnout: "#DC2626",
  sad: "#3B82F6",
  thoughtful: "#8B5CF6",
  neutral: "#6B7280",
  happy: "#F59E0B",
  energetic: "#10B981",
  excited: "#EC4899",
  anxious: "#6366F1",
}

export function ProfilePage() {
  const { moodHistory, totalXP, gardenLevel, userProfile, healthData, getHealthStatus } = useMindGarden()

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
              anxious: 2,
            }
            return sum + (moodValues[entry.mood] || 3)
          }, 0) / moodHistory.length
        ).toFixed(1)
      : "0"

  const healthStatus = getHealthStatus()

  // Get last 7 days for mood trend
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date
  })

  const moodTrendData = last7Days.map((date) => {
    const dateStr = date.toISOString().split("T")[0]
    const entry = moodHistory.find((h) => h.date === dateStr)
    return {
      date,
      mood: entry?.mood || "neutral",
      dayLabel: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayShort: date.toLocaleDateString("en-US", { weekday: "short" }).charAt(0),
    }
  })

  // Replace the moodTrendData mapping with sample data that matches the image
  const sampleMoodData = [
    { mood: "sad", dayLabel: "Mon", dayShort: "M" },
    { mood: "sad", dayLabel: "Tue", dayShort: "T" },
    { mood: "neutral", dayLabel: "Wed", dayShort: "W" },
    { mood: "neutral", dayLabel: "Thu", dayShort: "T" },
    { mood: "happy", dayLabel: "Fri", dayShort: "F" },
    { mood: "happy", dayLabel: "Sat", dayShort: "S" },
    { mood: "thoughtful", dayLabel: "Sun", dayShort: "S" },
  ]

  return (
    <div className="space-y-6 p-4 pb-24 bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 font-title">Your wellness journey</h2>
      </div>

      {/* Profile Card */}
      <Card className="flex flex-col items-center p-6">
        <div className="w-24 h-24 bg-blue-100 rounded-full mb-4 overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="40" r="25" fill="#333" />
            <rect x="25" y="70" width="50" height="30" fill="#333" />
            <rect x="35" y="50" width="30" height="10" fill="#FFD700" />
            <rect x="40" y="35" width="8" height="5" fill="white" />
            <rect x="55" y="35" width="8" height="5" fill="white" />
            <rect x="40" y="45" width="20" height="2" fill="#333" />
          </svg>
        </div>

        <h3 className="text-xl font-bold mb-1">{userProfile.name || "Florencia Campana"}</h3>

        <div className="flex items-center text-gray-600 mb-4">
          <span>{userProfile.email || "florenciacampana@gmail.com"}</span>
          <CheckCircle className="ml-2 text-green-500" size={16} />
        </div>

        <button className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 hover:bg-gray-50 transition-colors">
          <Pencil size={16} className="mr-2" />
          Edit Profile
        </button>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 flex flex-col items-center justify-center">
          <Calendar className="text-[#A8D5BA] mb-2" size={24} />
          <span className="text-2xl font-bold">{currentStreak}</span>
          <span className="text-sm text-gray-600">Day streak</span>
        </Card>

        <Card className="p-4 flex flex-col items-center justify-center">
          <TrendingUp className="text-[#E9A1B0] mb-2" size={24} />
          <span className="text-2xl font-bold">{averageMood}</span>
          <span className="text-sm text-gray-600">Avg mood</span>
        </Card>

        <Card className="p-4 flex flex-col items-center justify-center">
          <Heart className="text-[#F4D35E] mb-2" size={24} />
          <span className="text-2xl font-bold">{gardenLevel}</span>
          <span className="text-sm text-gray-600">Garden Level</span>
        </Card>
      </div>

      {/* Wellness Goals */}
      <div>
        <h3 className="text-xl font-bold mb-4">Wellness goals</h3>
        <div className="grid grid-cols-2 gap-4">
          {userProfile.goals &&
            userProfile.goals.map((goal, index) => (
              <Card key={index} className="p-4 border border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-lg font-semibold">{goal}</p>
              </Card>
            ))}
        </div>
      </div>

      {/* Health Status */}
      <div>
        <h3 className="text-xl font-bold mb-4">Health status</h3>
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Activity level</span>
            <Badge variant={healthStatus.isActive ? "success" : "warning"}>
              {healthStatus.isActive ? "Active" : "Low Activity"}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">Stress level</span>
            <Badge variant={healthStatus.isCalm ? "success" : "danger"}>
              {healthStatus.isCalm ? "Calm" : "Elevated"}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">Mobility</span>
            <Badge variant={healthStatus.isAtHome ? "warning" : "success"}>
              {healthStatus.isAtHome ? "Mostly Home" : "Mobile"}
            </Badge>
          </div>
        </Card>
      </div>

      {/* Mood Trend Chart */}
      <div>
        <h3 className="text-xl font-bold mb-4">Mood trend (Last 7 days)</h3>
        <Card className="p-4">
          {/* Line Chart */}
          <div className="h-32 mb-4 relative">
            <svg viewBox="0 0 350 120" className="w-full h-full">
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="50" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 30" fill="none" stroke="#f3f4f6" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="350" height="120" fill="url(#grid)" />

              {/* Mood line */}
              <path
                d={generateMoodPath(sampleMoodData)}
                fill="none"
                stroke="#A8D5BA"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Fill area under curve */}
              <path
                d={generateMoodPath(sampleMoodData) + " L 300 120 L 50 120 Z"}
                fill="url(#moodGradient)"
                opacity="0.3"
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="moodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#A8D5BA" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#A8D5BA" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Day labels */}
          <div className="flex justify-between text-xs text-gray-500 mb-3">
            {sampleMoodData.map((day, index) => (
              <span key={index}>{day.dayLabel}</span>
            ))}
          </div>

          {/* Mood emojis */}
          <div className="flex justify-between">
            {sampleMoodData.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-2xl mb-1">{moodEmojiMap[day.mood]}</span>
                <span className="text-xs font-medium text-gray-600">{day.dayShort}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Check-ins */}
      <div>
        <h3 className="text-xl font-bold mb-4">Recent Check-ins</h3>
        <div className="space-y-3">
          {moodHistory.slice(0, 4).map((entry, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{ backgroundColor: moodColorMap[entry.mood] + "20" }}
                  >
                    {moodEmojiMap[entry.mood]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 capitalize">{entry.mood}</h4>
                    <p className="text-sm text-gray-600">{formatDate(entry.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-blue-600">
                    {entry.habitsCompleted.length} habit{entry.habitsCompleted.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
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

function generateMoodPath(moodData: any[]): string {
  const moodValues = {
    exhausted: 1,
    burnout: 1.5,
    sad: 2,
    thoughtful: 2.5,
    neutral: 3,
    happy: 4,
    energetic: 4.5,
    excited: 5,
    anxious: 2,
  }

  // Create sample data that matches the pattern in the image
  const samplePattern = [2, 2.2, 4.2, 2.8, 4.0, 4.1, 3.5] // Low, low, high, dip, high, high, slight down

  const points = samplePattern.map((value, index) => {
    const x = 50 + (index * 250) / 6 // Spread across 250px width, starting at x=50
    const y = 100 - ((value - 1) / 4) * 70 // Scale to fit in 70px height, inverted
    return `${x},${y}`
  })

  // Create smooth curve using quadratic bezier curves
  let path = `M ${points[0]}`

  for (let i = 1; i < points.length; i++) {
    const [prevX, prevY] = points[i - 1].split(",").map(Number)
    const [currX, currY] = points[i].split(",").map(Number)

    // Control point for smooth curve
    const cpX = (prevX + currX) / 2
    const cpY = (prevY + currY) / 2

    if (i === 1) {
      path += ` Q ${cpX},${prevY} ${currX},${currY}`
    } else {
      path += ` Q ${cpX},${currY} ${currX},${currY}`
    }
  }

  return path
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}
