'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/features/auth/auth-context"
import { validateEmail } from "@/lib/utils"
import { Mail, Loader2 } from "lucide-react"

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void
  onSwitchToResetCode: () => void
}

export function ForgotPasswordForm({ onSwitchToLogin, onSwitchToResetCode }: ForgotPasswordFormProps) {
  const { forgotPassword, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const validateForm = () => {
    if (!email) {
      setError('Email is required')
      return false
    }
    if (!validateEmail(email)) {
      setError('Invalid email format')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      await forgotPassword(email)
      onSwitchToResetCode()
    } catch (error) {
      setError('Failed to send reset code. Please try again.')
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Enter your email address and we'll send you a code to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="resetEmail">Email Address</Label>
          <Input
            id="resetEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={error ? 'border-destructive' : ''}
            placeholder="Enter your email"
          />
          {error && <p className="text-destructive text-sm mt-1">{error}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Send Reset Code
            </>
          )}
        </Button>
      </form>

      <div className="text-center">
        <Button
          type="button"
          variant="link"
          onClick={onSwitchToLogin}
        >
          Back to Sign In
        </Button>
      </div>
    </div>
  )
}