"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="icon"
        className="relative h-12 w-12 rounded-full border-2 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 hover:from-primary/20 hover:via-purple-500/20 hover:to-pink-500/20 border-primary/20 hover:border-primary/40 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5 blur-xl" />
        <Sun className="relative h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-primary" />
        <Moon className="absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-purple-500" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  )
}
