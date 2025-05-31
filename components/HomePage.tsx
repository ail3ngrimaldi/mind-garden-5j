"use client"

import { useMindGarden } from "@/contexts/MindGardenContext"
import { IsometricGarden } from "./IsometricGarden"
import { QuickMoodCheck } from "./QuickMoodCheck"
import { AISuggestionPanel } from "./AISuggestionPanel"
import { useState, useEffect } from "react"
import { Card } from "./ui/Card"
import { SmartHabitSuggestions } from "./SmartHabitSuggestions"

export function HomePage() {
  const { showSuggestions, gardenLevel, totalXP, lastGrowthAnimation } = useMindGarden()
  const [showGrowthAnimation, setShowGrowthAnimation] = useState(false)

  const currentLevelXP = totalXP % 100
  const progressPercentage = (currentLevelXP / 100) * 100

  useEffect(() => {
    if (lastGrowthAnimation) {
      setShowGrowthAnimation(true)
      const timer = setTimeout(() => {
        setShowGrowthAnimation(false)
      }, 2000) // Reduced from 3000 to 2000ms
      return () => clearTimeout(timer)
    }
  }, [lastGrowthAnimation])

  return (
    <div className="space-y-6 p-4">
      {/* Welcome Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Your Garden</h2>
        <p className="text-gray-600">How are you feeling today?</p>
      </div>

      {/* Garden Progress Bar */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-800">Garden Level {gardenLevel}</span>
          <span className="text-sm text-gray-600">{currentLevelXP}/100 XP</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-[#A8D5BA] to-[#C5CAE9] h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </Card>

      {/* Growth Animation Overlay */}
      {showGrowthAnimation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl animate-pulse">
            <div className="text-center">
              <div className="text-4xl mb-2">🌱✨</div>
              <h3 className="text-lg font-bold text-[#A8D5BA] mb-1">Your Garden is Growing!</h3>
              <p className="text-sm text-gray-600">+{lastGrowthAnimation} XP earned</p>
            </div>
          </div>
        </div>
      )}

      {/* Isometric Garden */}
      <IsometricGarden gardenLevel={gardenLevel} />

      {/* Quick Mood Check */}
      <QuickMoodCheck />

      {/* Smart AI Suggestions */}
      <SmartHabitSuggestions />

      {/* AI Suggestions */}
      {showSuggestions && <AISuggestionPanel />}
    </div>
  )
}
