"use client"

import type React from "react"

import { useState } from "react"
import { useMindGarden } from "@/contexts/MindGardenContext"
import { BookOpen, Save, Calendar } from "lucide-react"
import { Card } from "./ui/Card"

export function JournalPage() {
  const { journalEntries, addJournalEntry } = useMindGarden()
  const [currentEntry, setCurrentEntry] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (currentEntry.trim()) {
      setIsSaving(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      addJournalEntry(currentEntry)
      setCurrentEntry("")
      setIsSaving(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    }
  }

  return (
    <div className="space-y-6 p-4 pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 font-title">Your Journal</h2>
        <p className="text-gray-600">Capture your thoughts, ideas, and reflections</p>
      </div>

      {/* New Entry */}
      <Card>
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="text-[#A8D5BA]" size={24} />
          <h3 className="text-lg font-semibold text-gray-800 font-title">New Entry</h3>
        </div>

        <textarea
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What's on your mind today? Share your thoughts, feelings, ideas, or anything you'd like to remember... (Press Enter to save, Shift+Enter for new line)"
          className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#A8D5BA] focus:border-transparent resize-none text-sm"
          rows={6}
          aria-label="Journal entry text area"
        />

        <button
          onClick={handleSave}
          disabled={!currentEntry.trim() || isSaving}
          className="mt-4 bg-gradient-to-r from-[#A8D5BA] to-[#C5CAE9] text-gray-800 py-2 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 focus:ring-2 focus:ring-[#A8D5BA] focus:ring-offset-2"
          aria-label="Save journal entry"
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-800"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save size={16} />
              <span>Save Entry</span>
            </>
          )}
        </button>
      </Card>

      {/* Previous Entries */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 font-title">Previous Entries</h3>
        {journalEntries.length === 0 ? (
          <Card className="text-center text-gray-500">
            <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No journal entries yet. Start writing to capture your thoughts!</p>
          </Card>
        ) : (
          journalEntries.map((entry, index) => (
            <Card
              key={index}
              className="shadow-sm"
              tabIndex={0}
              role="article"
              aria-label={`Journal entry from ${new Date(entry.date).toLocaleDateString()}`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Calendar size={16} className="text-[#A8D5BA]" />
                <span className="text-sm text-gray-600">{new Date(entry.date).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{entry.content}</p>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
