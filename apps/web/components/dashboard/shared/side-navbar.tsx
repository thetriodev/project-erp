'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, ClipboardList, Home, Package, Settings, Users } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@workspace/ui/components/sidebar'
import { Button } from '@workspace/ui/components/button'
import Image from 'next/image'
// import { useAuth } from "@/components/auth-provider"

export function SideNavbar() {
  //   const { user } = useAuth()
  const user = {
    role: 'owner',
    name: 'John Doe',
    email: 'xH3YH@example.com',
  }
  const pathname = usePathname()

  return (
    <Sidebar>
      {/* side bar header */}
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            ERP
          </div>
          <div className="font-semibold">ERP System</div>
        </div>
      </SidebarHeader>
      {/* separator */}
      <SidebarSeparator />

      {/* side bar content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/dashboard'} tooltip="Dashboard">
                  <Link href="/dashboard">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {
                // (user?.role === "owner" || user?.role === "manager") &&
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === '/dashboard/products'}
                      tooltip="Products"
                    >
                      <Link href="/dashboard/products">
                        <Package className="h-4 w-4" />
                        <span>Products</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === '/dashboard/memos'}
                      tooltip="Memos"
                    >
                      <Link href="/dashboard/memos">
                        <ClipboardList className="h-4 w-4" />
                        <span>Memos</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              }

              {
                // user?.role === "owner" &&
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === '/dashboard/users'}
                      tooltip="Users"
                    >
                      <Link href="/dashboard/users">
                        <Users className="h-4 w-4" />
                        <span>Users</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === '/dashboard/analytics'}
                      tooltip="Analytics"
                    >
                      <Link href="/dashboard/analytics">
                        <BarChart3 className="h-4 w-4" />
                        <span>Analytics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              }

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/dashboard/settings'}
                  tooltip="Settings"
                >
                  <Link href="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {
          // user?.role === "user" &&
          <SidebarGroup>
            <SidebarGroupLabel>Actions</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-4 py-2">
                <Button variant="outline" size="sm" className="w-full">
                  Request Manager Role
                </Button>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        }
      </SidebarContent>
      {/* side bar footer */}
      <SidebarFooter>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-700">
              {user?.name ? (
                <Image src="/placeholder-user.jpg" alt={user?.name} fill className="object-cover" />
              ) : (
                user.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
              )}
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
            </div>
          </div>
        </div>
      </SidebarFooter>
      {/* side bar rail */}
      <SidebarRail />
    </Sidebar>
  )
}
