import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = "" }: CardProps) {
  return <div className={`bg-white rounded-lg shadow-lg p-4 border border-gray-100 ${className}`}>{children}</div>
}
