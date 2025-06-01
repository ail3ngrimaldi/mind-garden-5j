"use client"

import type React from "react"

import { useState } from "react"
import { useMindGarden } from "@/contexts/MindGardenContext"
import { BookOpen } from "lucide-react"

export function JournalPage() {
  const { journalEntries, addJournalEntry } = useMindGarden()
  const [currentTitle, setCurrentTitle] = useState("")
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0])
  const [currentContent, setCurrentContent] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (currentContent.trim()) {
      setIsSaving(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      addJournalEntry(currentContent, currentTitle.trim() || "Untitled Entry", currentDate)
      setCurrentTitle("")
      setCurrentContent("")
      setCurrentDate(new Date().toISOString().split("T")[0])
      setIsSaving(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && e.target === e.currentTarget) {
      e.preventDefault()
      handleSave()
    }
  }

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
    })
  }

  const formatInputDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-6 p-4 pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 font-title underline decoration-2 underline-offset-4">
          Your journal
        </h2>
      </div>

      {/* New Entry Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 font-title">New entry</h3>

        {/* Title Input */}
        <input
          type="text"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent text-gray-600"
          placeholder="Set an Title"
        />

        {/* Date Input */}
        <div className="relative">
          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent text-gray-600 appearance-none"
          />
          <div className="absolute inset-0 flex items-center px-4 pointer-events-none text-gray-600">
            {formatInputDate(currentDate)}
          </div>
        </div>

        {/* Content Textarea */}
        <textarea
          value={currentContent}
          onChange={(e) => setCurrentContent(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your Thoughts"
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent resize-none text-gray-700 min-h-[200px]"
          rows={8}
          aria-label="Journal entry content"
        />

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={!currentContent.trim() || isSaving}
          className="w-full bg-gradient-to-r from-[#A8D5BA] to-[#9DA4EC] text-gray-800 py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Save journal entry"
        >
          {isSaving ? "Saving..." : "Save entry"}
        </button>
      </div>

      {/* Previous Entries */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 font-title">Previous entries</h3>
        {journalEntries.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No journal entries yet. Start writing to capture your thoughts!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {journalEntries.map((entry, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                tabIndex={0}
                role="article"
                aria-label={`Journal entry from ${formatDisplayDate(entry.date)}`}
              >
                <div className="flex items-start space-x-3">
                  <BookOpen className="text-[#A8D5BA] mt-1 flex-shrink-0" size={20} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">{formatDisplayDate(entry.date)}</span>
                    </div>
                    {entry.title && <h4 className="font-semibold text-gray-800 mb-2">{entry.title}</h4>}
                    <p className="text-gray-700 leading-relaxed">{entry.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
