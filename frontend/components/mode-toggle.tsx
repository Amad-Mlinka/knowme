"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
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
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-background/95 backdrop-blur-sm border-2 border-primary/20 shadow-2xl rounded-xl"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-500/10 rounded-lg"
        >
          <Sun className="mr-2 h-4 w-4 text-primary" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 rounded-lg"
        >
          <Moon className="mr-2 h-4 w-4 text-purple-500" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-primary/10 rounded-lg"
        >
          <div className="mr-2 h-4 w-4 rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
