'use client'

import { AdminDashboard } from '@/components/dashboard/admin/admin-dashboard'
import { ManagerDashboard } from '@/components/dashboard/maneger/maneger-dashboard'
import { UserDashboard } from '@/components/dashboard/user/user-dashboard'
import DashboardSkeleton from '@/components/Skeletons/dashboard-skeleton'
import { useAuth } from '@/provider/authProvider'

export default function Dashboard() {
  const { user, isLoading } = useAuth()

  // If user is loading or not authenticated, show skeleton
  // This prevents rendering the dashboard until user data is ready
  if (isLoading || !user) {
    return <DashboardSkeleton />
  }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />
    case 'manager':
      return <ManagerDashboard />
    default:
      return <UserDashboard />
  }
}
