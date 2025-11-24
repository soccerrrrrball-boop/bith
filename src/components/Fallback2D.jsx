import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

export default function Fallback2D() {
  const canvasRef = useRef()
  const [cutProgress, setCutProgress] = useState(0)
  const [cakeCut, setCakeCut] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#ffb6c1')
      gradient.addColorStop(1, '#dda0dd')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Cake
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const cakeWidth = 200
      const cakeHeight = 150

      // Cake body
      ctx.fillStyle = '#ffb6c1'
      ctx.fillRect(
        centerX - cakeWidth / 2 - (cakeCut ? cutProgress * 2 : 0),
        centerY - cakeHeight / 2,
        cakeWidth / 2,
        cakeHeight
      )
      ctx.fillRect(
        centerX + (cakeCut ? cutProgress * 2 : 0),
        centerY - cakeHeight / 2,
        cakeWidth / 2,
        cakeHeight
      )

      // Frosting
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(centerX - cakeWidth / 2 - (cakeCut ? cutProgress * 2 : 0), centerY - cakeHeight / 2, cakeWidth / 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(centerX + cakeWidth / 2 + (cakeCut ? cutProgress * 2 : 0), centerY - cakeHeight / 2, cakeWidth / 4, 0, Math.PI * 2)
      ctx.fill()

      // Cut line
      if (cutProgress > 0 && !cakeCut) {
        ctx.strokeStyle = '#8b4513'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(centerX, centerY - cakeHeight / 2)
        ctx.lineTo(centerX, centerY + cakeHeight / 2)
        ctx.stroke()
      }

      // Confetti
      if (cakeCut) {
        for (let i = 0; i < 50; i++) {
          const x = centerX + (Math.random() - 0.5) * 400
          const y = centerY - 100 + Math.random() * 200
          ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 60%)`
          ctx.fillRect(x, y, 10, 10)
        }
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Check if over cake
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      if (Math.abs(x - centerX) < 100 && Math.abs(y - centerY) < 75) {
        setCutProgress(prev => {
          const newProgress = Math.min(100, prev + 1)
          if (newProgress >= 100 && !cakeCut) {
            setCakeCut(true)
          }
          return newProgress
        })
      }
    }

    const animation = setInterval(draw, 16)
    canvas.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearInterval(animation)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [cutProgress, cakeCut])

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-label="2D birthday cake fallback"
      />
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-2">🎂 Happy Birthday! 🎂</h1>
        <p className="text-center text-gray-700">Move your mouse over the cake to cut it!</p>
        <div className="mt-4 w-64 h-3 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full transition-all"
            style={{ width: `${cutProgress}%` }}
          />
        </div>
      </div>
      {cakeCut && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8 shadow-2xl max-w-md mx-4">
            <h2 className="text-4xl font-bold text-center mb-4">🎉 Happy Birthday! 🎉</h2>
            <p className="text-center text-gray-700">You've cut the cake! Make a wish!</p>
          </div>
        </div>
      )}
    </div>
  )
}

