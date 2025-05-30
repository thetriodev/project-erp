"use client"

export function RevenueChart() {
  const data = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 4500 },
    { name: "May", revenue: 6000 },
    { name: "Jun", revenue: 5500 },
    { name: "Jul", revenue: 7000 },
    { name: "Aug", revenue: 6500 },
    { name: "Sep", revenue: 8000 },
    { name: "Oct", revenue: 7500 },
    { name: "Nov", revenue: 9000 },
    { name: "Dec", revenue: 8500 },
  ]

  const maxRevenue = Math.max(...data.map((d) => d.revenue))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Revenue ($)</span>
        <span>Month</span>
      </div>
      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-4">
            <div className="w-8 text-sm font-medium">{item.name}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="h-6 bg-primary rounded" style={{ width: `${(item.revenue / maxRevenue) * 100}%` }} />
                <span className="text-sm font-medium">${item.revenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
