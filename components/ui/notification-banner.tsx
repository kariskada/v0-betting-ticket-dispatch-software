"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NotificationBannerProps {
  type: "success" | "error" | "info"
  message: string
  onClose?: () => void
  autoClose?: boolean
  duration?: number
}

export function NotificationBanner({
  type,
  message,
  onClose,
  autoClose = true,
  duration = 5000,
}: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [autoClose, duration, onClose])

  if (!isVisible) return null

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  }

  const Icon = icons[type]

  const styles = {
    success: "bg-success/10 border-success/20 text-success-foreground",
    error: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
    info: "bg-primary/10 border-primary/20 text-primary-foreground",
  }

  return (
    <div className={cn("flex items-center gap-3 p-4 border rounded-lg", styles[type])}>
      <Icon className="h-5 w-5 flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setIsVisible(false)
          onClose?.()
        }}
        className="h-6 w-6 p-0 hover:bg-background/20"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
