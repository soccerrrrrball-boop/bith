import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Image paths - using the actual image filenames
const images = [
  '/images/Screenshot 2025-11-24 233733.png',
  '/images/Screenshot 2025-11-24 233754.png',
  '/images/Screenshot 2025-11-24 233806.png',
  '/images/Screenshot 2025-11-24 233843.png',
]

export default function ImageSlideshow({ onClose }) {
  const [isVisible, setIsVisible] = useState(true)
  const [imageErrors, setImageErrors] = useState(new Set())
  const containerRef = useRef()
  const rotationRef = useRef(0)
  const isDraggingRef = useRef(false)
  const lastMouseXRef = useRef(0)
  const autoRotateRef = useRef(true)

  const validImages = images.filter((_, idx) => !imageErrors.has(idx))
  const angleStep = validImages.length > 0 ? (2 * Math.PI) / validImages.length : 0

  // Update rotation based on mouse drag
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingRef.current || !containerRef.current) return

      const deltaX = e.clientX - lastMouseXRef.current
      const sensitivity = 0.015
      rotationRef.current += deltaX * sensitivity
      lastMouseXRef.current = e.clientX
      autoRotateRef.current = false

      updateImagePositions()
    }

    const handleMouseDown = (e) => {
      isDraggingRef.current = true
      lastMouseXRef.current = e.clientX
      autoRotateRef.current = false
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
      // Resume auto-rotate after 2 seconds
      setTimeout(() => {
        autoRotateRef.current = true
      }, 2000)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const updateImagePositions = () => {
    if (!containerRef.current) return

    const imageContainers = containerRef.current.querySelectorAll('.carousel-image-container')
    imageContainers.forEach((container, index) => {
      const angle = (index * angleStep) + rotationRef.current
      const radius = 500
      const x = Math.sin(angle) * radius
      const z = Math.cos(angle) * radius
      const scale = z > 0 ? 1 : 0.6
      const opacity = z > -300 ? 1 : Math.max(0.2, (z + 500) / 200)

      gsap.to(container, {
        x: x,
        z: z,
        scale: scale,
        opacity: opacity,
        duration: 0.3,
        ease: 'power2.out',
      })
    })
  }

  // Auto-rotate when not dragging
  useEffect(() => {
    if (validImages.length === 0) return

    const interval = setInterval(() => {
      if (autoRotateRef.current && !isDraggingRef.current) {
        rotationRef.current += 0.01
        updateImagePositions()
      }
    }, 50)

    return () => clearInterval(interval)
  }, [validImages.length, angleStep])

  // Initial positioning
  useEffect(() => {
    if (validImages.length > 0) {
      updateImagePositions()
    }
  }, [validImages.length])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Birthday Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50">
        <h1 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
          HAPPY BIRTHDAY JOSHITHA SRI
        </h1>
      </div>

      <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center p-4">
        {/* Close button */}
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(() => onClose(), 300)
          }}
          className="absolute top-4 right-4 z-40 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
          aria-label="Close slideshow"
        >
          <span className="text-2xl">✕</span>
        </button>

        {/* 3D Carousel Container */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            perspective: '1200px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          <div
            ref={containerRef}
            className="relative"
            style={{
              transformStyle: 'preserve-3d',
              cursor: isDraggingRef.current ? 'grabbing' : 'grab',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {validImages.length === 0 ? (
              <div className="text-center text-white p-8 max-w-md">
                <div className="text-6xl mb-4">📸</div>
                <h3 className="text-2xl font-bold mb-4">Add Your Photos!</h3>
                <p className="text-lg mb-4 opacity-90">
                  To see your birthday photos, add them to the <code className="bg-white/20 px-2 py-1 rounded">public/images/</code> folder
                </p>
              </div>
            ) : (
              validImages.map((imageSrc, index) => (
                <div
                  key={index}
                  className="carousel-image-container absolute"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img
                    src={imageSrc}
                    alt={`Slide ${index + 1}`}
                    className="w-64 h-80 md:w-80 md:h-96 object-cover rounded-xl shadow-2xl border-4 border-white/30"
                    style={{
                      backfaceVisibility: 'hidden',
                      transition: 'transform 0.3s',
                    }}
                    onError={(e) => {
                      setImageErrors(prev => new Set([...prev, index]))
                      console.warn(`Image not found: ${imageSrc}`)
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1.1,
                        duration: 0.3,
                      })
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        duration: 0.3,
                      })
                    }}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 bg-black/50 text-white px-6 py-3 rounded-full backdrop-blur-sm text-center">
          <p className="text-sm md:text-base">
            🖱️ Click and drag to rotate 360° • Auto-rotating when idle
          </p>
        </div>
      </div>
    </div>
  )
}
