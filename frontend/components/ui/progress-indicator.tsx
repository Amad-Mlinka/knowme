"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function ProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollPx / winHeightPx
      setScrollProgress(scrolled)
    }

    window.addEventListener("scroll", updateScrollProgress)
    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="relative">
        {/* Background track */}
        <div className="w-1 h-32 bg-muted rounded-full" />

        {/* Progress fill */}
        <motion.div
          className="absolute top-0 left-0 w-1 bg-gradient-to-b from-primary via-purple-500 to-pink-500 rounded-full"
          style={{ height: `${scrollProgress * 100}%` }}
          initial={{ height: 0 }}
          animate={{ height: `${scrollProgress * 100}%` }}
          transition={{ duration: 0.1 }}
        />

        {/* Glowing dot */}
        <motion.div
          className="absolute -left-1 w-3 h-3 bg-primary rounded-full shadow-lg"
          style={{ top: `${scrollProgress * 100}%` }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0.7)",
              "0 0 0 10px rgba(59, 130, 246, 0)",
              "0 0 0 0 rgba(59, 130, 246, 0.7)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>
    </div>
  )
}
