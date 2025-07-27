"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ModeToggle } from "@/components/mode-toggle"
import { Loader2, Zap, Sparkles, ArrowRight, User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function DynamicAuth() {
  const [hoveredSection, setHoveredSection] = useState<"login" | "register" | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, type: "login" | "register") => {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Simulate API call
    setTimeout(() => {
      if (type === "login") {
        if (email === "admin@knowme.site" && password === "admin") {
          router.push("/admin")
        } else if (email && password) {
          router.push("/dashboard")
        } else {
          setError("Please enter valid credentials")
        }
      } else {
        const name = formData.get("name") as string
        const confirmPassword = formData.get("confirmPassword") as string

        if (name && email && password && password === confirmPassword) {
          router.push("/dashboard")
        } else if (password !== confirmPassword) {
          setError("Passwords do not match")
        } else {
          setError("Please fill in all fields")
        }
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-background" ref={containerRef}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10" />

        {/* Animated Background Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-pink-500/20 to-primary/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative bg-gradient-to-r from-primary via-purple-500 to-pink-500 p-2 rounded-xl">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Know Me
            </span>
            <div className="text-xs text-muted-foreground font-medium">Digital Identity Platform</div>
          </div>
        </Link>
        <ModeToggle />
      </div>

      {/* Main Auth Container - Full Screen */}
      <div className="relative h-full w-full flex">
        {/* Login Section */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/10 backdrop-blur-sm"
          style={{
            clipPath:
              hoveredSection === "login"
                ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                : hoveredSection === "register"
                  ? "polygon(0 0, 5% 0, 0 100%, 0 100%)"
                  : "polygon(0 0, 50.2% 0, 49.8% 100%, 0 100%)",
          }}
          animate={{
            clipPath:
              hoveredSection === "login"
                ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                : hoveredSection === "register"
                  ? "polygon(0 0, 5% 0, 0 100%, 0 100%)"
                  : "polygon(0 0, 50.2% 0, 49.8% 100%, 0 100%)",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onMouseEnter={() => setHoveredSection("login")}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="h-full flex items-center justify-center p-8">
            <motion.div
              className="w-full max-w-md"
              animate={{
                opacity: hoveredSection === "register" ? 0.3 : 1,
                scale: hoveredSection === "register" ? 0.8 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-8">
                <motion.h2
                  className="text-3xl font-bold mb-2"
                  animate={{
                    fontSize: hoveredSection === "login" ? "2.5rem" : "1.875rem",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  Welcome Back
                </motion.h2>
                <p className="text-muted-foreground">Sign in to your account</p>
                <div className="mt-4 text-sm text-muted-foreground">
                  Use <span className="font-mono bg-muted px-2 py-1 rounded">admin@knowme.site</span> /
                  <span className="font-mono bg-muted px-2 py-1 rounded ml-1">admin</span> for admin access
                </div>
              </div>

              <form onSubmit={(e) => handleSubmit(e, "login")} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="login-email" className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="h-12 bg-background/50 backdrop-blur-sm border-2 focus:border-primary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      className="h-12 bg-background/50 backdrop-blur-sm border-2 focus:border-primary/50 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-lg bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:from-primary/90 hover:via-purple-500/90 hover:to-pink-500/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Button variant="link" className="text-sm text-muted-foreground hover:text-primary">
                    Forgot your password?
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>

        {/* Register Section */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-bl from-purple-500/5 to-pink-500/10 backdrop-blur-sm"
          style={{
            clipPath:
              hoveredSection === "register"
                ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                : hoveredSection === "login"
                  ? "polygon(95% 0, 100% 0, 100% 100%, 100% 100%)"
                  : "polygon(49.8% 0, 100% 0, 100% 100%, 50.2% 100%)",
          }}
          animate={{
            clipPath:
              hoveredSection === "register"
                ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                : hoveredSection === "login"
                  ? "polygon(95% 0, 100% 0, 100% 100%, 100% 100%)"
                  : "polygon(49.8% 0, 100% 0, 100% 100%, 50.2% 100%)",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onMouseEnter={() => setHoveredSection("register")}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="h-full flex items-center justify-center p-8">
            <motion.div
              className="w-full max-w-md"
              animate={{
                opacity: hoveredSection === "login" ? 0.3 : 1,
                scale: hoveredSection === "login" ? 0.8 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-8">
                <motion.h2
                  className="text-3xl font-bold mb-2"
                  animate={{
                    fontSize: hoveredSection === "register" ? "2.5rem" : "1.875rem",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  Create Account
                </motion.h2>
                <p className="text-muted-foreground">Start your digital journey</p>
              </div>

              <form onSubmit={(e) => handleSubmit(e, "register")} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="register-name" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Full Name
                  </Label>
                  <Input
                    id="register-name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    required
                    className="h-12 bg-background/50 backdrop-blur-sm border-2 focus:border-primary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email" className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Label>
                  <Input
                    id="register-email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="h-12 bg-background/50 backdrop-blur-sm border-2 focus:border-primary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password" className="flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      required
                      className="h-12 bg-background/50 backdrop-blur-sm border-2 focus:border-primary/50 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password" className="flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="register-confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      required
                      className="h-12 bg-background/50 backdrop-blur-sm border-2 focus:border-primary/50 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-lg bg-gradient-to-r from-purple-500 via-pink-500 to-primary hover:from-purple-500/90 hover:via-pink-500/90 hover:to-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Your Identity
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  By creating an account, you agree to our{" "}
                  <Link href="/terms" className="underline hover:text-primary">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline hover:text-primary">
                    Privacy Policy
                  </Link>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>

        {/* Glossy Overlay - Only when both sections are inactive */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.08) 100%)",
            backdropFilter: "blur(1px)",
          }}
          animate={{
            opacity: hoveredSection === null ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />

        {/* Mobile Touch Areas (for mobile devices) */}
        <div className="md:hidden absolute inset-0 pointer-events-none">
          <div
            className="absolute left-0 top-0 w-1/2 h-full pointer-events-auto"
            onTouchStart={() => setHoveredSection("login")}
            onTouchEnd={() => setHoveredSection(null)}
          />
          <div
            className="absolute right-0 top-0 w-1/2 h-full pointer-events-auto"
            onTouchStart={() => setHoveredSection("register")}
            onTouchEnd={() => setHoveredSection(null)}
          />
        </div>

        {/* Mobile Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden z-50">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-2 rounded-full border">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>Tap sections to switch</span>
          </div>
        </div>
      </div>
    </div>
  )
}
