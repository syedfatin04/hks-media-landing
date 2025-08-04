"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  animationType?: "fade" | "slide" | "scale" | "rotate" | "bounce"
  duration?: number
}

export function ScrollAnimation({ 
  children, 
  className = "", 
  delay = 0, 
  direction = "up",
  animationType = "slide",
  duration = 0.8
}: ScrollAnimationProps) {
  const ref = useRef(null)
  const isMobile = useIsMobile()
  const isInView = useInView(ref, { 
    once: true, 
    margin: isMobile ? "-50px" : "-100px" 
  })

  const getVariants = () => {
    const baseVariants = {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
      },
    }

    switch (animationType) {
      case "fade":
        return baseVariants
      
      case "slide":
        return {
          hidden: {
            opacity: 0,
            y: direction === "up" ? 60 : direction === "down" ? -60 : 0,
            x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
            scale: 0.95,
          },
          visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
          },
        }
      
      case "scale":
        return {
          hidden: {
            opacity: 0,
            scale: 0.5,
            y: 30,
          },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
          },
        }
      
      case "rotate":
        return {
          hidden: {
            opacity: 0,
            rotate: -15,
            scale: 0.8,
          },
          visible: {
            opacity: 1,
            rotate: 0,
            scale: 1,
          },
        }
      
      case "bounce":
        return {
          hidden: {
            opacity: 0,
            y: 100,
            scale: 0.3,
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
          },
        }
      
      default:
        return baseVariants
    }
  }

  const variants = getVariants()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ 
        duration: isMobile ? duration * 0.8 : duration, 
        delay: isMobile ? delay * 0.5 : delay, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className={className}
      whileHover={!isMobile ? {
        scale: 1.02,
        transition: { duration: 0.2 }
      } : undefined}
    >
      {children}
    </motion.div>
  )
}
