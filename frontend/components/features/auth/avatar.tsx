import { User } from "@/components/features/auth/auth-context"
import { generateAvatarColor, getInitials } from "@/lib/utils"

interface AvatarProps {
  user: User
  size?: 'sm' | 'md' | 'lg'
}

export function Avatar({ user, size = 'md' }: AvatarProps) {
  const initials = getInitials(user.name)
  const colorClass = generateAvatarColor(user.name)
  
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-lg'
  }

  return (
    <div className={`${sizeClasses[size]} ${colorClass} rounded-full flex items-center justify-center text-white font-medium`}>
      {initials}
    </div>
  )
}