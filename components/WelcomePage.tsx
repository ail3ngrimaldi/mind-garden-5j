"use client"

import type React from "react"

import { useState } from "react"
import { useMindGarden } from "@/contexts/MindGardenContext"
import { Cloud, ChevronRight, X, Plus } from "lucide-react"

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

export function WelcomePage() {
  const { setUserProfile, setCurrentMood, completeOnboarding } = useMindGarden()
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [selectedMood, setSelectedMood] = useState("happy")
  const [goals, setGoals] = useState<string[]>(["Improve my mental wellbeing", "Develop healthy habits"])
  const [newGoal, setNewGoal] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, newGoal.trim()])
      setNewGoal("")
    }
  }

  const handleRemoveGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index))
  }

  const handleContinueFromName = () => {
    if (name.trim()) {
      setStep(2)
    }
  }

  const handleContinueFromMood = () => {
    setStep(3)
  }

  const handleComplete = () => {
    setUserProfile({
      name,
      goals,
    })
    setCurrentMood(selectedMood)
    completeOnboarding()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (step === 1) {
        handleContinueFromName()
      } else if (step === 3 && newGoal.trim()) {
        handleAddGoal()
      }
    }
  }

  const selectedMoodData = moodOptions.find((mood) => mood.value === selectedMood) || moodOptions[5]

  return (
    <div className="min-h-screen bg-sky-200 flex flex-col relative overflow-hidden">
      {/* Clouds */}
      <div className="absolute top-8 left-8">
        <Cloud className="text-white w-16 h-16" />
      </div>
      <div className="absolute top-12 right-12">
        <Cloud className="text-white w-12 h-12" />
      </div>

      {/* Curved bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-white rounded-t-full"></div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-20 z-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-[#3F2D2D] text-center mb-2 font-title">Welcome to MindGarden+</h1>
          <p className="text-center text-gray-700 mb-10">Let's get to know you a little better</p>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  What's your name?
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <button
                onClick={handleContinueFromName}
                disabled={!name.trim()}
                className="w-full bg-gradient-to-r from-[#A8D5BA] to-[#C5CAE9] text-gray-800 py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <span>Continue</span>
                <ChevronRight size={16} />
              </button>

              <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">How are you feeling right now?</label>

                {/* Mood Roulette */}
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                  <div className="flex items-center justify-center mb-6">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg"
                      style={{ backgroundColor: selectedMoodData.color }}
                    >
                      {selectedMoodData.emoji}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-2xl font-bold text-gray-800 font-title">{selectedMoodData.label}</h3>
                      <p className="text-gray-600">Current Mood</p>
                    </div>
                  </div>

                  {/* Mood Grid */}
                  <div className="grid grid-cols-4 gap-3">
                    {moodOptions.map((mood) => (
                      <button
                        key={mood.value}
                        onClick={() => setSelectedMood(mood.value)}
                        className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                          selectedMood === mood.value
                            ? "border-gray-400 bg-gray-50 shadow-md"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-2xl mb-1">{mood.emoji}</span>
                        <span className="text-xs text-gray-700 font-medium text-center">{mood.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleContinueFromMood}
                className="w-full bg-gradient-to-r from-[#A8D5BA] to-[#C5CAE9] text-gray-800 py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Continue</span>
                <ChevronRight size={16} />
              </button>

              <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">What are your wellness goals?</label>
                <div className="space-y-2">
                  {goals.map((goal, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                    >
                      <span className="text-gray-800">{goal}</span>
                      <button
                        onClick={() => handleRemoveGoal(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label={`Remove goal: ${goal}`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}

                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newGoal}
                      onChange={(e) => setNewGoal(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent"
                      placeholder="Add a new goal"
                    />
                    <button
                      onClick={handleAddGoal}
                      disabled={!newGoal.trim()}
                      className="p-3 bg-[#A8D5BA] text-white rounded-lg hover:bg-[#8BC1A3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Add new goal"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <div
                  role="checkbox"
                  aria-checked={termsAccepted}
                  tabIndex={0}
                  onClick={() => setTermsAccepted(!termsAccepted)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setTermsAccepted(!termsAccepted)
                    }
                  }}
                  className={`w-5 h-5 rounded-full border-2 border-gray-300 focus:ring-2 focus:ring-[#A8D5BA] focus:ring-offset-2 cursor-pointer ${
                    termsAccepted ? "bg-[#A8D5BA] border-[#A8D5BA]" : ""
                  }`}
                  aria-label="Accept terms and conditions"
                >
                  {termsAccepted && (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <label
                  className="ml-2 text-sm text-gray-700 cursor-pointer"
                  onClick={() => setTermsAccepted(!termsAccepted)}
                >
                  I agree to the Terms & Conditions
                </label>
              </div>

              <button
                onClick={handleComplete}
                disabled={!termsAccepted}
                className="w-full bg-gradient-to-r from-[#A8D5BA] to-[#C5CAE9] text-gray-800 py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Start My Garden Journey</span>
              </button>

              <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
