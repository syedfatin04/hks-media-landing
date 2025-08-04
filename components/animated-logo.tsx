"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export function AnimatedLogo({ className = "" }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`flex items-center gap-3 cursor-pointer ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center overflow-hidden"
        animate={{
          rotate: isHovered ? 360 : 0,
          background: isHovered
            ? "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)"
            : "linear-gradient(135deg, #2563eb 0%, #4338ca 100%)",
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.div
          className="text-white font-bold text-xl"
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotateY: isHovered ? 180 : 0,
          }}
          transition={{ duration: 0.6 }}
        >
          H
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: isHovered ? "100%" : "-100%",
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div className="flex flex-col">
        <motion.span
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: isHovered ? "200% center" : "0% center",
          }}
          transition={{ duration: 1 }}
        >
          HKS Media
        </motion.span>
        <motion.span className="text-sm text-slate-500 -mt-1" animate={{ opacity: isHovered ? 1 : 0.7 }}>
          Influence Experts
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
