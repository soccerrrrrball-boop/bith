import { gsap } from 'gsap'
import * as THREE from 'three'

/**
 * Create a GSAP timeline for the cake cutting sequence
 */
export function createCutTimeline(cakeRef, camera, onComplete) {
  const tl = gsap.timeline({
    onComplete
  })

  // Camera dolly in
  tl.to(camera.position, {
    z: 4,
    duration: 1,
    ease: "power2.inOut"
  }, 0)

  // Cake split animation
  if (cakeRef.current) {
    tl.to(cakeRef.current.rotation, {
      y: 0.1,
      duration: 0.5,
      ease: "power2.out"
    }, 0.5)
  }

  // Camera shake for impact
  tl.to(camera.position, {
    x: 0.1,
    y: 0.1,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: "power2.inOut"
  }, 1)

  return tl
}

/**
 * Sparkle burst animation for wish effect
 */
export function createSparkleBurst(position, scene) {
  const sparkles = []
  const count = 20

  for (let i = 0; i < count; i++) {
    const geometry = new THREE.SphereGeometry(0.02, 8, 8)
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
      transparent: true,
      opacity: 1
    })
    const sparkle = new THREE.Mesh(geometry, material)
    
    sparkle.position.set(
      position[0] + (Math.random() - 0.5) * 0.5,
      position[1] + (Math.random() - 0.5) * 0.5,
      position[2] + (Math.random() - 0.5) * 0.5
    )

    scene.add(sparkle)
    sparkles.push(sparkle)

    // Animate sparkle
    gsap.to(sparkle.position, {
      x: sparkle.position.x + (Math.random() - 0.5) * 2,
      y: sparkle.position.y + Math.random() * 2,
      z: sparkle.position.z + (Math.random() - 0.5) * 2,
      duration: 1,
      ease: "power2.out"
    })

    gsap.to(sparkle.material, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        scene.remove(sparkle)
        sparkle.geometry.dispose()
        sparkle.material.dispose()
      }
    })
  }

  return sparkles
}

