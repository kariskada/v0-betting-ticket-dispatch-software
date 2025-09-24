"use client"
import { useAuth } from "@/contexts/auth-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/components/ui/stats-card"
import { TrendingUp, Users, Send, Clock, AlertCircle, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getTotalProfit, getSuccessRate, getTicketsByStatus } from "@/lib/mock-data"
import { NotificationBanner } from "@/components/ui/notification-banner"
import { useState } from "react"

export default function DashboardPage() {
  const { user } = useAuth()
  const [showNotification, setShowNotification] = useState(true)

  const todayTickets =
    getTicketsByStatus("pending").length + getTicketsByStatus("won").length + getTicketsByStatus("lost").length
  const totalProfit = getTotalProfit()
  const successRate = getSuccessRate()

  const stats = [
    {
      title: "Tickets Sent Today",
      value: todayTickets.toString(),
      change: "+12%",
      icon: Send,
      trend: "up" as const,
    },
    {
      title: "Active Shops",
      value: "8",
      change: "100%",
      icon: Users,
      trend: "neutral" as const,
    },
    {
      title: "Success Rate",
      value: `${successRate.toFixed(1)}%`,
      change: "+2.1%",
      icon: CheckCircle,
      trend: "up" as const,
    },
    {
      title: "Total Profit",
      value: `€${totalProfit.toFixed(0)}`,
      change: totalProfit >= 0 ? `+€${Math.abs(totalProfit).toFixed(0)}` : `-€${Math.abs(totalProfit).toFixed(0)}`,
      icon: TrendingUp,
      trend: totalProfit >= 0 ? ("up" as const) : ("down" as const),
    },
  ]

  const recentActivity = [
    {
      id: "1",
      action: "Ticket sent to Eurobet",
      match: "Real Madrid vs Barcelona",
      odds: "2.35",
      stake: "€100",
      status: "success",
      time: "2 minutes ago",
    },
    {
      id: "2",
      action: "Ticket sent to Snai",
      match: "Juventus vs Inter",
      odds: "1.85",
      stake: "€150",
      status: "success",
      time: "5 minutes ago",
    },
    {
      id: "3",
      action: "Ticket sent to Sisal",
      match: "Milan vs Napoli",
      odds: "2.10",
      stake: "€75",
      status: "pending",
      time: "8 minutes ago",
    },
    {
      id: "4",
      action: "Ticket sent to Lottomatica",
      match: "Bayern vs Dortmund",
      odds: "1.95",
      stake: "€200",
      status: "success",
      time: "12 minutes ago",
    },
  ]

  const quickActions = [
    {
      title: "Search & Send",
      description: "Find matches and dispatch tickets",
      href: "/search",
      icon: Send,
    },
    {
      title: "View History",
      description: "Check ticket history and results",
      href: "/history",
      icon: Clock,
    },
  ]

  const adminActions = [
    {
      title: "Analytics",
      description: "View performance metrics",
      href: "/analytics",
      icon: TrendingUp,
    },
    {
      title: "Manage Users",
      description: "User accounts and permissions",
      href: "/users",
      icon: Users,
    },
  ]

  return (
    <div className="space-y-6">
      {showNotification && (
        <NotificationBanner
          type="info"
          message="System maintenance scheduled for tonight at 2:00 AM. Expected downtime: 30 minutes."
          onClose={() => setShowNotification(false)}
        />
      )}

      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Welcome back, {user?.name?.split(" ")[0]}</h1>
        <p className="text-muted-foreground">Here's what's happening with your betting dispatch system today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => (
                <Link key={action.href} href={action.href}>
                  <Button variant="ghost" className="w-full justify-start h-auto p-4">
                    <div className="flex items-center gap-3">
                      <action.icon className="h-5 w-5 text-primary" />
                      <div className="text-left">
                        <p className="font-medium">{action.title}</p>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
                    </div>
                  </Button>
                </Link>
              ))}

              {user?.role === "admin" && (
                <>
                  <div className="border-t pt-3 mt-3">
                    <p className="text-xs font-medium text-muted-foreground mb-3">ADMIN ACTIONS</p>
                  </div>
                  {adminActions.map((action) => (
                    <Link key={action.href} href={action.href}>
                      <Button variant="ghost" className="w-full justify-start h-auto p-4">
                        <div className="flex items-center gap-3">
                          <action.icon className="h-5 w-5 text-primary" />
                          <div className="text-left">
                            <p className="font-medium">{action.title}</p>
                            <p className="text-sm text-muted-foreground">{action.description}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
                        </div>
                      </Button>
                    </Link>
                  ))}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest ticket dispatches and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {activity.status === "success" ? (
                          <CheckCircle className="h-4 w-4 text-success" />
                        ) : activity.status === "pending" ? (
                          <Clock className="h-4 w-4 text-warning" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-destructive" />
                        )}
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.match}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-right">
                        <p className="font-medium">Odds: {activity.odds}</p>
                        <p className="text-muted-foreground">Stake: {activity.stake}</p>
                      </div>
                      <Badge
                        variant={
                          activity.status === "success"
                            ? "default"
                            : activity.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {activity.status}
                      </Badge>
                      <p className="text-muted-foreground min-w-fit">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <Link href="/history">
                  <Button variant="outline" className="w-full bg-transparent">
                    View All History
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
