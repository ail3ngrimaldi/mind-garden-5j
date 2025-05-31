"use client"

import { useMindGarden } from "@/contexts/MindGardenContext"
import { RewardCard } from "./RewardCard"
import { Card } from "./ui/Card"

export function RewardsPage() {
  const { rewards } = useMindGarden()

  const unlockedRewards = rewards.filter((reward) => reward.unlocked)
  const lockedRewards = rewards.filter((reward) => !reward.unlocked)

  return (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#3F2D2D] mb-2">Your Rewards</h2>
        <p className="text-gray-600">Celebrate your wellness journey</p>
      </div>

      {/* Unlocked Rewards */}
      {unlockedRewards.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-[#5C9E7C] mb-4">🎉 Unlocked Rewards</h3>
          <div className="space-y-4">
            {unlockedRewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </div>
        </div>
      )}

      {/* Locked Rewards */}
      {lockedRewards.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-500 mb-4">🔒 Coming Soon</h3>
          <div className="space-y-4">
            {lockedRewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </div>
        </div>
      )}

      {/* Motivation Message */}
      <Card className="bg-gradient-to-r from-[#5C9E7C]/10 to-[#E9A1B0]/10 text-center">
        <h4 className="font-semibold text-[#3F2D2D] mb-2">Keep Growing! 🌱</h4>
        <p className="text-gray-600 text-sm">
          Every check-in, every moment of self-care, and every step in your wellness journey helps unlock new rewards
          and grows your beautiful garden.
        </p>
      </Card>
    </div>
  )
}
