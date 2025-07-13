'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (code: string, newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: false
  })

  const login = async (email: string, password: string, rememberMe = false) => {
    setAuthState(prev => ({ ...prev, loading: true }))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setAuthState({
      isAuthenticated: true,
      user: {
        id: '1',
        name: 'John Doe',
        email: email
      },
      loading: false
    })
  }

  const register = async (name: string, email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true }))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setAuthState({
      isAuthenticated: true,
      user: {
        id: '1',
        name: name,
        email: email
      },
      loading: false
    })
  }

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false
    })
  }

  const forgotPassword = async (email: string) => {
    setAuthState(prev => ({ ...prev, loading: true }))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setAuthState(prev => ({ ...prev, loading: false }))
  }

  const resetPassword = async (code: string, newPassword: string) => {
    setAuthState(prev => ({ ...prev, loading: true }))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setAuthState(prev => ({ ...prev, loading: false }))
  }

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      forgotPassword,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}