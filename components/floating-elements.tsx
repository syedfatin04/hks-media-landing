"use client"

import { motion } from "framer-motion"
import { Users, Target, Zap, Globe, TrendingUp, Star, Heart, Rocket, Award, Lightbulb } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export function FloatingElements() {
  const isMobile = useIsMobile()
  
  const icons = [
    { Icon: Users, delay: 0, x: "10%", y: "20%", size: "h-6 w-6", color: "text-blue-400" },
    { Icon: Target, delay: 0.5, x: "80%", y: "15%", size: "h-8 w-8", color: "text-emerald-400" },
    { Icon: Zap, delay: 1, x: "15%", y: "70%", size: "h-7 w-7", color: "text-purple-400" },
    { Icon: Globe, delay: 1.5, x: "85%", y: "75%", size: "h-6 w-6", color: "text-indigo-400" },
    { Icon: TrendingUp, delay: 2, x: "50%", y: "10%", size: "h-8 w-8", color: "text-orange-400" },
    { Icon: Star, delay: 2.5, x: "70%", y: "60%", size: "h-7 w-7", color: "text-pink-400" },
    { Icon: Heart, delay: 3, x: "20%", y: "40%", size: "h-6 w-6", color: "text-red-400" },
    { Icon: Rocket, delay: 3.5, x: "75%", y: "45%", size: "h-8 w-8", color: "text-cyan-400" },
    { Icon: Award, delay: 4, x: "40%", y: "80%", size: "h-7 w-7", color: "text-teal-400" },
    { Icon: Lightbulb, delay: 4.5, x: "90%", y: "30%", size: "h-6 w-6", color: "text-yellow-400" },
  ]

  // Reduce number of elements and animation complexity on mobile for better performance
  const displayIcons = isMobile ? icons.slice(0, 3) : icons

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {displayIcons.map(({ Icon, delay, x, y, size, color }, index) => (
        <motion.div
          key={index}
          className={`absolute ${color} ${size}`}
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{
            opacity: [0, 0.9, 0],
            scale: [0, 1.3, 0],
            rotate: [0, 180, 360],
            y: [20, -10, 20],
          }}
          transition={{
            duration: 6,
            delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.8,
            opacity: 1,
            transition: { duration: 0.3 }
          }}
        >
          <Icon className="w-full h-full" />
        </motion.div>
      ))}
      
      {/* Additional floating particles */}
      {!isMobile && (
        <>
                  {[...Array(8)].map((_, index) => (
          <motion.div
            key={`particle-${index}`}
            className={`absolute w-2 h-2 rounded-full ${
              index % 4 === 0 ? 'bg-blue-400/50' :
              index % 4 === 1 ? 'bg-purple-400/50' :
              index % 4 === 2 ? 'bg-emerald-400/50' :
              'bg-pink-400/50'
            }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 4,
                delay: Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}
