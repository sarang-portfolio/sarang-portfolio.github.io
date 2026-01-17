import { Float, Stars } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

// Floating particles component
function CosmicParticles({ count = 500 }) {
  const mesh = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
      
      // Purple to cyan gradient colors
      const t = Math.random()
      colors[i * 3] = 0.4 + t * 0.2     // R
      colors[i * 3 + 1] = 0.2 + t * 0.4  // G
      colors[i * 3 + 2] = 0.8 + t * 0.2  // B
    }
    
    return { positions, colors }
  }, [count])
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })
  
  // Create buffer attributes with proper args
  const positionAttr = useMemo(() => {
    return new THREE.BufferAttribute(particles.positions, 3)
  }, [particles.positions])
  
  const colorAttr = useMemo(() => {
    return new THREE.BufferAttribute(particles.colors, 3)
  }, [particles.colors])
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={positionAttr} />
        <primitive attach="attributes-color" object={colorAttr} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// Glowing orb for skill representation
function GlowingOrb({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(scale * (1 + Math.sin(state.clock.elapsedTime * 2) * 0.1))
    }
  })
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  )
}

// Floating geometric shapes
function FloatingGeometry() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[-8, 4, -10]}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial
            color="#6366f1"
            emissive="#6366f1"
            emissiveIntensity={0.3}
            wireframe
          />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[10, -3, -15]}>
          <icosahedronGeometry args={[1.5]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.3}
            wireframe
          />
        </mesh>
      </Float>
      
      <Float speed={1} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[6, 6, -8]}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
          <meshStandardMaterial
            color="#06ffa5"
            emissive="#06ffa5"
            emissiveIntensity={0.4}
            wireframe
          />
        </mesh>
      </Float>
    </>
  )
}

// Main scene component
function Scene({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(() => {
    if (groupRef.current) {
      // Camera moves based on scroll
      groupRef.current.position.y = scrollProgress * 10
      groupRef.current.rotation.y = scrollProgress * Math.PI * 0.25
    }
  })
  
  return (
    <>
      <color attach="background" args={['#030014']} />
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      
      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      
      <group ref={groupRef}>
        {/* Cosmic particles */}
        <CosmicParticles count={800} />
        
        {/* Floating geometric shapes */}
        <FloatingGeometry />
        
        {/* Skill orbs */}
        <GlowingOrb position={[-4, 2, -5]} color="#06ffa5" scale={0.8} />
        <GlowingOrb position={[5, -2, -8]} color="#6366f1" scale={1} />
        <GlowingOrb position={[0, 4, -12]} color="#ec4899" scale={0.6} />
        <GlowingOrb position={[-6, -3, -10]} color="#00d4ff" scale={0.7} />
      </group>
    </>
  )
}

// Export the canvas wrapper
export default function CosmicCanvas({ scrollProgress = 0 }: { scrollProgress?: number }) {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}
