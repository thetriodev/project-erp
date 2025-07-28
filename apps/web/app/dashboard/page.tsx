'use client'
import DashboardSkeleton from '@/components/Skeletons/dashboard-skeleton'
import { useAuth } from '@/provider/authProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Dashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // If user is loading or not authenticated, show skeleton
  // This prevents rendering the dashboard until user data is ready

  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === 'admin') {
        router.push('/dashboard/admin')
      } else if (user.role === 'manager') {
        router.push('/dashboard/manager')
      } else {
        router.push('/dashboard/user')
      }
    }
  }, [user, isLoading, router])

  // If user is loading or not authenticated, show skeleton
  if (isLoading || !user) {
    return <DashboardSkeleton />
  }
  // switch (user.role) {
  //   case 'admin':
  //     return <AdminDashboard />
  //   case 'manager':
  //     return <ManagerDashboard />
  //   default:
  //     return <UserDashboard />
  // }
}
