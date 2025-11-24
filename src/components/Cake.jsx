import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useAppStore } from '../store'
import { gsap } from 'gsap'
import * as THREE from 'three'

// Simple procedural cake model (will be replaced with GLB in production)
function CakeModel({ cutProgress, isCut }) {
  const meshRef = useRef()
  const leftHalfRef = useRef()
  const rightHalfRef = useRef()
  const [split, setSplit] = useState(false)

  useEffect(() => {
    if (isCut && !split) {
      setSplit(true)
    }
  }, [isCut, split])

  // Animate split after refs are mounted
  useEffect(() => {
    if (split && leftHalfRef.current && rightHalfRef.current) {
      // Animate split
      gsap.to(leftHalfRef.current.position, {
        x: -0.5,
        duration: 1,
        ease: "power2.out"
      })
      gsap.to(rightHalfRef.current.position, {
        x: 0.5,
        duration: 1,
        ease: "power2.out"
      })
    }
  }, [split])

  // Create cake geometry procedurally
  const cakeGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.8, 32)
  const frostingGeometry = new THREE.CylinderGeometry(1.25, 1.25, 0.1, 32)
  
  // Create materials
  const cakeMaterial = new THREE.MeshStandardMaterial({
    color: '#ffb6c1',
    roughness: 0.7,
    metalness: 0.1
  })
  
  const frostingMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.3,
    metalness: 0.05,
    emissive: '#fff8e1',
    emissiveIntensity: 0.1
  })

  if (split) {
    return (
      <group>
        {/* Left half */}
        <group ref={leftHalfRef} position={[0, 0, 0]}>
          <mesh geometry={cakeGeometry} material={cakeMaterial}>
            <meshStandardMaterial attach="material" {...cakeMaterial} />
          </mesh>
          <mesh 
            geometry={frostingGeometry} 
            material={frostingMaterial} 
            position={[0, 0.35, 0]}
          />
        </group>
        {/* Right half */}
        <group ref={rightHalfRef} position={[0, 0, 0]}>
          <mesh geometry={cakeGeometry} material={cakeMaterial}>
            <meshStandardMaterial attach="material" {...cakeMaterial} />
          </mesh>
          <mesh 
            geometry={frostingGeometry} 
            material={frostingMaterial} 
            position={[0, 0.35, 0]}
          />
        </group>
      </group>
    )
  }

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Main cake body */}
      <mesh geometry={cakeGeometry} material={cakeMaterial} castShadow receiveShadow>
        <meshStandardMaterial attach="material" {...cakeMaterial} />
      </mesh>
      
      {/* Frosting layers */}
      <mesh 
        geometry={frostingGeometry} 
        material={frostingMaterial} 
        position={[0, 0.35, 0]}
        castShadow
      />
      <mesh 
        geometry={frostingGeometry} 
        material={frostingMaterial} 
        position={[0, -0.25, 0]}
        castShadow
      />

      {/* Cut line visualization */}
      {cutProgress > 0 && (
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[0.1, 0.8]} />
          <meshBasicMaterial 
            color="#8b4513" 
            transparent 
            opacity={cutProgress / 100}
          />
        </mesh>
      )}
    </group>
  )
}

export default function Cake() {
  const cutProgress = useAppStore((state) => state.cutProgress)
  const cakeCut = useAppStore((state) => state.cakeCut)
  const isCutting = useAppStore((state) => state.isCutting)

  return (
    <group position={[0, -0.5, 0]}>
      <CakeModel cutProgress={cutProgress} isCut={cakeCut} />
    </group>
  )
}

