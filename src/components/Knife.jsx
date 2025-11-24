import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useAppStore } from '../store'
import { gsap } from 'gsap'
import * as THREE from 'three'

export default function Knife() {
  const knifeRef = useRef()
  const bladeRef = useRef()
  const handleRef = useRef()
  const piecesRef = useRef([])
  const { camera, raycaster, pointer } = useThree()
  const [targetPosition, setTargetPosition] = useState([0, 0.5, 0])
  const [rotation, setRotation] = useState(0)
  const [isBroken, setIsBroken] = useState(false)
  const isCutting = useAppStore((state) => state.isCutting)
  const setKnifePosition = useAppStore((state) => state.setKnifePosition)
  const setCutProgress = useAppStore((state) => state.setCutProgress)
  const setCakeCut = useAppStore((state) => state.setCakeCut)
  const cutProgress = useAppStore((state) => state.cutProgress)
  const cakeCut = useAppStore((state) => state.cakeCut)

  // Track mouse/touch movement
  useEffect(() => {
    const handleMove = (event) => {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX
      const clientY = event.touches ? event.touches[0].clientY : event.clientY
      
      const x = (clientX / window.innerWidth) * 2 - 1
      const y = -(clientY / window.innerHeight) * 2 + 1

      // Project to 3D space
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera)
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
      const intersection = new THREE.Vector3()
      raycaster.ray.intersectPlane(plane, intersection)

      // Clamp to cake area
      intersection.x = Math.max(-1.5, Math.min(1.5, intersection.x))
      intersection.y = Math.max(0.2, Math.min(1.5, intersection.y))
      intersection.z = Math.max(-0.5, Math.min(0.5, intersection.z))

      setTargetPosition([intersection.x, intersection.y, intersection.z])
      setKnifePosition([intersection.x, intersection.y, intersection.z])

      // Calculate rotation based on movement direction
      if (knifeRef.current) {
        const deltaX = intersection.x - knifeRef.current.position.x
        const deltaZ = intersection.z - knifeRef.current.position.z
        const angle = Math.atan2(deltaZ, deltaX)
        setRotation(angle)
      }

      // Check if cutting (knife is over cake)
      if (Math.abs(intersection.x) < 1.2 && intersection.y < 0.8 && intersection.y > 0) {
        if (!isCutting) {
          useAppStore.getState().setIsCutting(true)
        }
        
        // Update cut progress based on movement
        const newProgress = Math.min(100, cutProgress + 0.5)
        setCutProgress(newProgress)

        if (newProgress >= 100 && !useAppStore.getState().cakeCut) {
          setCakeCut(true)
          useAppStore.getState().setIsCutting(false)
          // Break the knife
          setTimeout(() => {
            setIsBroken(true)
          }, 500)
        }
      }
    }

    const handleStart = () => {
      useAppStore.getState().setIsCutting(true)
    }

    const handleEnd = () => {
      useAppStore.getState().setIsCutting(false)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('touchmove', handleMove, { passive: true })
    window.addEventListener('mousedown', handleStart)
    window.addEventListener('touchstart', handleStart, { passive: true })
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchend', handleEnd)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('mousedown', handleStart)
      window.removeEventListener('touchstart', handleStart)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [camera, raycaster, isCutting, cutProgress, setCutProgress, setCakeCut])

  // Break knife into pieces animation
  useEffect(() => {
    if (isBroken && bladeRef.current && handleRef.current) {
      // Animate blade breaking apart
      const bladePos = bladeRef.current.position
      gsap.to(bladeRef.current.position, {
        x: bladePos.x + (Math.random() - 0.5) * 2,
        y: bladePos.y - 2,
        z: bladePos.z + (Math.random() - 0.5) * 2,
        duration: 1.5,
        ease: "power2.out"
      })
      gsap.to(bladeRef.current.rotation, {
        x: bladeRef.current.rotation.x + Math.PI * 2,
        y: bladeRef.current.rotation.y + Math.PI,
        z: bladeRef.current.rotation.z + Math.PI,
        duration: 1.5,
        ease: "power2.out"
      })
      gsap.to(bladeRef.current.scale, {
        x: 0.3,
        y: 0.3,
        z: 0.3,
        duration: 1.5,
        ease: "power2.in"
      })

      // Break handle too
      const handlePos = handleRef.current.position
      gsap.to(handleRef.current.position, {
        x: handlePos.x + (Math.random() - 0.5) * 1.5,
        y: handlePos.y - 2.5,
        z: handlePos.z + (Math.random() - 0.5) * 1.5,
        duration: 1.5,
        ease: "power2.out"
      })
      gsap.to(handleRef.current.rotation, {
        x: handleRef.current.rotation.x + Math.PI,
        y: handleRef.current.rotation.y + Math.PI * 1.5,
        z: handleRef.current.rotation.z + Math.PI,
        duration: 1.5,
        ease: "power2.out"
      })
      gsap.to(handleRef.current.scale, {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        duration: 1.5,
        ease: "power2.in"
      })
    }
  }, [isBroken])

  // Smooth knife movement
  useFrame(() => {
    if (knifeRef.current && !isBroken) {
      gsap.to(knifeRef.current.position, {
        x: targetPosition[0],
        y: targetPosition[1],
        z: targetPosition[2],
        duration: 0.2,
        ease: "power2.out"
      })

      gsap.to(knifeRef.current.rotation, {
        z: rotation,
        duration: 0.2,
        ease: "power2.out"
      })
    }
  })

  // Bigger knife geometry
  const bladeGeometry = new THREE.BoxGeometry(0.2, 0.6, 0.04)
  const handleGeometry = new THREE.BoxGeometry(0.16, 0.3, 0.16)

  const bladeMaterial = new THREE.MeshStandardMaterial({
    color: '#c0c0c0',
    metalness: 0.9,
    roughness: 0.1
  })

  const handleMaterial = new THREE.MeshStandardMaterial({
    color: '#8b4513',
    roughness: 0.8
  })

  if (isBroken) {
    // Show broken pieces
    return (
      <group ref={knifeRef} position={[0, 0.5, 0]}>
        {/* Broken pieces will be animated via useEffect */}
      </group>
    )
  }

  return (
    <group ref={knifeRef} position={[0, 0.5, 0]}>
      <mesh ref={bladeRef} geometry={bladeGeometry} material={bladeMaterial} position={[0, 0.3, 0]} castShadow>
        <meshStandardMaterial attach="material" {...bladeMaterial} />
      </mesh>
      <mesh ref={handleRef} geometry={handleGeometry} material={handleMaterial} position={[0, -0.15, 0]} castShadow>
        <meshStandardMaterial attach="material" {...handleMaterial} />
      </mesh>
    </group>
  )
}

