import type React from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/layout/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function SettingsLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <DashboardLayout title="Settings" description="Configure system settings and preferences">
          {children}
        </DashboardLayout>
      </ProtectedRoute>
    </AuthProvider>
  )
}
