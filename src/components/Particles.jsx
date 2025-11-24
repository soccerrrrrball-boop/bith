import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useAppStore } from '../store'
import * as THREE from 'three'

export default function Particles() {
  const particlesRef = useRef()
  const confettiRef = useRef()
  const cakeCut = useAppStore((state) => state.cakeCut)
  const cutProgress = useAppStore((state) => state.cutProgress)

  // Crumbs and frosting particles
  const crumbsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const count = 200
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Start positions around cake
      positions[i3] = (Math.random() - 0.5) * 2
      positions[i3 + 1] = Math.random() * 0.5
      positions[i3 + 2] = (Math.random() - 0.5) * 2

      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * 0.1
      velocities[i3 + 1] = Math.random() * 0.05
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.1

      // Pastel colors
      const color = new THREE.Color()
      const hue = Math.random() * 0.2 + 0.05 // Pink to yellow range
      color.setHSL(hue, 0.7, 0.8)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.velocities = velocities

    return geometry
  }, [])

  // Confetti particles
  const confettiGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const count = 100
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 0.5
      positions[i3 + 1] = 1.5
      positions[i3 + 2] = (Math.random() - 0.5) * 0.5

      velocities[i3] = (Math.random() - 0.5) * 0.2
      velocities[i3 + 1] = -Math.random() * 0.1
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.2

      const color = new THREE.Color()
      color.setHSL(Math.random(), 0.8, 0.6)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.velocities = velocities

    return geometry
  }, [])

  useFrame((state, delta) => {
    if (particlesRef.current && cakeCut) {
      const positions = particlesRef.current.geometry.attributes.position.array
      const velocities = particlesRef.current.geometry.velocities

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i] * delta * 10
        positions[i + 1] += velocities[i + 1] * delta * 10 - 0.01 * delta // Gravity
        positions[i + 2] += velocities[i + 2] * delta * 10

        // Reset if fallen too far
        if (positions[i + 1] < -2) {
          positions[i] = (Math.random() - 0.5) * 2
          positions[i + 1] = Math.random() * 0.5
          positions[i + 2] = (Math.random() - 0.5) * 2
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }

    if (confettiRef.current && cakeCut) {
      const positions = confettiRef.current.geometry.attributes.position.array
      const velocities = confettiRef.current.geometry.velocities

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i] * delta * 10
        positions[i + 1] += velocities[i + 1] * delta * 10 - 0.02 * delta
        positions[i + 2] += velocities[i + 2] * delta * 10

        if (positions[i + 1] < -2) {
          positions[i] = (Math.random() - 0.5) * 0.5
          positions[i + 1] = 1.5
          positions[i + 2] = (Math.random() - 0.5) * 0.5
        }
      }

      confettiRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: cakeCut ? 0.8 : 0,
    blending: THREE.AdditiveBlending
  })

  return (
    <>
      {/* Crumbs and frosting particles */}
      <points 
        ref={particlesRef} 
        geometry={crumbsGeometry} 
        material={particleMaterial}
      />

      {/* Confetti */}
      <points 
        ref={confettiRef} 
        geometry={confettiGeometry} 
        material={particleMaterial}
      />
    </>
  )
}

