'use client'

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { LoginForm } from "@/components/features/auth/login-form"
import { RegisterForm } from "@/components/features/auth/register-form"
import { ForgotPasswordForm } from "@/components/features/auth/forgot-password-form"

type ModalType = 'login' | 'register' | 'forgotPassword' | 'resetCode'

interface AuthModalsProps {
  isOpen: boolean
  onClose: () => void
  initialModal?: ModalType
}

export function AuthModals({ isOpen, onClose, initialModal = 'login' }: AuthModalsProps) {
  const [currentModal, setCurrentModal] = useState<ModalType>(initialModal)

  const getModalTitle = () => {
    switch (currentModal) {
      case 'login':
        return 'Welcome Back'
      case 'register':
        return 'Create Account'
      case 'forgotPassword':
        return 'Reset Password'
      case 'resetCode':
        return 'Enter Reset Code'
      default:
        return ''
    }
  }

  const renderModalContent = () => {
    switch (currentModal) {
      case 'login':
        return (
          <LoginForm
            onSwitchToRegister={() => setCurrentModal('register')}
            onSwitchToForgotPassword={() => setCurrentModal('forgotPassword')}
            onClose={onClose}
          />
        )
      case 'register':
        return (
          <RegisterForm
            onSwitchToLogin={() => setCurrentModal('login')}
            onClose={onClose}
          />
        )
      case 'forgotPassword':
        return (
          <ForgotPasswordForm
            onSwitchToLogin={() => setCurrentModal('login')}
            onSwitchToResetCode={() => setCurrentModal('resetCode')}
          />
        )
      case 'resetCode':
        return (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              We've sent a 6-digit code to your email. Enter it below to continue.
            </p>
            {/* Reset code form would go here */}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getModalTitle()}</DialogTitle>
        </DialogHeader>
        {renderModalContent()}
      </DialogContent>
    </Dialog>
  )
}