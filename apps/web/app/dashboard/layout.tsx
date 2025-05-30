import { DashboardHeader } from "@/components/dashboard/shared/dashboard-header"
import { SideNavbar } from "@/components/dashboard/shared/side-navbar"
import { SidebarProvider } from "@workspace/ui/components/sidebar"
import type React from "react"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="max-w-screen border flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <SideNavbar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
