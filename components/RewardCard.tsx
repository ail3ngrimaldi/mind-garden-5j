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

// Custom Unlocked Reward Icon
function UnlockedRewardIcon() {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="50" height="50" rx="25" fill="#DDEEE4" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.737 14.7456C23.1864 12.2329 26.8129 12.2329 28.2624 14.7456C28.6004 15.3317 29.2901 15.6174 29.9436 15.442C32.7453 14.6901 35.3096 17.2545 34.5577 20.0562C34.3824 20.7096 34.668 21.3993 35.2541 21.7374C37.7668 23.1868 37.7668 26.8133 35.2541 28.2627C34.668 28.6008 34.3824 29.2905 34.5577 29.9439C35.3096 32.7456 32.7453 35.31 29.9436 34.5581C29.2901 34.3827 28.6004 34.6684 28.2624 35.2545C26.8129 37.7672 23.1864 37.7672 21.737 35.2545C21.3989 34.6684 20.7092 34.3827 20.0558 34.5581C17.2541 35.31 14.6898 32.7456 15.4417 29.9439C15.617 29.2905 15.3313 28.6008 14.7453 28.2627C12.2325 26.8133 12.2325 23.1868 14.7453 21.7374C15.3313 21.3993 15.617 20.7096 15.4417 20.0562C14.6898 17.2545 17.2541 14.6901 20.0558 15.442C20.7092 15.6174 21.3989 15.3317 21.737 14.7456ZM25.1376 28.5469L30.9169 22.7676L29.3099 21.1605L23.5306 26.9398C23.3717 27.0988 23.1692 27.207 22.9487 27.2508C22.7283 27.2947 22.4998 27.2722 22.2922 27.1862C22.0845 27.1002 21.9071 26.9545 21.7822 26.7676C21.6573 26.5808 21.5907 26.3611 21.5907 26.1363V25.5681H19.318V26.1363C19.318 26.8106 19.5179 27.4697 19.8925 28.0303C20.2671 28.5909 20.7995 29.0279 21.4224 29.2859C22.0454 29.5439 22.7308 29.6114 23.3921 29.4799C24.0534 29.3483 24.6609 29.0237 25.1376 28.5469Z"
        fill="#4B9B6B"
      />
    </svg>
  )
}

// Custom Locked Reward Icon
function LockedRewardIcon() {
  return (
    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
      <img src="/images/locked-reward-icon.png" alt="Locked reward" className="w-10 h-10" />
    </div>
  )
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
        <div className="flex-shrink-0">{unlocked ? <UnlockedRewardIcon /> : <LockedRewardIcon />}</div>

        <div className="flex-1">
          <h4 className={`font-semibold mb-1 font-title ${unlocked ? "text-gray-800" : "text-gray-500"}`}>{title}</h4>
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
