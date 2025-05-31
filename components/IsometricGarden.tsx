"use client"

interface IsometricGardenProps {
  gardenLevel: number
}

export function IsometricGarden({ gardenLevel }: IsometricGardenProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Your Garden</h3>

      <div className="relative w-full h-80 bg-gradient-to-b from-sky-100 to-green-100 rounded-lg overflow-hidden">
        {/* Isometric Garden SVG */}
        <svg viewBox="0 0 400 320" className="w-full h-full">
          {/* Grass Base */}
          <polygon points="0,280 400,280 400,180 0,180" fill="#7CB342" />
          <polygon points="0,180 400,180 400,80 0,80" fill="#8BC34A" />

          {/* House */}
          <g>
            {/* House Base - Isometric */}
            <polygon points="280,160 360,160 380,140 300,140" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
            <polygon points="360,160 380,140 380,100 360,120" fill="#EEEEEE" stroke="#E0E0E0" strokeWidth="1" />
            <polygon points="280,160 300,140 300,100 280,120" fill="#FAFAFA" stroke="#E0E0E0" strokeWidth="1" />

            {/* Roof - Isometric */}
            <polygon points="270,140 390,140 370,120 290,120" fill="#37474F" />
            <polygon points="390,140 370,120 370,80 390,100" fill="#263238" />
            <polygon points="270,140 290,120 290,80 270,100" fill="#455A64" />

            {/* Windows */}
            <rect x="290" y="130" width="12" height="12" fill="#64B5F6" rx="1" />
            <rect x="310" y="130" width="12" height="12" fill="#64B5F6" rx="1" />
            <rect x="330" y="130" width="12" height="12" fill="#64B5F6" rx="1" />

            {/* Window frames */}
            <line x1="296" y1="130" x2="296" y2="142" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="290" y1="136" x2="302" y2="136" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="316" y1="130" x2="316" y2="142" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="310" y1="136" x2="322" y2="136" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="336" y1="130" x2="336" y2="142" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="330" y1="136" x2="342" y2="136" stroke="#FFFFFF" strokeWidth="1" />

            {/* Door */}
            <rect x="350" y="140" width="8" height="20" fill="#8D6E63" rx="1" />
            <circle cx="356" cy="150" r="1" fill="#FFD54F" />

            {/* Flower box */}
            <rect x="285" y="142" width="20" height="4" fill="#8D6E63" />
            {gardenLevel >= 1 && (
              <>
                <circle cx="290" cy="140" r="2" fill="#E91E63" />
                <circle cx="295" cy="140" r="2" fill="#FF5722" />
                <circle cx="300" cy="140" r="2" fill="#FFC107" />
              </>
            )}
          </g>

          {/* Trees - Rounded puffy style */}
          <g>
            {/* Tree 1 */}
            <ellipse cx="100" cy="120" rx="25" ry="20" fill="#4CAF50" />
            <ellipse cx="95" cy="115" rx="20" ry="15" fill="#66BB6A" />
            <ellipse cx="105" cy="118" rx="18" ry="12" fill="#81C784" />
            <rect x="97" y="135" width="6" height="15" fill="#8D6E63" />

            {/* Tree 2 */}
            {gardenLevel >= 3 && (
              <>
                <ellipse cx="350" cy="100" rx="20" ry="16" fill="#4CAF50" />
                <ellipse cx="345" cy="96" rx="16" ry="12" fill="#66BB6A" />
                <ellipse cx="355" cy="98" rx="14" ry="10" fill="#81C784" />
                <rect x="347" y="112" width="5" height="12" fill="#8D6E63" />
              </>
            )}

            {/* Tree 3 */}
            {gardenLevel >= 5 && (
              <>
                <ellipse cx="50" cy="140" rx="22" ry="18" fill="#4CAF50" />
                <ellipse cx="46" cy="136" rx="18" ry="14" fill="#66BB6A" />
                <ellipse cx="54" cy="138" rx="16" ry="11" fill="#81C784" />
                <rect x="47" y="152" width="5" height="13" fill="#8D6E63" />
              </>
            )}
          </g>

          {/* Garden Plots - Isometric */}
          <g>
            {/* Main Garden Plot */}
            <polygon points="120,220 280,220 300,200 140,200" fill="#8D6E63" stroke="#6D4C41" strokeWidth="1" />
            <polygon points="280,220 300,200 300,180 280,200" fill="#795548" stroke="#6D4C41" strokeWidth="1" />
            <polygon points="120,220 140,200 140,180 120,200" fill="#A1887F" stroke="#6D4C41" strokeWidth="1" />

            {/* Garden Rows */}
            {gardenLevel >= 1 && (
              <g>
                {/* Row 1 - Lettuce/Cabbage */}
                <circle cx="150" cy="210" r="4" fill="#4CAF50" />
                <circle cx="160" cy="210" r="4" fill="#66BB6A" />
                <circle cx="170" cy="210" r="4" fill="#4CAF50" />
                <circle cx="180" cy="210" r="4" fill="#66BB6A" />

                {/* Lettuce details */}
                <circle cx="150" cy="210" r="3" fill="#81C784" />
                <circle cx="160" cy="210" r="3" fill="#A5D6A7" />
                <circle cx="170" cy="210" r="3" fill="#81C784" />
                <circle cx="180" cy="210" r="3" fill="#A5D6A7" />
              </g>
            )}

            {gardenLevel >= 2 && (
              <g>
                {/* Row 2 - Colorful vegetables */}
                <circle cx="150" cy="200" r="4" fill="#9C27B0" />
                <circle cx="160" cy="200" r="4" fill="#673AB7" />
                <circle cx="170" cy="200" r="4" fill="#9C27B0" />
                <circle cx="180" cy="200" r="4" fill="#673AB7" />

                {/* Purple cabbage details */}
                <circle cx="150" cy="200" r="3" fill="#BA68C8" />
                <circle cx="160" cy="200" r="3" fill="#9575CD" />
                <circle cx="170" cy="200" r="3" fill="#BA68C8" />
                <circle cx="180" cy="200" r="3" fill="#9575CD" />
              </g>
            )}

            {gardenLevel >= 3 && (
              <g>
                {/* Row 3 - Small sprouts */}
                <line x1="145" y1="190" x2="145" y2="185" stroke="#4CAF50" strokeWidth="2" />
                <line x1="155" y1="190" x2="155" y2="185" stroke="#4CAF50" strokeWidth="2" />
                <line x1="165" y1="190" x2="165" y2="185" stroke="#4CAF50" strokeWidth="2" />
                <line x1="175" y1="190" x2="175" y2="185" stroke="#4CAF50" strokeWidth="2" />
                <line x1="185" y1="190" x2="185" y2="185" stroke="#4CAF50" strokeWidth="2" />

                {/* Sprout leaves */}
                <ellipse cx="145" cy="185" rx="2" ry="1" fill="#81C784" />
                <ellipse cx="155" cy="185" rx="2" ry="1" fill="#81C784" />
                <ellipse cx="165" cy="185" rx="2" ry="1" fill="#81C784" />
                <ellipse cx="175" cy="185" rx="2" ry="1" fill="#81C784" />
                <ellipse cx="185" cy="185" rx="2" ry="1" fill="#81C784" />
              </g>
            )}

            {/* Potted Plants */}
            {gardenLevel >= 4 && (
              <g>
                {/* Pot 1 */}
                <ellipse cx="100" cy="215" rx="6" ry="4" fill="#8D6E63" />
                <rect x="94" y="211" width="12" height="8" fill="#A1887F" />
                <circle cx="100" cy="208" r="3" fill="#E91E63" />
                <line x1="100" y1="211" x2="100" y2="205" stroke="#4CAF50" strokeWidth="2" />

                {/* Pot 2 */}
                <ellipse cx="115" cy="215" rx="6" ry="4" fill="#8D6E63" />
                <rect x="109" y="211" width="12" height="8" fill="#A1887F" />
                <circle cx="115" cy="208" r="3" fill="#FF5722" />
                <line x1="115" y1="211" x2="115" y2="205" stroke="#4CAF50" strokeWidth="2" />
              </g>
            )}

            {gardenLevel >= 5 && (
              <g>
                {/* Additional flowers */}
                <circle cx="250" cy="210" r="3" fill="#FFC107" />
                <circle cx="260" cy="210" r="3" fill="#FF9800" />
                <circle cx="270" cy="210" r="3" fill="#FFC107" />

                {/* Flower centers */}
                <circle cx="250" cy="210" r="1" fill="#FF8F00" />
                <circle cx="260" cy="210" r="1" fill="#F57C00" />
                <circle cx="270" cy="210" r="1" fill="#FF8F00" />

                {/* Stems */}
                <line x1="250" y1="213" x2="250" y2="220" stroke="#4CAF50" strokeWidth="2" />
                <line x1="260" y1="213" x2="260" y2="220" stroke="#4CAF50" strokeWidth="2" />
                <line x1="270" y1="213" x2="270" y2="220" stroke="#4CAF50" strokeWidth="2" />
              </g>
            )}
          </g>

          {/* White Fence */}
          <g>
            {/* Horizontal fence lines */}
            <line x1="80" y1="180" x2="320" y2="180" stroke="#FFFFFF" strokeWidth="3" />
            <line x1="80" y1="185" x2="320" y2="185" stroke="#FFFFFF" strokeWidth="2" />

            {/* Fence posts */}
            <rect x="85" y="175" width="3" height="15" fill="#FFFFFF" />
            <rect x="110" y="175" width="3" height="15" fill="#FFFFFF" />
            <rect x="135" y="175" width="3" height="15" fill="#FFFFFF" />
            <rect x="160" y="175" width="3" height="15" fill="#FFFFFF" />
            <rect x="185" y="175" width="3" height="15" fill="#FFFFFF" />
            <rect x="210" y="175" width="3" height="15" fill="#FFFFFF" />
            <rect x="235" y="175" width="3" height="15" fill="#FFFFFF" />
            <rect x="260" y="175" width="3" height="15" fill="#FFFFFF" />
            <rect x="285" y="175" width="3" height="15" fill="#FFFFFF" />
            <rect x="310" y="175" width="3" height="15" fill="#FFFFFF" />
          </g>

          {/* Decorative bushes */}
          {gardenLevel >= 2 && (
            <g>
              <ellipse cx="320" cy="190" rx="8" ry="6" fill="#4CAF50" />
              <ellipse cx="318" cy="188" rx="6" ry="4" fill="#66BB6A" />
            </g>
          )}

          {gardenLevel >= 4 && (
            <g>
              <ellipse cx="90" cy="190" rx="7" ry="5" fill="#4CAF50" />
              <ellipse cx="88" cy="188" rx="5" ry="3" fill="#66BB6A" />
            </g>
          )}

          {/* Path */}
          <polygon points="80,240 140,240 160,220 100,220" fill="#D7CCC8" stroke="#BCAAA4" strokeWidth="1" />
        </svg>

        {/* Garden Level Indicator */}
        <div className="absolute top-4 right-4 bg-white/95 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 shadow-sm">
          Level {gardenLevel}
        </div>

        {/* Growth Animation Overlay */}
        {gardenLevel > 1 && (
          <div className="absolute bottom-4 left-4 bg-[#A8D5BA]/90 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 shadow-sm">
            🌱 Garden is flourishing!
          </div>
        )}
      </div>
    </div>
  )
}
