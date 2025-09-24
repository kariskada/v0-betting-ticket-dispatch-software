import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  change?: string
  icon: LucideIcon
  className?: string
  trend?: "up" | "down" | "neutral"
}

export function StatsCard({ title, value, change, icon: Icon, className, trend = "neutral" }: StatsCardProps) {
  const trendColors = {
    up: "text-success",
    down: "text-destructive",
    neutral: "text-muted-foreground",
  }

  return (
    <Card className={cn("border-border/50", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground">
            <span className={trendColors[trend]}>{change}</span> from yesterday
          </p>
        )}
      </CardContent>
    </Card>
  )
}
