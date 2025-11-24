import { useState, useEffect, useRef } from 'react'
import { useAppStore } from '../store'
import { Howl } from 'howler'

export default function MusicPlayer() {
  // Placeholder for birthday music (in production, use actual audio file)
  // Replace with: src: ['/audio/birthday-music.mp3']
  const birthdayMusic = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const musicPlaying = useAppStore((state) => state.musicPlaying)
  const setMusicPlaying = useAppStore((state) => state.setMusicPlaying)

  useEffect(() => {
    birthdayMusic.current = new Howl({
      src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURAJR6Hh8sFwJgUwgM/z2Yk3CBxou+3nn00QDFCn4/C2YxwGOJHX8sx5LAUkd8fw3ZBACBRdtOnrqFUUCkaf4PK+bCEFMYfR89OCMwYebsDv45lREAlHoeHywXAmBTCAz/PZiTcIHGi77eefTRAMUKfj8LZjHAY4kdfyzHksBSR3x/DdkEAIFG206euoVRQKRp/g8r5sIQUxh9Hz04IzBh5uwO/jmVEQCUeh4fLBcCYFMIDP89mJNwgcaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAgUXbTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURAJR6Hh8sFwJgUwgM/z2Yk3CBxou+3nn00QDFCn4/C2YxwGOJHX8sx5LAUkd8fw3ZBACBRdtOnrqFUUCkaf4PK+bCEFMYfR89OCMwYebsDv45lREAlHoeHywXAmBTCAz/PZiTcIHGi77eefTRAMUKfj8LZjHAY4kdfyzHksBSR3x/DdkEA='],
      loop: true,
      volume: 0.3
    })
    
    return () => {
      if (birthdayMusic.current) {
        birthdayMusic.current.unload()
      }
    }
  }, [])

  const toggleMusic = () => {
    if (!birthdayMusic.current) return
    
    if (isPlaying) {
      birthdayMusic.current.pause()
      setIsPlaying(false)
      setMusicPlaying(false)
    } else {
      birthdayMusic.current.play()
      setIsPlaying(true)
      setMusicPlaying(true)
    }
  }

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault()
        toggleMusic()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying])

  return (
    <button
      onClick={toggleMusic}
      className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      aria-pressed={isPlaying}
    >
      {isPlaying ? (
        <span className="text-2xl">⏸️</span>
      ) : (
        <span className="text-2xl">▶️</span>
      )}
    </button>
  )
}

