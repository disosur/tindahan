"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle } from "lucide-react"

interface AdminGuardProps {
  children: React.ReactNode
}

export function AdminGuard({ children }: AdminGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // In a real app, this would check for valid admin session/token
    const checkAdminAuth = () => {
      // For demo purposes, we'll simulate checking admin authentication
      const isAdminLoggedIn = sessionStorage.getItem("admin_authenticated") === "true"

      if (!isAdminLoggedIn) {
        // Redirect to admin login
        window.location.href = "/admin/auth/login"
        return
      }

      setIsAuthenticated(true)
    }

    checkAdminAuth()
  }, [])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
            <CardTitle>Verifying Access...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-2">
              <div className="h-2 bg-muted rounded"></div>
              <div className="h-2 bg-muted rounded w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md border-destructive">
          <CardHeader className="text-center">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-destructive" />
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">You don't have permission to access this area.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
