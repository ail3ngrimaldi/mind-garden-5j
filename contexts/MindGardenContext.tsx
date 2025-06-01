"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import healthDataSamples from "@/data/healthData.json"

// Interfaces
interface UserProfile {
  name: string
  goals: string[]
  email?: string
}

interface MoodEntry {
  date: string
  mood: string
  habitsCompleted: string[]
}

interface JournalEntry {
  date: string
  content: string
  title?: string
}

interface HealthData {
  steps: number
  heartRate: number
  distance: number
}

interface HealthStatus {
  isActive: boolean
  isCalm: boolean
  isAtHome: boolean
}

interface Reward {
  id: string
  title: string
  description: string
  unlocked: boolean
  type: "badge" | "coupon"
}

interface MindGardenContextType {
  // User profile
  userProfile: UserProfile
  setUserProfile: (profile: UserProfile) => void
  onboardingCompleted: boolean
  completeOnboarding: () => void

  // Mood tracking
  currentMood: string
  setCurrentMood: (mood: string) => void
  generatedHabits: string[]
  completedHabits: string[]
  toggleHabit: (habit: string) => void

  // Garden stats
  gardenLevel: number
  totalXP: number
  lastGrowthAnimation: number | null

  // History
  moodHistory: MoodEntry[]
  journalEntries: JournalEntry[]
  addJournalEntry: (content: string, title?: string, date?: string) => void

  // Health data
  healthData: HealthData
  getHealthStatus: () => HealthStatus

  // Rewards
  rewards: Reward[]

  // Actions
  submitDailyCheckIn: () => void
  aiSuggestions: string[]
  showSuggestions: boolean
}

const MindGardenContext = createContext<MindGardenContextType | undefined>(undefined)

const moodBasedHabits: { [key: string]: string[] } = {
  exhausted: [
    "Take a 10-minute power nap",
    "Do gentle stretching exercises",
    "Drink a large glass of water",
    "Practice deep breathing for 5 minutes",
  ],
  burnout: [
    "Set one boundary for today",
    "Practice saying 'no' to new commitments",
    "Take a 15-minute walk outside",
    "Write down 3 things you're grateful for",
  ],
  sad: [
    "Listen to uplifting music",
    "Call a friend or family member",
    "Write in your journal",
    "Do something creative for 10 minutes",
  ],
  thoughtful: [
    "Practice mindful meditation for 10 minutes",
    "Write down 3 insights from today",
    "Read something inspiring",
    "Take a contemplative walk",
  ],
  neutral: [
    "Try a 5-minute mindfulness exercise",
    "Do something kind for yourself",
    "Organize one small area of your space",
    "Learn something new for 10 minutes",
  ],
  happy: [
    "Share your joy with someone",
    "Do a random act of kindness",
    "Dance to your favorite song",
    "Celebrate this moment mindfully",
  ],
  energetic: [
    "Go for a brisk 20-minute walk",
    "Tackle a creative project",
    "Do some energizing exercises",
    "Channel energy into organizing",
  ],
  excited: [
    "Share your excitement with someone",
    "Start a new creative project",
    "Plan something fun for later",
    "Use this energy for something productive",
  ],
}

const defaultRewards: Reward[] = [
  { id: "1", title: "First Bloom", description: "Completed your first check-in", unlocked: true, type: "badge" },
  { id: "2", title: "Mindful Streak", description: "7 days of consistent check-ins", unlocked: false, type: "badge" },
  {
    id: "3",
    title: "Garden Guardian",
    description: "30 days of nurturing your garden",
    unlocked: false,
    type: "badge",
  },
  { id: "4", title: "Wellness Tea", description: "20% off premium herbal tea", unlocked: false, type: "coupon" },
]

export function MindGardenProvider({ children }: { children: ReactNode }) {
  // User profile state
  const [userProfile, setUserProfile] = useState<UserProfile>({ name: "", goals: [] })
  const [onboardingCompleted, setOnboardingCompleted] = useState(false)

  // Mood tracking state
  const [currentMood, setCurrentMood] = useState("neutral")
  const [completedHabits, setCompletedHabits] = useState<string[]>([])

  // Garden stats
  const [gardenLevel, setGardenLevel] = useState(1)
  const [totalXP, setTotalXP] = useState(0)
  const [lastGrowthAnimation, setLastGrowthAnimation] = useState<number | null>(null)

  // History
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([
    { date: "2025-05-05", mood: "happy", habitsCompleted: ["Share your joy with someone"] },
    { date: "2025-05-04", mood: "thoughtful", habitsCompleted: ["Practice mindful meditation for 10 minutes"] },
    {
      date: "2025-05-03",
      mood: "excited",
      habitsCompleted: ["Share your excitement with someone", "Start a new creative project"],
    },
  ])
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      date: "2025-05-26",
      content:
        "Today was an incredible day! I finally got the promotion I've been working towards for months. All the late nights and extra effort have paid off. I'm feeling so grateful and excited about this new chapter in my career.",
      title: "Just got a promotion at work",
    },
    {
      date: "2025-05-02",
      content:
        "Today I realized how important it is to take time for reflection. Sometimes we get so caught up in the hustle that we forget to pause and appreciate how far we've come.",
      title: "Reflection on growth",
    },
  ])

  // Health data
  const [healthData, setHealthData] = useState<HealthData>(healthDataSamples[0])
  const [healthDataIndex, setHealthDataIndex] = useState(0)

  // Rewards and suggestions
  const [rewards, setRewards] = useState<Reward[]>(defaultRewards)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Rotate health data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHealthDataIndex((prevIndex) => (prevIndex + 1) % healthDataSamples.length)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Update health data when index changes
  useEffect(() => {
    setHealthData(healthDataSamples[healthDataIndex])
  }, [healthDataIndex])

  const generatedHabits = moodBasedHabits[currentMood] || moodBasedHabits["neutral"]

  const toggleHabit = (habit: string) => {
    setCompletedHabits((prev) => (prev.includes(habit) ? prev.filter((h) => h !== habit) : [...prev, habit]))
  }

  const addJournalEntry = (content: string, title?: string, date?: string) => {
    const newEntry: JournalEntry = {
      date: date || new Date().toISOString().split("T")[0],
      content,
      title,
    }
    setJournalEntries((prev) => [newEntry, ...prev])
  }

  const getHealthStatus = (): HealthStatus => {
    return {
      isActive: healthData.steps > 7000,
      isCalm: healthData.heartRate < 80,
      isAtHome: healthData.distance < 2,
    }
  }

  const completeOnboarding = () => {
    setOnboardingCompleted(true)
  }

  const generateAISuggestions = (mood: string, healthStatus: HealthStatus) => {
    const recentMoods = moodHistory.slice(0, 7).map((entry) => entry.mood)
    const moodPattern = getMoodPattern(recentMoods)
    const timeOfDay = new Date().getHours()

    let suggestions: string[] = []

    // Advanced AI suggestions based on patterns
    if (moodPattern === "declining" && mood === "sad") {
      suggestions = [
        "I notice you've been feeling down lately. Consider reaching out to a friend or counselor",
        "Your mood has been declining - try a 20-minute nature walk to boost endorphins",
        "Pattern suggests you might benefit from a consistent sleep schedule",
      ]
    } else if (moodPattern === "improving" && (mood === "happy" || mood === "excited")) {
      suggestions = [
        "Great momentum! Your mood is trending upward - keep doing what's working",
        "You're on a positive streak! Consider setting a new wellness goal",
        "Your progress is inspiring - maybe share your success with someone",
      ]
    } else if (!healthStatus.isActive && timeOfDay > 9 && timeOfDay < 17) {
      suggestions = [
        "Low activity during work hours - try a 5-minute desk stretch",
        "Consider taking walking meetings or calls today",
        "Set a reminder to move every hour",
      ]
    } else if (!healthStatus.isCalm && mood === "burnout") {
      suggestions = [
        "High stress + burnout detected. Priority: rest and boundaries",
        "Your heart rate suggests stress - try box breathing (4-4-4-4)",
        "Consider delegating tasks or saying no to new commitments today",
      ]
    } else if (healthStatus.isAtHome && mood === "energetic") {
      suggestions = [
        "High energy at home - perfect time for indoor workout or cleaning",
        "Channel this energy into a creative project or hobby",
        "Consider going outside for a walk or run",
      ]
    } else {
      // Fallback suggestions based on mood
      const moodSuggestions = {
        exhausted: ["Your body needs rest - prioritize sleep tonight", "Try a 10-minute power nap"],
        burnout: ["Set one firm boundary today", "Practice saying 'no' to protect your energy"],
        sad: ["Reach out to someone you trust", "Do something creative for 15 minutes"],
        thoughtful: ["Journal about your insights", "Take a mindful walk"],
        neutral: ["Try something new today", "Practice gratitude"],
        happy: ["Share your joy with others", "Celebrate this positive moment"],
        energetic: ["Use this energy for something meaningful", "Try a new physical activity"],
        excited: ["Channel excitement into action", "Start that project you've been thinking about"],
      }
      suggestions = moodSuggestions[mood] || ["Take a moment to check in with yourself"]
    }

    return suggestions
  }

  // Helper function to analyze mood patterns
  const getMoodPattern = (recentMoods: string[]): "improving" | "declining" | "stable" => {
    if (recentMoods.length < 3) return "stable"

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

    const values = recentMoods.map((mood) => moodValues[mood] || 3)
    const recent = values.slice(0, 3).reduce((a, b) => a + b, 0) / 3
    const older = values.slice(3, 6).reduce((a, b) => a + b, 0) / Math.max(values.slice(3, 6).length, 1)

    if (recent > older + 0.5) return "improving"
    if (recent < older - 0.5) return "declining"
    return "stable"
  }

  const submitDailyCheckIn = () => {
    const newEntry: MoodEntry = {
      date: new Date().toISOString().split("T")[0],
      mood: currentMood,
      habitsCompleted: [...completedHabits],
    }

    setMoodHistory((prev) => [newEntry, ...prev])

    // Generate AI suggestions based on mood and health
    const healthStatus = getHealthStatus()
    const suggestions = generateAISuggestions(currentMood, healthStatus)
    setAiSuggestions(suggestions)
    setShowSuggestions(true)

    // Award XP with animation
    const xpGained = completedHabits.length * 15 + 10 // Base 10 XP + 15 per habit
    setLastGrowthAnimation(xpGained)
    setTotalXP((prev) => prev + xpGained)

    // Level up garden
    const newTotalXP = totalXP + xpGained
    const newLevel = Math.floor(newTotalXP / 100) + 1
    setGardenLevel(newLevel)

    // Reset form
    setCompletedHabits([])
  }

  const handleMoodChange = (mood: string) => {
    setCurrentMood(mood)
    setCompletedHabits([]) // Reset habits when mood changes
  }

  return (
    <MindGardenContext.Provider
      value={{
        userProfile,
        setUserProfile,
        onboardingCompleted,
        completeOnboarding,
        currentMood,
        setCurrentMood: handleMoodChange,
        generatedHabits,
        completedHabits,
        toggleHabit,
        gardenLevel,
        totalXP,
        lastGrowthAnimation,
        moodHistory,
        journalEntries,
        addJournalEntry,
        healthData,
        getHealthStatus,
        rewards,
        submitDailyCheckIn,
        aiSuggestions,
        showSuggestions,
      }}
    >
      {children}
    </MindGardenContext.Provider>
  )
}

export function useMindGarden() {
  const context = useContext(MindGardenContext)
  if (context === undefined) {
    throw new Error("useMindGarden must be used within a MindGardenProvider")
  }
  return context
}
