"use client"

import { AdminDashboard } from "@/components/dashboard/admin/admin-dashboard"

// import { useAuth } from "@/components/auth-provider"
// import { OwnerDashboard } from "@/components/dashboard/owner-dashboard"
// import { ManagerDashboard } from "@/components/dashboard/manager-dashboard"
// import { UserDashboard } from "@/components/dashboard/user-dashboard"


export default function Dashboard() {
    return <div>
        <AdminDashboard />
    </div>
//   const { user, isLoading } = useAuth()

//   if (isLoading) {
//     return <DashboardSkeleton />
//   }

//   if (!user) {
//     return null
//   }

//   switch (user.role) {
//     case "owner":
//       return <OwnerDashboard />
//     case "manager":
//       return <ManagerDashboard />
//     default:
//       return <UserDashboard />
//   }
}

