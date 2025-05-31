"use client"

import { useMindGarden } from "@/contexts/MindGardenContext"
import { Brain, Lightbulb, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card } from "./ui/Card"
import { Badge } from "./ui/Badge"

export function AIInsightCard() {
  const { moodHistory, healthData, getHealthStatus, userProfile } = useMindGarden()

  const generateAdvancedInsight = () => {
    if (moodHistory.length === 0) {
      return {
        insight: `Welcome ${userProfile.name ? userProfile.name : "to MindGarden+"}! I'm your AI wellness companion. I'll learn your patterns and provide personalized insights as you track your journey.`,
        trend: "stable" as const,
        confidence: "low" as const,
      }
    }

    const recentMoods = moodHistory.slice(0, 7)
    const healthStatus = getHealthStatus()

    // Analyze mood patterns
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

    const recentAvg = recentMoods.slice(0, 3).reduce((sum, entry) => sum + (moodValues[entry.mood] || 3), 0) / 3
    const olderAvg =
      recentMoods.slice(3, 7).reduce((sum, entry) => sum + (moodValues[entry.mood] || 3), 0) /
      Math.max(recentMoods.slice(3, 7).length, 1)

    let trend: "improving" | "declining" | "stable" = "stable"
    if (recentAvg > olderAvg + 0.5) trend = "improving"
    else if (recentAvg < olderAvg - 0.5) trend = "declining"

    // Generate contextual insights
    let insight = ""
    let confidence: "high" | "medium" | "low" = "medium"

    if (trend === "improving") {
      insight = `Excellent progress! Your mood has improved significantly over the past week. Your current wellness routine seems to be working well. `
      if (healthStatus.isActive) {
        insight += `Your activity level of ${healthData.steps} steps is contributing to this positive trend.`
      }
      confidence = "high"
    } else if (trend === "declining") {
      insight = `I've noticed your mood trending downward recently. This could be temporary, but let's focus on some targeted support. `
      if (!healthStatus.isActive) {
        insight += `Low activity (${healthData.steps} steps) might be contributing - gentle movement could help.`
      } else if (!healthStatus.isCalm) {
        insight += `Your elevated heart rate (${healthData.heartRate} BPM) suggests stress might be a factor.`
      }
      confidence = "high"
    } else {
      // Stable mood - look for other patterns
      const dominantMood = recentMoods.reduce(
        (acc, entry) => {
          acc[entry.mood] = (acc[entry.mood] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      const topMood = Object.entries(dominantMood).sort(([, a], [, b]) => b - a)[0]?.[0]

      if (topMood === "thoughtful") {
        insight = `You've been in a reflective state lately. This introspective period is valuable for personal growth and self-understanding.`
      } else if (topMood === "neutral") {
        insight = `You're maintaining emotional stability, which is a strength. Consider this a good foundation to build new positive habits.`
      } else {
        insight = `Your mood has been consistent recently. Consistency in emotional well-being is a sign of good self-awareness and coping strategies.`
      }
      confidence = "medium"
    }

    return { insight, trend, confidence }
  }

  const { insight, trend, confidence } = generateAdvancedInsight()

  const getTrendIcon = () => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="text-green-500" size={20} />
      case "declining":
        return <TrendingDown className="text-red-500" size={20} />
      default:
        return <Minus className="text-gray-500" size={20} />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case "improving":
        return "success"
      case "declining":
        return "danger"
      default:
        return "neutral"
    }
  }

  return (
    <Card className="bg-gradient-to-br from-[#A8D5BA]/10 to-[#C5CAE9]/10 border-[#A8D5BA]/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Brain className="text-[#A8D5BA]" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">AI Wellness Insight</h3>
        </div>
        <div className="flex items-center space-x-2">
          {getTrendIcon()}
          <Badge variant={getTrendColor() as any}>{trend}</Badge>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <Lightbulb className="text-[#C5CAE9] mt-1 flex-shrink-0" size={20} />
        <div className="flex-1">
          <p className="text-gray-700 leading-relaxed mb-3">{insight}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>AI Confidence: {confidence}</span>
            <span>Based on {moodHistory.length} check-ins</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
