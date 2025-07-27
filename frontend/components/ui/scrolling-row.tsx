"use client"

import React, { ReactElement, ReactNode } from "react"
import { motion } from "framer-motion"

// Utility to merge class names
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}

interface ScrollingRowProps {
  children: ReactNode
  className?: string
  direction?: "left" | "right"
  speed?: number // seconds for one full loop
}

/**
 * ScrollingRow — continuously scrolls its children horizontally like a marquee.
 * Children are duplicated so the loop is seamless.
 */
export function ScrollingRow({ children, className, direction = "left", speed = 40 }: ScrollingRowProps) {
  const childArray = React.Children.toArray(children) as ReactElement[]

  return (
    <div className={cn("relative overflow-hidden w-full", className)}>
      <motion.div
        className="flex gap-8 w-max"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
      >
        {childArray.map((child, idx) => React.cloneElement(child, { key: idx }))}
        {childArray.map((child, idx) => React.cloneElement(child, { key: `dup-${idx}` }))}
      </motion.div>
    </div>
  )
} 