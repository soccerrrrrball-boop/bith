import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export default function Loader({ progress }) {
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    gsap.to({}, {
      duration: 0.3,
      onUpdate: () => {
        setDisplayProgress(progress)
      }
    })
  }, [progress])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-300 via-purple-300 to-yellow-200 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated cake icon */}
        <div className="mb-8 text-6xl animate-bounce">
          🎂
        </div>
        
        {/* Progress bar */}
        <div className="w-64 h-4 bg-white/30 rounded-full overflow-hidden shadow-lg">
          <div 
            className="h-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
        
        {/* Progress text */}
        <p className="mt-4 text-white text-lg font-semibold">
          {Math.round(displayProgress)}%
        </p>
        
        <p className="mt-2 text-white/80 text-sm">
          Preparing your birthday cake...
        </p>
      </div>
    </div>
  )
}

