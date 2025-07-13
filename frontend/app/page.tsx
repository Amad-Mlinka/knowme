'use client'

import { useState } from 'react'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/features/landing/hero-section"
import { BenefitsSection } from "@/components/features/landing/benefits-section"
import { AuthModals } from "@/components/features/auth/auth-modals"
import { useToast } from "@/components/features/notifications/toast-provider"
import { useAuth } from "@/components/features/auth/auth-context"

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalType, setAuthModalType] = useState<'login' | 'register'>('register')
  const { showToast } = useToast()
  const { isAuthenticated } = useAuth()

  const handleGetStarted = () => {
    if (isAuthenticated) {
      showToast('success', 'Welcome back! You are already logged in.')
    } else {
      setAuthModalType('register')
      setAuthModalOpen(true)
    }
  }

  const handleLogin = () => {
    setAuthModalType('login')
    setAuthModalOpen(true)
  }

  const handleRegister = () => {
    setAuthModalType('register')
    setAuthModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection onGetStarted={handleGetStarted} />
        <BenefitsSection />
      </main>
      <Footer />
      
      <AuthModals
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialModal={authModalType}
      />
    </div>
  )
}