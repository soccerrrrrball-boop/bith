import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function ProgressBar({ progress }) {
  const barRef = useRef()

  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }, [progress])

  return (
    <div 
      className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg min-w-[200px]"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Cut progress"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700">Cut Progress</span>
        <span className="text-sm font-bold text-pink-600">{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 rounded-full transition-all"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  )
}

