import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import Scene from './components/Scene'
import Loader from './components/Loader'
import UI from './components/UI'
import Fallback2D from './components/Fallback2D'
import { useAppStore } from './store'

function App() {
  // Debug: Log that App is rendering
  useEffect(() => {
    console.log('App component mounted')
  }, [])
  const [webglSupported, setWebglSupported] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    if (!gl) {
      setWebglSupported(false)
      setIsLoading(false)
      return
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + 2
      })
    }, 50)
  }, [])

  if (isLoading) {
    return <Loader progress={loadingProgress} />
  }

  if (!webglSupported) {
    return <Fallback2D />
  }

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
          <Preload all />
        </Suspense>
      </Canvas>
      <UI />
    </div>
  )
}

export default App

