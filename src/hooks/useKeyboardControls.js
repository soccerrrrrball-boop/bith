import { useEffect } from 'react'
import { useAppStore } from '../store'
import { gsap } from 'gsap'

export function useKeyboardControls() {
  const setCutProgress = useAppStore((state) => state.setCutProgress)
  const cutProgress = useAppStore((state) => state.cutProgress)
  const setCakeCut = useAppStore((state) => state.setCakeCut)
  const cakeCut = useAppStore((state) => state.cakeCut)
  const setKnifePosition = useAppStore((state) => state.setKnifePosition)
  const knifePosition = useAppStore((state) => state.knifePosition)
  const toggleCandle = useAppStore((state) => state.toggleCandle)

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Prevent default if not in input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return
      }

      switch (e.code) {
        case 'Enter':
          // Trigger cut animation
          if (!cakeCut) {
            const newProgress = Math.min(100, cutProgress + 20)
            setCutProgress(newProgress)
            if (newProgress >= 100) {
              setCakeCut(true)
            }
          }
          break

        case 'ArrowLeft':
          e.preventDefault()
          setKnifePosition([Math.max(-1.5, knifePosition[0] - 0.1), knifePosition[1], knifePosition[2]])
          break

        case 'ArrowRight':
          e.preventDefault()
          setKnifePosition([Math.min(1.5, knifePosition[0] + 0.1), knifePosition[1], knifePosition[2]])
          break

        case 'ArrowUp':
          e.preventDefault()
          setKnifePosition([knifePosition[0], Math.min(1.5, knifePosition[1] + 0.1), knifePosition[2]])
          break

        case 'ArrowDown':
          e.preventDefault()
          setKnifePosition([knifePosition[0], Math.max(0.2, knifePosition[1] - 0.1), knifePosition[2]])
          break

        case 'Digit1':
        case 'Digit2':
        case 'Digit3':
        case 'Digit4':
          const index = parseInt(e.code.slice(-1)) - 1
          toggleCandle(index)
          break

        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [cutProgress, cakeCut, knifePosition, setCutProgress, setCakeCut, setKnifePosition, toggleCandle])
}

