import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function WelcomeMessage({ onClose }) {
  const messageRef = useRef()

  useEffect(() => {
    if (messageRef.current) {
      gsap.from(messageRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      })
    }
  }, [])

  return (
    <div 
      ref={messageRef}
      className="absolute top-20 left-1/2 transform -translate-x-1/2 pointer-events-auto"
      role="alert"
      aria-live="polite"
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl max-w-md mx-4 border-2 border-pink-200">
        <h1 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          🎂 HAPPY BIRTHDAY JOSHITHA SRI! 🎂
        </h1>
        <p className="text-center text-gray-700 mb-4">
          Drag the knife to cut the cake and celebrate!
        </p>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• Click candles to light/blow them</p>
          <p>• Double-click for a wish effect</p>
          <p>• Use keyboard controls if needed</p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-pink-500"
          aria-label="Close welcome message"
        >
          Let's Start!
        </button>
      </div>
    </div>
  )
}

