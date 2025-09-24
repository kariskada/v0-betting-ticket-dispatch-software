"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { LayoutDashboard, Search, History, Settings, LogOut, Menu, X, TrendingUp, Users, BarChart3 } from "lucide-react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const adminNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Search & Send",
      href: "/search",
      icon: Search,
    },
    {
      title: "History",
      href: "/history",
      icon: History,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      title: "Users",
      href: "/users",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  const operatorNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Search & Send",
      href: "/search",
      icon: Search,
    },
    {
      title: "History",
      href: "/history",
      icon: History,
    },
  ]

  const navItems = user?.role === "admin" ? adminNavItems : operatorNavItems

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sidebar-primary/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-sidebar-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-sidebar-foreground">Betting Dispatch</h2>
              <p className="text-xs text-sidebar-foreground/60 capitalize">{user?.role} Panel v2.1</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                  isCollapsed && "px-2",
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && <span>{item.title}</span>}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-sidebar-border">
        {!isCollapsed && user && (
          <div className="mb-3 p-3 bg-sidebar-accent/50 rounded-lg">
            <p className="text-sm font-medium text-sidebar-foreground">{user.name}</p>
            <p className="text-xs text-sidebar-foreground/60">{user.email}</p>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full justify-start gap-3 text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive",
            isCollapsed && "px-2",
          )}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  )
}
