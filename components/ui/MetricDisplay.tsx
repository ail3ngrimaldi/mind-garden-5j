import type { LucideIcon } from "lucide-react"

interface MetricDisplayProps {
  icon: LucideIcon
  value: string | number
  label: string
  color?: string
}

export function MetricDisplay({ icon: Icon, value, label, color = "#A8D5BA" }: MetricDisplayProps) {
  return (
    <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100">
      <Icon className={`mx-auto mb-2`} style={{ color }} size={24} />
      <div className="text-xl font-bold text-gray-800">{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  )
}
