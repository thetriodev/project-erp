
import { SideNavbar } from '@/components/dashboard/shared/side-navbar'
import { SidebarProvider } from '@workspace/ui/components/sidebar'
import type React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="w-[100%] border flex min-h-screen flex-col">
        <div className="flex flex-1 bg-">
          <SideNavbar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
