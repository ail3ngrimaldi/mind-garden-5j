"use client"

import { useMindGarden } from "@/contexts/MindGardenContext"
import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"

const moodOptions = [
  { value: "exhausted", emoji: "😴", label: "Exhausted", color: "#8B5A3C" },
  { value: "burnout", emoji: "😵", label: "Burnout", color: "#DC2626" },
  { value: "sad", emoji: "😢", label: "Sad", color: "#3B82F6" },
  { value: "thoughtful", emoji: "🤔", label: "Thoughtful", color: "#8B5CF6" },
  { value: "neutral", emoji: "😐", label: "Neutral", color: "#6B7280" },
  { value: "happy", emoji: "😊", label: "Happy", color: "#F59E0B" },
  { value: "energetic", emoji: "⚡", label: "Energetic", color: "#10B981" },
  { value: "excited", emoji: "🤩", label: "Excited", color: "#EC4899" },
]

const moodBasedHabits: { [key: string]: string[] } = {
  exhausted: [
    "Take a 15-20 minute power nap to restore energy",
    "Do gentle stretching or yoga poses",
    "Drink a large glass of water and have a healthy snack",
    "Practice deep breathing for 5-10 minutes",
  ],
  burnout: [
    "Set clear boundaries - say no to one request today",
    "Take a 20-minute walk outside without your phone",
    "Write down 3 things you're grateful for",
    "Delegate one task to someone else",
  ],
  sad: [
    "Call or text someone who cares about you",
    "Listen to uplifting music or watch something funny",
    "Do something creative for 15 minutes",
    "Practice self-compassion - treat yourself kindly",
  ],
  thoughtful: [
    "Journal about your current thoughts and insights",
    "Take a mindful walk and observe your surroundings",
    "Read something inspiring or educational",
    "Practice meditation for 10-15 minutes",
  ],
  neutral: [
    "Try a new 5-minute mindfulness exercise",
    "Organize one small area of your space",
    "Learn something new for 10 minutes",
    "Do one kind thing for yourself",
  ],
  happy: [
    "Share your joy with someone you care about",
    "Do a random act of kindness for someone",
    "Dance to your favorite song",
    "Write down what's making you happy right now",
  ],
  energetic: [
    "Channel energy into a 20-30 minute workout",
    "Tackle a project you've been putting off",
    "Go for a brisk walk or run outside",
    "Clean and organize your living space",
  ],
  excited: [
    "Start working on that project you've been thinking about",
    "Share your excitement with friends or family",
    "Plan something fun for later this week",
    "Use this energy to learn a new skill",
  ],
}

export function HomePage() {
  const {
    currentMood,
    setCurrentMood,
    gardenLevel,
    totalXP,
    lastGrowthAnimation,
    completedHabits,
    toggleHabit,
    submitDailyCheckIn,
  } = useMindGarden()
  const [showGrowthAnimation, setShowGrowthAnimation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentLevelXP = totalXP % 100
  const progressPercentage = (currentLevelXP / 100) * 100

  useEffect(() => {
    if (lastGrowthAnimation) {
      setShowGrowthAnimation(true)
      const timer = setTimeout(() => {
        setShowGrowthAnimation(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [lastGrowthAnimation])

  const selectedMood = moodOptions.find((mood) => mood.value === currentMood) || moodOptions[5]
  const suggestedHabits = moodBasedHabits[currentMood] || []

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    submitDailyCheckIn()
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-sky-100 pb-24">
      {/* Header */}
      <div className="bg-sky-300 p-4 pb-6">
        <h1 className="text-2xl font-bold text-gray-800 font-title">Welcome to MindGarden+</h1>
      </div>

      {/* Garden View */}
      <div className="mx-4 -mt-2">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4 font-title">Your garden</h2>
          <div className="h-32 flex items-center justify-center">
            {gardenLevel < 2 ? (
              <div className="w-16 h-8 bg-[#8B4513] rounded-lg"></div>
            ) : (
              <div className="flex items-end justify-center">
                <div className="w-16 h-8 bg-[#8B4513] rounded-lg"></div>
                {gardenLevel >= 2 && <div className="w-4 h-16 bg-[#5C9E7C] rounded-t-lg mx-2"></div>}
                {gardenLevel >= 3 && <div className="w-4 h-24 bg-[#5C9E7C] rounded-t-lg mx-2"></div>}
                {gardenLevel >= 4 && <div className="w-4 h-20 bg-[#5C9E7C] rounded-t-lg mx-2"></div>}
              </div>
            )}
          </div>
        </div>

        {/* Garden Level */}
        <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Garden Level</span>
            <span className="text-sm text-gray-600">{currentLevelXP}/100XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#B8C0E0] h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Daily Check - New Design */}
        <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-bold mb-4 font-title">Daily check</h2>

          {/* Current Mood Display - New Design */}
          <div className="bg-white rounded-2xl p-4 mb-4 border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mr-4"
                style={{ backgroundColor: selectedMood.color }}
              >
                {selectedMood.emoji}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 font-title">{selectedMood.label}</h3>
                <p className="text-gray-600">Current Mood</p>
              </div>
            </div>
          </div>

          {/* Mood Grid */}
          <div className="grid grid-cols-4 gap-3">
            {moodOptions.slice(0, 4).map((mood) => (
              <button
                key={mood.value}
                onClick={() => setCurrentMood(mood.value)}
                className={`flex flex-col items-center p-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-[#A8D5BA] focus:ring-offset-2 ${
                  currentMood === mood.value
                    ? "bg-gray-100 border-gray-400 shadow-sm"
                    : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }`}
                aria-label={`Select ${mood.label} mood`}
              >
                <span className="text-2xl mb-2">{mood.emoji}</span>
                <span className="text-xs text-gray-700 font-medium">{mood.label}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-3 mt-3">
            {moodOptions.slice(4).map((mood) => (
              <button
                key={mood.value}
                onClick={() => setCurrentMood(mood.value)}
                className={`flex flex-col items-center p-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-[#A8D5BA] focus:ring-offset-2 ${
                  currentMood === mood.value
                    ? "bg-gray-100 border-gray-400 shadow-sm"
                    : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }`}
                aria-label={`Select ${mood.label} mood`}
              >
                <span className="text-2xl mb-2">{mood.emoji}</span>
                <span className="text-xs text-gray-700 font-medium">{mood.label}</span>
              </button>
            ))}
          </div>

          {/* Suggested Habits */}
          {suggestedHabits.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 font-title">
                Feeling {selectedMood.label.toLowerCase()}? Try these:
              </h3>
              <div className="space-y-3">
                {suggestedHabits.map((habit, index) => (
                  <label
                    key={index}
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

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="mt-6 w-full bg-gradient-to-r from-[#A8D5BA] to-[#C5CAE9] text-gray-800 py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 focus:ring-2 focus:ring-[#A8D5BA] focus:ring-offset-2"
                aria-label="Submit daily check-in and nurture garden"
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
            </div>
          )}
        </div>
      </div>

      {/* Growth Animation Overlay */}
      {showGrowthAnimation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl animate-pulse">
            <div className="text-center">
              <div className="text-4xl mb-2">🌱✨</div>
              <h3 className="text-lg font-bold text-[#A8D5BA] mb-1 font-title">Your Garden is Growing!</h3>
              <p className="text-sm text-gray-600">+{lastGrowthAnimation} XP earned</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
