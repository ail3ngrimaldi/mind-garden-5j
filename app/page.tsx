"use client"

import { useState } from "react"
import { MindGardenProvider } from "@/contexts/MindGardenContext"
import { Navigation } from "@/components/Navigation"
import { HomePage } from "@/components/HomePage"
import { JournalPage } from "@/components/JournalPage"
import { RewardsPage } from "@/components/RewardsPage"
import { ProfilePage } from "@/components/ProfilePage"
import { WelcomePage } from "@/components/WelcomePage"

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
    return <WelcomePage />
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
    <div className="min-h-screen bg-sky-100">
      {renderPage()}
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  )
}

// Import at the top of the file
import { useMindGarden } from "@/contexts/MindGardenContext"
