import { validatePassword } from "@/lib/utils"

interface PasswordStrengthIndicatorProps {
  password: string
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const checks = validatePassword(password)
  const strength = Object.values(checks).filter(Boolean).length
  
  const getStrengthColor = () => {
    if (strength < 2) return 'bg-destructive'
    if (strength < 4) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStrengthText = () => {
    if (strength < 2) return 'Weak'
    if (strength < 4) return 'Medium'
    return 'Strong'
  }

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded ${
              i <= strength ? getStrengthColor() : 'bg-muted'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${
        strength < 2 ? 'text-destructive' : 
        strength < 4 ? 'text-yellow-600' : 'text-green-600'
      }`}>
        Password strength: {getStrengthText()}
      </p>
      <div className="text-xs text-muted-foreground mt-1 space-y-1">
        <div className={checks.length ? 'text-green-600' : 'text-muted-foreground'}>
          ✓ At least 8 characters
        </div>
        <div className={checks.uppercase ? 'text-green-600' : 'text-muted-foreground'}>
          ✓ One uppercase letter
        </div>
        <div className={checks.lowercase ? 'text-green-600' : 'text-muted-foreground'}>
          ✓ One lowercase letter
        </div>
        <div className={checks.number ? 'text-green-600' : 'text-muted-foreground'}>
          ✓ One number
        </div>
      </div>
    </div>
  )
}