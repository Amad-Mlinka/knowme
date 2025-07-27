"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Globe, Zap, Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function CTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-pulse" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute top-40 right-32 w-24 h-24 border border-white/20 rounded-full"
          animate={{ rotate: -360, scale: [1, 0.8, 1] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-16 h-16 border border-white/20 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.5, 1] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-20 h-20 border border-white/20 rounded-full"
          animate={{ rotate: -360, scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      <div className="container relative z-10 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-6 py-3 text-sm mb-8 border border-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
            <span className="font-medium">Join 50,000+ creators worldwide</span>
            <div className="ml-3 flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Ready to create your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-white">
              digital masterpiece?
            </span>
          </h2>

          <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed max-w-3xl mx-auto">
            Start building your stunning personal website today. No coding required, no design skills needed. Just your
            story, beautifully told to the world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="text-lg px-10 py-6 bg-white text-primary hover:bg-white/90 shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-2xl font-semibold"
            >
              <Link href="/auth">
                <Globe className="mr-3 h-6 w-6" />
                Create Your Site Free
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-6 border-2 border-white/30 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm rounded-2xl font-semibold"
            >
              <Zap className="mr-3 h-6 w-6" />
              View Live Demo
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Globe, title: "Launch in Minutes", desc: "Get online instantly" },
              { icon: Sparkles, title: "No Coding Required", desc: "Visual drag & drop" },
              { icon: Zap, title: "Lightning Fast", desc: "Optimized performance" },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm opacity-80">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
