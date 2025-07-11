import type React from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { AdminGuard } from "../auth/admin-guard"

interface MainLayoutProps {
  children: React.ReactNode
  role: "user" | "store" | "admin"
  storeId?: string
  user?: {
    name: string
    email: string
    role: string
    store?: string
  }
}

const MainLayout = ({ children, role, storeId, user }: MainLayoutProps) => {
  const content = (
    <div className="flex h-screen bg-background">
      <Sidebar role={role} storeId={storeId} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )

  // Wrap admin pages with AdminGuard
  if (role === "admin") {
    return <AdminGuard>{content}</AdminGuard>
  }

  return content
}

export default MainLayout
