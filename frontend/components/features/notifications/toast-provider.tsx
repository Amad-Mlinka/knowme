'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Toast, ToastTitle, ToastDescription } from '@/components/ui/toast'
import { Check, AlertCircle, X } from 'lucide-react'

interface ToastData {
  id: string
  type: 'success' | 'error'
  title?: string
  message: string
}

interface ToastContextType {
  showToast: (type: 'success' | 'error', message: string, title?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const showToast = (type: 'success' | 'error', message: string, title?: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    const toast: ToastData = { id, type, message, title }
    
    setToasts(prev => [...prev, toast])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 5000)
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.type === 'error' ? 'destructive' : 'default'}
            className={`min-w-[300px] ${
              toast.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : ''
            }`}
          >
            <div className="flex items-start gap-3">
              {toast.type === 'success' ? (
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              )}
              <div className="flex-1">
                {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
                <ToastDescription>{toast.message}</ToastDescription>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}