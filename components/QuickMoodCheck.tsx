"use client"

import { useState } from "react"
import { useMindGarden } from "@/contexts/MindGardenContext"
import { Sparkles } from "lucide-react"
import { MoodButton } from "./ui/MoodButton"
import { Card } from "./ui/Card"

const moodOptions = [
  { value: "exhausted", emoji: "😴", label: "Exhausted" },
  { value: "burnout", emoji: "🔥", label: "Burnout" },
  { value: "sad", emoji: "😢", label: "Sad" },
  { value: "thoughtful", emoji: "🤔", label: "Thoughtful" },
  { value: "neutral", emoji: "😐", label: "Neutral" },
  { value: "happy", emoji: "😊", label: "Happy" },
  { value: "energetic", emoji: "⚡", label: "Energetic" },
  { value: "excited", emoji: "🤩", label: "Excited" },
]

export function QuickMoodCheck() {
  const { currentMood, setCurrentMood, generatedHabits, completedHabits, toggleHabit, submitDailyCheckIn } =
    useMindGarden()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    submitDailyCheckIn()
    setIsSubmitting(false)
  }

  const selectedMood = moodOptions.find((mood) => mood.value === currentMood) || moodOptions[4]

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Check-in</h3>

      {/* Current Mood Display */}
      <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg mb-4">
        <span className="text-4xl mr-3">{selectedMood.emoji}</span>
        <div>
          <p className="text-sm text-gray-600">Current mood</p>
          <p className="font-semibold text-gray-800">{selectedMood.label}</p>
        </div>
      </div>

      {/* Mood Grid */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {moodOptions.map((mood) => (
          <MoodButton
            key={mood.value}
            mood={mood}
            isSelected={currentMood === mood.value}
            onClick={() => setCurrentMood(mood.value)}
          />
        ))}
      </div>

      {/* Generated Habits based on mood */}
      {generatedHabits.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">
            Suggested habits for feeling {selectedMood.label.toLowerCase()}:
          </h4>
          <div className="space-y-3">
            {generatedHabits.map((habit) => (
              <label
                key={habit}
                className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[#A8D5BA] focus-within:ring-offset-2"
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center ${
                    completedHabits.includes(habit) ? "bg-[#A8D5BA] border-[#A8D5BA]" : ""
                  }`}
                >
                  {completedHabits.includes(habit) && <span className="text-white text-xs font-bold">✓</span>}
                </div>
                <input
                  type="checkbox"
                  checked={completedHabits.includes(habit)}
                  onChange={() => toggleHabit(habit)}
                  className="sr-only"
                  aria-label={`Complete habit: ${habit}`}
                />
                <span
                  className={`flex-1 text-sm ${
                    completedHabits.includes(habit) ? "line-through text-gray-500" : "text-gray-700"
                  }`}
                >
                  {habit}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting || generatedHabits.length === 0}
        className="w-full bg-gradient-to-r from-[#A8D5BA] to-[#C5CAE9] text-gray-800 py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-800"></div>
            <span>Growing your garden...</span>
          </>
        ) : (
          <>
            <Sparkles size={20} />
            <span>Nurture Your Garden</span>
          </>
        )}
      </button>
    </Card>
  )
}
