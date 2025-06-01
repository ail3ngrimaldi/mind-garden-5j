"use client"

import { useMindGarden } from "@/contexts/MindGardenContext"
import { RewardCard } from "./RewardCard"

export function RewardsPage() {
  const { rewards } = useMindGarden()

  const unlockedRewards = rewards.filter((reward) => reward.unlocked)
  const lockedRewards = rewards.filter((reward) => !reward.unlocked)

  return (
    <div className="space-y-6 p-4 pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#3F2D2D] mb-2 font-title">Your Rewards</h2>

        {/* New Keep Growing Section */}
        <div className="bg-gradient-to-br from-[#A8D5BA]/60 to-[#9DA4EC]/60 p-4 rounded-lg flex flex-col gap-1">
          <div className="text-center text-black text-lg font-medium leading-7">Keep growing</div>
          <div className="text-center text-[#323232] text-xs font-normal leading-5">
            Every check-in, every moment of self care and every step in your wellness journey helps unlock new rewards
            and grows your garden.
          </div>
        </div>
      </div>

      {/* Unlocked Rewards */}
      {unlockedRewards.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-[#5C9E7C] mb-4 font-title">🎉 Unlocked Rewards</h3>
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
          <h3 className="text-lg font-semibold text-gray-500 mb-4 font-title">🔒 Coming Soon</h3>
          <div className="space-y-4">
            {lockedRewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
