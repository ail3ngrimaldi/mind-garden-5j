import { Award, Gift, Lock } from "lucide-react"

interface Reward {
  id: string
  title: string
  description: string
  unlocked: boolean
  type: "badge" | "coupon"
}

interface RewardCardProps {
  reward: Reward
}

export function RewardCard({ reward }: RewardCardProps) {
  const { title, description, unlocked, type } = reward

  return (
    <div
      className={`rounded-lg p-4 border transition-all duration-200 ${
        unlocked ? "bg-white shadow-md border-[#A8D5BA]/20 hover:shadow-lg" : "bg-gray-50 border-gray-200 opacity-60"
      }`}
    >
      <div className="flex items-start space-x-4">
        <div
          className={`p-3 rounded-full ${
            unlocked
              ? type === "badge"
                ? "bg-[#C5CAE9]/20 text-[#A8D5BA]"
                : "bg-[#A8D5BA]/20 text-[#C5CAE9]"
              : "bg-gray-200 text-gray-400"
          }`}
        >
          {unlocked ? type === "badge" ? <Award size={24} /> : <Gift size={24} /> : <Lock size={24} />}
        </div>

        <div className="flex-1">
          <h4 className={`font-semibold mb-1 ${unlocked ? "text-gray-800" : "text-gray-500"}`}>{title}</h4>
          <p className={`text-sm ${unlocked ? "text-gray-600" : "text-gray-400"}`}>{description}</p>

          {unlocked && type === "coupon" && (
            <button className="mt-3 bg-[#A8D5BA] text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#8BC1A3] transition-colors">
              Claim Offer
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
