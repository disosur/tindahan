"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, User, LogOut, ChevronDown } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  user?: {
    name: string
    email: string
    role: string
    store?: string
  }
}

export function Header({ user }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    // Clear admin session if it's an admin user
    if (user?.role === "Super Admin") {
      sessionStorage.removeItem("admin_authenticated")
      window.location.href = "/admin/auth/login"
    } else {
      // Regular user logout
      window.location.href = "/auth/login"
    }
  }

  return (
    <header className="h-16 border-b bg-card px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold">E-Commerce Platform</h1>
        {user?.store && <Badge variant="secondary">{user.store}</Badge>}
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            className="flex items-center space-x-2"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <User className="h-4 w-4" />
            {user && (
              <>
                <span className="hidden md:block">{user.name}</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>

          {showUserMenu && user && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-card border rounded-lg shadow-lg p-4 z-50">
              <div className="space-y-2">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <Badge variant="outline" className="mt-1">
                    {user.role}
                  </Badge>
                </div>
                <hr />
                <Button variant="ghost" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start text-destructive" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
