"use client"

import { Sprout, Gift, BookOpen, User } from "lucide-react"

interface NavigationProps {
  currentPage: "home" | "journal" | "rewards" | "profile"
  onPageChange: (page: "home" | "journal" | "rewards" | "profile") => void
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const navItems = [
    { id: "home" as const, icon: Sprout, label: "Garden" },
    { id: "rewards" as const, icon: Gift, label: "Rewards" },
    { id: "journal" as const, icon: BookOpen, label: "Journal" },
    { id: "profile" as const, icon: User, label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around py-2">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onPageChange(id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              currentPage === id ? "text-[#5C9E7C]" : "text-gray-500"
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
