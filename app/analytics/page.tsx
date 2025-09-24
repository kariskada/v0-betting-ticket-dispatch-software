"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, TrendingDown, Users, Target, Clock, Euro, Activity } from "lucide-react"

export default function AnalyticsPage() {
  const performanceMetrics = [
    {
      title: "Total Revenue",
      value: "€12,847",
      change: "+18.2%",
      trend: "up",
      icon: Euro,
      description: "Last 30 days",
    },
    {
      title: "Success Rate",
      value: "94.7%",
      change: "+2.1%",
      trend: "up",
      icon: Target,
      description: "Ticket dispatch success",
    },
    {
      title: "Avg Response Time",
      value: "1.3s",
      change: "-0.2s",
      trend: "up",
      icon: Clock,
      description: "System performance",
    },
    {
      title: "Active Users",
      value: "23",
      change: "+4",
      trend: "up",
      icon: Users,
      description: "This month",
    },
  ]

  const bookmakerPerformance = [
    { name: "Eurobet", tickets: 145, success: 98.6, revenue: 3420 },
    { name: "Snai", tickets: 132, success: 96.2, revenue: 2890 },
    { name: "Sisal", tickets: 118, success: 94.1, revenue: 2650 },
    { name: "Lottomatica", tickets: 89, success: 92.1, revenue: 2180 },
    { name: "Goldbet", tickets: 67, success: 89.6, revenue: 1580 },
  ]

  const recentAlerts = [
    {
      id: 1,
      type: "warning",
      message: "Goldbet response time increased by 15%",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "success",
      message: "New daily record: 247 tickets dispatched",
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "info",
      message: "System maintenance scheduled for tonight",
      time: "1 day ago",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric) => (
          <Card key={metric.title} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-2 text-xs">
                <span
                  className={`flex items-center gap-1 ${metric.trend === "up" ? "text-success" : "text-destructive"}`}
                >
                  {metric.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {metric.change}
                </span>
                <span className="text-muted-foreground">{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bookmaker Performance */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Bookmaker Performance
          </CardTitle>
          <CardDescription>Success rates and revenue by bookmaker (last 30 days)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookmakerPerformance.map((bookmaker) => (
              <div key={bookmaker.name} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={`/${bookmaker.name.toLowerCase()}-logo.jpg`}
                      alt={`${bookmaker.name} logo`}
                      className="w-8 h-8 rounded"
                    />
                    <div>
                      <h3 className="font-medium">{bookmaker.name}</h3>
                      <p className="text-sm text-muted-foreground">{bookmaker.tickets} tickets</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">€{bookmaker.revenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Success Rate</span>
                    <span className="font-medium">{bookmaker.success}%</span>
                  </div>
                  <Progress value={bookmaker.success} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Alerts
          </CardTitle>
          <CardDescription>Recent system notifications and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <Badge
                  variant={
                    alert.type === "warning" ? "destructive" : alert.type === "success" ? "default" : "secondary"
                  }
                  className="capitalize"
                >
                  {alert.type}
                </Badge>
                <div className="flex-1">
                  <p className="text-sm">{alert.message}</p>
                </div>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
