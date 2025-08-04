"use client"

import { useEffect } from "react"

export function useSmoothScroll() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement
      
      if (anchor) {
        e.preventDefault()
        const targetId = anchor.getAttribute('href')?.slice(1)
        if (targetId) {
          const targetElement = document.getElementById(targetId)
          if (targetElement) {
            const headerHeight = 80 // Adjust based on your header height
            const targetPosition = targetElement.offsetTop - headerHeight
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    
    return () => {
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useSmoothScroll()
  return <>{children}</>
} 