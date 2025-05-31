"use client"

import { useState } from "react"
import { MindGardenProvider } from "@/contexts/MindGardenContext"
import { Navigation } from "@/components/Navigation"
import { HomePage } from "@/components/HomePage"
import { JournalPage } from "@/components/JournalPage"
import { RewardsPage } from "@/components/RewardsPage"
import { ProfilePage } from "@/components/ProfilePage"
import { OnboardingPage } from "@/components/OnboardingPage"

export default function MindGardenApp() {
  const [currentPage, setCurrentPage] = useState<"home" | "journal" | "rewards" | "profile">("home")

  return (
    <MindGardenProvider>
      <AppContent currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </MindGardenProvider>
  )
}

function AppContent({
  currentPage,
  setCurrentPage,
}: {
  currentPage: string
  setCurrentPage: (page: "home" | "journal" | "rewards" | "profile") => void
}) {
  const { onboardingCompleted } = useMindGarden()

  if (!onboardingCompleted) {
    return <OnboardingPage />
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />
      case "journal":
        return <JournalPage />
      case "rewards":
        return <RewardsPage />
      case "profile":
        return <ProfilePage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A8D5BA]/20 via-[#C5CAE9]/20 to-[#A8D5BA]/10">
      <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm min-h-screen shadow-xl">
        <header className="bg-gradient-to-r from-[#A8D5BA] to-[#C5CAE9] p-6 text-white">
          <h1 className="text-2xl font-bold text-center text-gray-800">MindGarden+</h1>
          <p className="text-center text-sm opacity-90 mt-1 text-gray-700">Nurture your wellbeing, grow your garden</p>
        </header>

        <main className="pb-20">{renderPage()}</main>

        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </div>
  )
}

// Import at the top of the file
import { useMindGarden } from "@/contexts/MindGardenContext"
