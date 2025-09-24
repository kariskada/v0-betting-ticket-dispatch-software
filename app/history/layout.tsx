import type React from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/layout/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function HistoryLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <DashboardLayout title="Ticket History" description="View and manage all dispatched tickets">
          {children}
        </DashboardLayout>
      </ProtectedRoute>
    </AuthProvider>
  )
}
