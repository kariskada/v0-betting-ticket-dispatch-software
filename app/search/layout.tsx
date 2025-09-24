import type React from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/layout/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function SearchLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <DashboardLayout title="Search & Send" description="Find matches and dispatch tickets to bookmakers">
          {children}
        </DashboardLayout>
      </ProtectedRoute>
    </AuthProvider>
  )
}
