import type { ReactNode } from "react"

interface BadgeProps {
  children: ReactNode
  variant?: "success" | "warning" | "danger" | "neutral"
}

export function Badge({ children, variant = "neutral" }: BadgeProps) {
  const variantClasses = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    neutral: "bg-gray-100 text-gray-800",
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  )
}
