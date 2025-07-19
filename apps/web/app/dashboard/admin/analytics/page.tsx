"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { RevenueChart } from '@/components/dashboard/admin/revenue-chart'
import { ProductAnalyticsChart } from '@/components/dashboard/admin/product-analytics-chart'
import { ReorderLevelTable } from '@/components/dashboard/maneger/reorder-level-table'

export default function AnalyticsPage() {
    const user = {
        role: "owner",
        // This is just a placeholder. In a real application, you would fetch the user data from your auth provider.
        }
  if (user?.role !== "owner") {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">You don&apos;t have permission to view this page.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">View detailed analytics and reports.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Revenue" value="$24,389.75" description="+12% from last month" />
        <MetricCard title="Total Orders" value="342" description="+8% from last month" />
        <MetricCard title="Products Sold" value="1,245" description="+5% from last month" />
        <MetricCard title="Low Stock Items" value="8" description="Items below reorder level" />
      </div>

      <Tabs defaultValue="revenue">
        <TabsList>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="products">Product Analysis</TabsTrigger>
          <TabsTrigger value="reorder">Reorder Levels</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Over Time</CardTitle>
              <CardDescription>View revenue trends over different time periods.</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>View sales and revenue by product.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductAnalyticsChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reorder" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Products Near Reorder Level</CardTitle>
              <CardDescription>Products that need attention for restocking.</CardDescription>
            </CardHeader>
            <CardContent>
              <ReorderLevelTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MetricCard({
  title,
  value,
  description,
}: {
  title: string
  value: string
  description: string
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
