"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type User, type AuthState, mockLogin, mockLogout } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("betting-dispatch-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    try {
      const user = await mockLogin(email, password)
      if (user) {
        setUser(user)
        localStorage.setItem("betting-dispatch-user", JSON.stringify(user))
        return true
      }
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    setLoading(true)
    try {
      await mockLogout()
      setUser(null)
      localStorage.removeItem("betting-dispatch-user")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
