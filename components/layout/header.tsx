"use client"
import { useAuth } from "@/contexts/auth-context"
import { Badge } from "@/components/ui/badge"
import { Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  title?: string
  description?: string
}

export function Header({ title, description }: HeaderProps) {
  const { user } = useAuth()

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          {title && <h1 className="text-2xl font-semibold text-foreground">{title}</h1>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>

        <div className="flex items-center gap-4">
          {/* Status indicator */}
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">System Online</span>
          </div>

          {/* Role badge */}
          {user && (
            <Badge variant={user.role === "admin" ? "default" : "secondary"} className="capitalize">
              {user.role}
            </Badge>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
