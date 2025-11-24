import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { useAppStore } from '../store'
import { useKeyboardControls } from '../hooks/useKeyboardControls'
import Cake from './Cake'
import Knife from './Knife'
import Candles from './Candles'
import Particles from './Particles'
import Lighting from './Lighting'

export default function Scene() {
  const { camera, gl } = useThree()
  const controlsRef = useRef()
  const isCutting = useAppStore((state) => state.isCutting)
  const cakeCut = useAppStore((state) => state.cakeCut)
  
  // Enable keyboard controls
  useKeyboardControls()

  // Lock camera controls during cutting
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = !isCutting && !cakeCut
    }
  }, [isCutting, cakeCut])

  // Smooth camera animation on cut completion
  useEffect(() => {
    if (cakeCut) {
      // Subtle camera dolly
      const timer = setTimeout(() => {
        // Camera will be animated via GSAP in Cake component
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [cakeCut])

  return (
    <>
      {/* Lighting */}
      <Lighting />

      {/* Environment and shadows */}
      <Environment preset="sunset" />
      <ContactShadows 
        position={[0, -0.5, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2} 
        far={4.5} 
      />

      {/* Main objects */}
      <Cake />
      <Knife />
      <Candles />
      <Particles />

      {/* Camera controls */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={4}
        maxDistance={8}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.2}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

