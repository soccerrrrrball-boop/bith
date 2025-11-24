import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useAppStore } from '../store'
import { gsap } from 'gsap'
import * as THREE from 'three'
import { Howl } from 'howler'

// Audio setup
const candleBlowSound = new Howl({
  src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURAJR6Hh8sFwJgUwgM/z2Yk3CBxou+3nn00QDFCn4/C2YxwGOJHX8sx5LAUkd8fw3ZBACBRdtOnrqFUUCkaf4PK+bCEFMYfR89OCMwYebsDv45lREAlHoeHywXAmBTCAz/PZiTcIHGi77eefTRAMUKfj8LZjHAY4kdfyzHksBSR3x/DdkEAIFG206euoVRQKRp/g8r5sIQUxh9Hz04IzBh5uwO/jmVEQCUeh4fLBcCYFMIDP89mJNwgcaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAgUXbTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURAJR6Hh8sFwJgUwgM/z2Yk3CBxou+3nn00QDFCn4/C2YxwGOJHX8sx5LAUkd8fw3ZBACBRdtOnrqFUUCkaf4PK+bCEFMYfR89OCMwYebsDv45lREAlHoeHywXAmBTCAz/PZiTcIHGi77eefTRAMUKfj8LZjHAY4kdfyzHksBSR3x/DdkEA='],
  volume: 0.3
})

function Candle({ position, index }) {
  const candleRef = useRef()
  const flameRef = useRef()
  const [isLit, setIsLit] = useState(true)
  const [lastClickTime, setLastClickTime] = useState(0)
  const candleLit = useAppStore((state) => state.candleLit[index])
  const toggleCandle = useAppStore((state) => state.toggleCandle)

  // Flame flicker animation
  useFrame((state) => {
    if (flameRef.current && candleLit) {
      const time = state.clock.elapsedTime
      flameRef.current.scale.x = 1 + Math.sin(time * 10 + index) * 0.1
      flameRef.current.scale.y = 1 + Math.sin(time * 8 + index) * 0.15
      flameRef.current.position.y = 0.4 + Math.sin(time * 12 + index) * 0.02
    }
  })

  const handleClick = () => {
    const now = Date.now()
    const timeSinceLastClick = now - lastClickTime

    if (timeSinceLastClick < 300) {
      // Double click - make a wish effect
      gsap.to(candleRef.current.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 0.2,
        yoyo: true,
        repeat: 1
      })
      // Trigger sparkle burst (handled in Particles component)
    } else {
      // Single click - toggle candle
      toggleCandle(index)
      candleBlowSound.play()
    }

    setLastClickTime(now)
  }

  // Candle geometry
  const candleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 16)
  const candleMaterial = new THREE.MeshStandardMaterial({
    color: '#ff6b6b',
    roughness: 0.7
  })

  const wickGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.05, 8)
  const wickMaterial = new THREE.MeshStandardMaterial({
    color: '#2c2c2c'
  })

  const flameGeometry = new THREE.ConeGeometry(0.03, 0.1, 8)
  const flameMaterial = new THREE.MeshBasicMaterial({
    color: '#ffaa00',
    transparent: true,
    opacity: candleLit ? 0.9 : 0
  })

  return (
    <group 
      ref={candleRef} 
      position={position}
      onClick={handleClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'default'}
    >
      {/* Candle body */}
      <mesh 
        geometry={candleGeometry} 
        material={candleMaterial} 
        castShadow
        receiveShadow
      />
      
      {/* Wick */}
      <mesh 
        geometry={wickGeometry} 
        material={wickMaterial} 
        position={[0, 0.175, 0]}
      />

      {/* Flame */}
      <mesh 
        ref={flameRef}
        geometry={flameGeometry} 
        material={flameMaterial} 
        position={[0, 0.25, 0]}
      >
        <meshBasicMaterial attach="material" {...flameMaterial} />
      </mesh>
    </group>
  )
}

export default function Candles() {
  const candlePositions = [
    [-0.4, 0.5, -0.4],
    [0.4, 0.5, -0.4],
    [-0.4, 0.5, 0.4],
    [0.4, 0.5, 0.4]
  ]

  return (
    <group>
      {candlePositions.map((pos, index) => (
        <Candle key={index} position={pos} index={index} />
      ))}
    </group>
  )
}

