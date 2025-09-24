import type React from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/layout/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function AnalyticsLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <ProtectedRoute requiredRole="admin">
        <DashboardLayout title="Analytics" description="Performance metrics and business intelligence">
          {children}
        </DashboardLayout>
      </ProtectedRoute>
    </AuthProvider>
  )
}
