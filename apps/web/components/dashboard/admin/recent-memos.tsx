"use client"

import { Badge } from "@workspace/ui/components/badge"

export function RecentMemos() {
  const recentMemos = [
    {
      id: "M-01238-5432109",
      customer: "Robert Brown",
      amount: 2499.99,
      status: "due",
      date: "2023-05-19",
    },
    {
      id: "M-01237-6543210",
      customer: "Sarah Wilson",
      amount: 149.99,
      status: "paid",
      date: "2023-05-18",
    },
    {
      id: "M-01236-7654321",
      customer: "James Smith",
      amount: 899.99,
      status: "partial",
      date: "2023-05-17",
    },
    {
      id: "M-01235-8765432",
      customer: "Maria Garcia",
      amount: 499.99,
      status: "due",
      date: "2023-05-16",
    },
  ]

  return (
    <div className="space-y-4">
      {recentMemos.map((memo) => (
        <div key={memo.id} className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">{memo.customer}</p>
            <p className="text-xs text-muted-foreground">{memo.id}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">${memo.amount.toFixed(2)}</p>
            <Badge
              variant={memo.status === "paid" ? "default" : memo.status === "partial" ? "outline" : "destructive"}
              className="text-xs"
            >
              {memo.status === "paid" ? "Paid" : memo.status === "partial" ? "Partial" : "Due"}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
