"use client"

import { Home, BookOpen, Gift, User } from "lucide-react"

interface NavigationProps {
  currentPage: "home" | "journal" | "rewards" | "profile"
  onPageChange: (page: "home" | "journal" | "rewards" | "profile") => void
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const navItems = [
    { id: "home" as const, icon: Home, label: "Home" },
    { id: "journal" as const, icon: BookOpen, label: "Journal" },
    { id: "rewards" as const, icon: Gift, label: "Rewards" },
    { id: "profile" as const, icon: User, label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-sm border-t border-gray-200">
      <div className="flex justify-around py-3">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onPageChange(id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              currentPage === id ? "text-[#A8D5BA] bg-[#A8D5BA]/10" : "text-gray-500 hover:text-[#A8D5BA]"
            }`}
          >
            <Icon size={22} />
            <span className="text-xs mt-1 font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
