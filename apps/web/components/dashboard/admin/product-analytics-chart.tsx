"use client"

export function ProductAnalyticsChart() {
  const data = [
    { name: "Laptops", sales: 45, color: "bg-blue-500" },
    { name: "Headphones", sales: 78, color: "bg-green-500" },
    { name: "Smartphones", sales: 32, color: "bg-yellow-500" },
    { name: "Watches", sales: 15, color: "bg-purple-500" },
    { name: "Speakers", sales: 28, color: "bg-red-500" },
  ]

  const maxSales = Math.max(...data.map((d) => d.sales))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Product Sales</span>
        <span>Units Sold</span>
      </div>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-4">
            <div className="w-20 text-sm font-medium">{item.name}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className={`h-6 ${item.color} rounded`} style={{ width: `${(item.sales / maxSales) * 100}%` }} />
                <span className="text-sm font-medium">{item.sales} units</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
