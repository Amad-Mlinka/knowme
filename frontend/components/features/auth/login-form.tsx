'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/components/features/auth/auth-context"
import { validateEmail } from "@/lib/utils"
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react"

interface LoginFormProps {
  onSwitchToRegister: () => void
  onSwitchToForgotPassword: () => void
  onClose: () => void
}

export function LoginForm({ onSwitchToRegister, onSwitchToForgotPassword, onClose }: LoginFormProps) {
  const { login, loading } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      await login(formData.email, formData.password, formData.rememberMe)
      onClose()
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className={errors.email ? 'border-destructive' : ''}
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className={errors.password ? 'border-destructive pr-12' : 'pr-12'}
            placeholder="Enter your password"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={formData.rememberMe}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
            }
          />
          <Label htmlFor="remember" className="text-sm">Remember me</Label>
        </div>
        <Button
          type="button"
          variant="link"
          className="px-0 text-sm"
          onClick={onSwitchToForgotPassword}
        >
          Forgot password?
        </Button>
      </div>

      {errors.general && <p className="text-destructive text-sm">{errors.general}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </>
        )}
      </Button>

      <div className="text-center">
        <p className="text-muted-foreground">
          Don't have an account?{' '}
          <Button
            type="button"
            variant="link"
            className="px-0"
            onClick={onSwitchToRegister}
          >
            Sign up
          </Button>
        </p>
      </div>
    </form>
  )
}