"use client"

interface CustomCheckboxProps {
  checked: boolean
  onChange: () => void
  label: string
  className?: string
}

export function CustomCheckbox({ checked, onChange, label, className = "" }: CustomCheckboxProps) {
  return (
    <label className={`flex items-center space-x-3 cursor-pointer ${className}`}>
      <div
        className={`w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer transition-all duration-200 ${
          checked ? "bg-[#A8D5BA] border-[#A8D5BA]" : "hover:border-[#A8D5BA]"
        }`}
        onClick={(e) => {
          e.preventDefault()
          onChange()
        }}
      >
        {checked && <span className="text-white text-xs font-bold">✓</span>}
      </div>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" aria-label={label} />
      <span className={`flex-1 text-sm ${checked ? "line-through text-gray-500" : "text-gray-700"}`}>{label}</span>
    </label>
  )
}
