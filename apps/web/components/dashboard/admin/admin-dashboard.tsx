'use client'

import type React from 'react'
import Link from 'next/link'
import { BarChart3, ClipboardList, Package, TrendingDown, TrendingUp, Users } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card'

import { Button } from '@workspace/ui/components/button'
import { RevenueChart } from './revenue-chart'
import { RecentMemos } from './recent-memos'

export function AdminDashboard() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your business.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value="$24,389.75"
          trend="up"
          trendValue="12%"
          trendText="from last month"
          icon={<BarChart3 className="h-4 w-4" />}
        />
        <MetricCard
          title="Total Orders"
          value="342"
          trend="up"
          trendValue="8%"
          trendText="from last month"
          icon={<ClipboardList className="h-4 w-4" />}
        />
        <MetricCard
          title="Active Users"
          value="2,453"
          trend="up"
          trendValue="2%"
          trendText="from last month"
          icon={<Users className="h-4 w-4" />}
        />
        <MetricCard
          title="Low Stock Items"
          value="8"
          trend="down"
          trendValue="3"
          trendText="items since last week"
          icon={<Package className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue for the current year</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/analytics">View details</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Memos</CardTitle>
              <CardDescription>Latest customer memos</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/memos">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <RecentMemos />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  trend,
  trendValue,
  trendText,
  icon,
}: {
  title: string
  value: string
  trend: 'up' | 'down'
  trendValue: string
  trendText: string
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="mt-2 flex items-center text-xs">
          {trend === 'up' ? (
            <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
          ) : (
            <TrendingDown className="mr-1 h-3 w-3 text-rose-500" />
          )}
          <span className={trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}>
            {trendValue}
          </span>
          <span className="ml-1 text-muted-foreground">{trendText}</span>
        </div>
      </CardContent>
    </Card>
  )
}
