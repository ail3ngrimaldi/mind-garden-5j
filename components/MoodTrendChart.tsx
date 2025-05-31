"use client"

import { useMindGarden } from "@/contexts/MindGardenContext"

export function MoodTrendChart() {
  const { moodHistory } = useMindGarden()

  // Get last 7 days of mood data
  const last7Days = moodHistory.slice(0, 7).reverse()
  const maxMood = 5

  const getMoodValue = (mood: string): number => {
    const moodMap = {
      exhausted: 1,
      burnout: 1.5,
      sad: 2,
      neutral: 3,
      happy: 4,
      energetic: 4.5,
      excited: 5,
    }
    return moodMap[mood] || 3
  }

  if (last7Days.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-[#3F2D2D] mb-4">Mood Trend</h3>
        <div className="text-center text-gray-500 py-8">
          <p>Start tracking your mood to see trends here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-[#3F2D2D] mb-4">Mood Trend (Last 7 Days)</h3>

      <div className="relative h-32">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>😢</span>
          <span>😕</span>
          <span>😐</span>
          <span>😊</span>
          <span>😄</span>
        </div>

        {/* Chart area */}
        <div className="ml-8 h-full relative">
          {/* Grid lines */}
          {[1, 2, 3, 4, 5].map((line) => (
            <div
              key={line}
              className="absolute w-full border-t border-gray-100"
              style={{ top: `${((maxMood - line) / (maxMood - 1)) * 100}%` }}
            />
          ))}

          {/* Mood line */}
          <svg className="absolute inset-0 w-full h-full">
            <polyline
              fill="none"
              stroke="#5C9E7C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={last7Days
                .map((entry, index) => {
                  const x = (index / (last7Days.length - 1)) * 100
                  const y = ((maxMood - getMoodValue(entry.mood)) / (maxMood - 1)) * 100
                  return `${x},${y}`
                })
                .join(" ")}
            />

            {/* Mood points */}
            {last7Days.map((entry, index) => {
              const x = (index / (last7Days.length - 1)) * 100
              const y = ((maxMood - getMoodValue(entry.mood)) / (maxMood - 1)) * 100
              return (
                <circle
                  key={index}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="4"
                  fill="#5C9E7C"
                  className="hover:r-6 transition-all cursor-pointer"
                />
              )
            })}
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="ml-8 mt-2 flex justify-between text-xs text-gray-500">
          {last7Days.map((entry, index) => (
            <span key={index}>{new Date(entry.date).toLocaleDateString("en-US", { weekday: "short" })}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
