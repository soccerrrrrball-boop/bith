import { useState, useEffect } from 'react'
import { useAppStore } from '../store'
import ProgressBar from './ProgressBar'
import WelcomeMessage from './WelcomeMessage'
import ShareCard from './ShareCard'
import MusicPlayer from './MusicPlayer'
import ImageSlideshow from './ImageSlideshow'
import { gsap } from 'gsap'

export default function UI() {
  const cutProgress = useAppStore((state) => state.cutProgress)
  const cakeCut = useAppStore((state) => state.cakeCut)
  const showMessage = useAppStore((state) => state.showMessage)
  const showShareCard = useAppStore((state) => state.showShareCard)
  const setShowShareCard = useAppStore((state) => state.setShowShareCard)
  const setShowMessage = useAppStore((state) => state.setShowMessage)
  const [showWelcome, setShowWelcome] = useState(true)
  const [showSlideshow, setShowSlideshow] = useState(false)

  useEffect(() => {
    // Hide welcome message after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (cakeCut) {
      // Show message after cut
      setTimeout(() => {
        setShowMessage(true)
      }, 1000)

      // Show slideshow after message
      setTimeout(() => {
        setShowSlideshow(true)
      }, 4000)
    }
  }, [cakeCut])

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Top-right progress */}
      <div className="absolute top-4 right-4 pointer-events-auto">
        <ProgressBar progress={cutProgress} />
      </div>

      {/* Welcome message */}
      {showWelcome && (
        <WelcomeMessage onClose={() => setShowWelcome(false)} />
      )}

      {/* Birthday message after cut */}
      {showMessage && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-md mx-4 animate-fade-in">
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              🎉 HAPPY BIRTHDAY JOSHITHA SRI! 🎉
            </h2>
            <p className="text-center text-gray-700 text-lg">
              You've successfully cut the cake! Make a wish and enjoy your special day!
            </p>
            <button
              onClick={() => setShowMessage(false)}
              className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Close message"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Share card */}
      {showShareCard && (
        <ShareCard />
      )}

      {/* Image slideshow */}
      {showSlideshow && (
        <ImageSlideshow onClose={() => setShowSlideshow(false)} />
      )}

      {/* Music player */}
      <div className="absolute bottom-4 left-4 pointer-events-auto">
        <MusicPlayer />
      </div>

      {/* Keyboard controls hint */}
      <div className="absolute bottom-4 right-4 pointer-events-auto">
        <div className="bg-black/50 text-white text-xs p-2 rounded backdrop-blur-sm">
          <p>Press <kbd className="px-1 bg-white/20 rounded">Enter</kbd> to cut</p>
          <p>Press <kbd className="px-1 bg-white/20 rounded">Space</kbd> for music</p>
        </div>
      </div>
    </div>
  )
}

