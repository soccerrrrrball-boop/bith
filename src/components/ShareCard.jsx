import { useState, useEffect } from 'react'
import { useAppStore } from '../store'

export default function ShareCard() {
  const [snapshot, setSnapshot] = useState(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const setShowShareCard = useAppStore((state) => state.setShowShareCard)

  const captureSnapshot = async () => {
    setIsCapturing(true)
    try {
      // Capture the canvas from the Three.js renderer
      const canvas = document.querySelector('canvas')
      if (canvas) {
        const dataURL = canvas.toDataURL('image/png')
        setSnapshot(dataURL)
      }
    } catch (error) {
      console.error('Failed to capture snapshot:', error)
    } finally {
      setIsCapturing(false)
    }
  }

  const downloadImage = () => {
    if (snapshot) {
      const link = document.createElement('a')
      link.download = 'birthday-cake.png'
      link.href = snapshot
      link.click()
    }
  }

  const shareImage = async () => {
    if (snapshot && navigator.share) {
      try {
        const blob = await fetch(snapshot).then(r => r.blob())
        const file = new File([blob], 'birthday-cake.png', { type: 'image/png' })
        await navigator.share({
          title: 'Happy Birthday!',
          text: 'Check out my birthday cake!',
          files: [file]
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    }
  }

  useEffect(() => {
    captureSnapshot()
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/50 backdrop-blur-sm z-20">
      <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md mx-4">
        <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Share Your Celebration! 🎉
        </h3>
        
        {isCapturing ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Capturing moment...</p>
          </div>
        ) : snapshot ? (
          <div className="space-y-4">
            <img 
              src={snapshot} 
              alt="Birthday cake snapshot" 
              className="w-full rounded-lg border-2 border-pink-200"
            />
            <div className="flex gap-2">
              <button
                onClick={downloadImage}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-pink-500"
                aria-label="Download image"
              >
                Download
              </button>
              {navigator.share && (
                <button
                  onClick={shareImage}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Share image"
                >
                  Share
                </button>
              )}
            </div>
          </div>
        ) : null}

        <button
          onClick={() => setShowShareCard(false)}
          className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-label="Close share card"
        >
          Close
        </button>
      </div>
    </div>
  )
}

