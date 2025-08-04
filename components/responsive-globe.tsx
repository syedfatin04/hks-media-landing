"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Environment, Float } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { motion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"

function AnimatedGlobe() {
  const meshRef = useRef<any>()
  const isMobile = useIsMobile()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  // Lower geometry and effects for mobile
  const sphereArgs: [number, number, number] = isMobile ? [1, 32, 64] : [1, 100, 200]
  const distort = isMobile ? 0.2 : 0.4
  const speed = isMobile ? 0.8 : 1.8
  const metalness = isMobile ? 0.5 : 0.9
  const roughness = isMobile ? 0.3 : 0.1

  // Optionally, hide globe on very small screens
  if (typeof window !== 'undefined' && window.innerWidth < 400) {
    return null
  }

  return (
    <Float speed={isMobile ? 1 : 2} rotationIntensity={isMobile ? 0.5 : 1} floatIntensity={isMobile ? 1 : 2}>
      <Sphere 
        ref={meshRef} 
        args={sphereArgs} 
        scale={isMobile ? 1.1 : 1.8}
      >
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={distort}
          speed={speed}
          roughness={roughness}
          metalness={metalness}
        />
      </Sphere>
    </Float>
  )
}

interface ResponsiveGlobeProps {
  className?: string
}

export function ResponsiveGlobe({ className = "" }: ResponsiveGlobeProps) {
  const isMobile = useIsMobile()

  return (
    <div className={`relative h-[500px] sm:h-[550px] lg:h-[600px] xl:h-[700px] ${className}`}>
      <Canvas 
        camera={{ 
          position: [0, 0, isMobile ? 4.5 : 5],
          fov: isMobile ? 55 : 50
        }}
        style={{ 
          background: 'transparent',
          touchAction: 'none'
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedGlobe />
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={!isMobile}
          autoRotate={isMobile}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
              {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-blue-50/50 via-indigo-50/30 to-transparent pointer-events-none"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />

      {/* Floating Stats */}
      <motion.div
        className={`absolute bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-200 ${
          isMobile 
            ? 'top-4 right-4 p-3' 
            : 'top-10 right-10 p-4'
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className={`font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent ${isMobile ? 'text-lg' : 'text-2xl'}`}>340%</div>
        <div className={`text-slate-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>Avg ROI Increase</div>
      </motion.div>

      <motion.div
        className={`absolute bg-gradient-to-br from-emerald-50 to-teal-50 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-200 ${
          isMobile 
            ? 'bottom-4 left-4 p-3' 
            : 'bottom-20 left-10 p-4'
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4 }}
      >
        <div className={`font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent ${isMobile ? 'text-lg' : 'text-2xl'}`}>50+</div>
        <div className={`text-slate-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>Brands Served</div>
      </motion.div>
    </div>
  )
} 