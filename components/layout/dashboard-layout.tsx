"use client"

import type React from "react"
import { useAuth } from "@/contexts/auth-context"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { Loader2 } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  const { loading, isAuthenticated } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // This will be handled by the auth redirect
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title={title} description={description} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
