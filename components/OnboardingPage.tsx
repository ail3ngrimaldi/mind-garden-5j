"use client"

import { useState } from "react"
import { useMindGarden } from "@/contexts/MindGardenContext"
import { Card } from "./ui/Card"
import { Sprout, ChevronRight, X, Plus } from "lucide-react"

export function OnboardingPage() {
  const { setUserProfile, completeOnboarding } = useMindGarden()
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [goals, setGoals] = useState<string[]>(["Improve my mental wellbeing", "Develop healthy habits"])
  const [newGoal, setNewGoal] = useState("")

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, newGoal.trim()])
      setNewGoal("")
    }
  }

  const handleRemoveGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index))
  }

  const handleComplete = () => {
    setUserProfile({
      name,
      goals,
    })
    completeOnboarding()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#A8D5BA]/20 via-[#C5CAE9]/20 to-[#A8D5BA]/10">
      <Card className="max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-[#A8D5BA]/20 p-3 rounded-full">
            <Sprout className="text-[#A8D5BA]" size={32} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome to MindGarden+</h1>

        {step === 1 && (
          <div className="space-y-6">
            <p className="text-center text-gray-600">Let's get to know you a little better.</p>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                What's your name?
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!name.trim()}
              className="w-full bg-gradient-to-r from-[#A8D5BA] to-[#C5CAE9] text-gray-800 py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>Continue</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <p className="text-center text-gray-600">What are your wellness goals?</p>

            <div className="space-y-3">
              {goals.map((goal, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-800">{goal}</span>
                  <button
                    onClick={() => handleRemoveGoal(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
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
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent"
                  placeholder="Add a new goal"
                  onKeyPress={(e) => e.key === "Enter" && handleAddGoal()}
                />
                <button
                  onClick={handleAddGoal}
                  disabled={!newGoal.trim()}
                  className="p-3 bg-[#A8D5BA] text-white rounded-lg hover:bg-[#8BC1A3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button
              onClick={handleComplete}
              className="w-full bg-gradient-to-r from-[#A8D5BA] to-[#C5CAE9] text-gray-800 py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              <span>Start My Garden Journey</span>
            </button>
          </div>
        )}
      </Card>
    </div>
  )
}
