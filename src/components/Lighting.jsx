import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Lighting() {
  const rimLightRef = useRef()

  // Subtle rim light animation
  useFrame((state) => {
    if (rimLightRef.current) {
      rimLightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
      rimLightRef.current.intensity = 0.8 + Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.4} color="#fff8e1" />
      
      {/* Main directional light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1}
        color="#fff8e1"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />

      {/* Warm rim light */}
      <pointLight
        ref={rimLightRef}
        position={[-3, 4, -3]}
        intensity={0.8}
        color="#ffb6c1"
        distance={10}
      />

      {/* Fill light */}
      <pointLight
        position={[0, 3, 3]}
        intensity={0.3}
        color="#fffacd"
        distance={8}
      />
    </>
  )
}

