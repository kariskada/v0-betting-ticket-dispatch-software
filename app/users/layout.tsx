import type React from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/layout/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function UsersLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <ProtectedRoute requiredRole="admin">
        <DashboardLayout title="User Management" description="Manage system users and permissions">
          {children}
        </DashboardLayout>
      </ProtectedRoute>
    </AuthProvider>
  )
}
