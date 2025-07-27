"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Globe, Star, Users, Zap } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/20" />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-pink-500/30 to-primary/30 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-2xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {/* Announcement Badge */}
            <motion.div
              className="inline-flex items-center rounded-full border bg-background/50 backdrop-blur-sm px-6 py-3 text-sm mb-8 mt-3 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="mr-2 h-4 w-4 text-yellow-500 animate-pulse" />
              <span className="font-medium">New: AI-Powered Content Generator</span>
              <div className="ml-2 px-2 py-1 bg-gradient-to-r from-primary to-purple-500 text-white text-xs rounded-full">
                BETA
              </div>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight my-8 leading-tight">
              <span className="block">Your Digital</span>
              <span className="block bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent h-28">
                Identity Reimagined
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Create stunning, interactive personal websites that showcase your unique story. From portfolios to
              business cards, build your digital presence with our revolutionary platform.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <Button
              size="lg"
              asChild
              className="text-lg px-10 py-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:from-primary/90 hover:via-purple-500/90 hover:to-pink-500/90 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-2xl"
            >
              <Link href="/auth">
                <Globe className="mr-3 h-6 w-6" />
                Start Creating Free
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-6 bg-background/50 backdrop-blur-sm border-2 hover:bg-background/80 rounded-2xl"
            >
              <Play className="mr-3 h-6 w-6" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              { icon: Users, value: "50K+", label: "Active Creators" },
              { icon: Globe, value: "100K+", label: "Sites Created" },
              { icon: Star, value: "4.9", label: "User Rating" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center p-6 rounded-2xl bg-background/30 backdrop-blur-sm border"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <stat.icon className="h-8 w-8 text-primary mb-3" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Hero Image/Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl border-2 bg-background/50 backdrop-blur-sm p-4 shadow-2xl">
              <img
                src="/placeholder.svg?height=700&width=1200"
                alt="Know Me Platform Dashboard"
                className="rounded-2xl w-full"
              />

              {/* Floating UI Elements */}
              <motion.div
                className="absolute top-8 right-8 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Zap className="w-4 h-4 mr-2" />
                Live Site
              </motion.div>

              <motion.div
                className="absolute bottom-8 left-8 bg-background/90 backdrop-blur-sm border rounded-xl p-4 shadow-lg"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="text-sm font-medium">Real-time Analytics</div>
                <div className="text-2xl font-bold text-primary">+247%</div>
                <div className="text-xs text-muted-foreground">Profile views this month</div>
              </motion.div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
