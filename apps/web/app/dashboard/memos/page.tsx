'use client'

import { useState } from 'react'
import { Card, CardContent } from '@workspace/ui/components/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import { Badge } from '@workspace/ui/components/badge'
import { MoreHorizontal, Plus } from 'lucide-react'
import { Input } from '@workspace/ui/components/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs'
import { Button } from '@workspace/ui/components/button'
import { CreateMemoDialog } from '@/components/dashboard/maneger/create-memo-dialog'
// import { CreateMemoDialog } from "@/components/dashboard/create-memo-dialog"

// type
type MemoStatus = 'paid' | 'due' | 'partial'
type MemoType = 'hand-to-hand' | 'due-order' | 'advance-order'

 export type TMemo = {
  id: string
  customerName: string
  phoneNumber: string
  date: string // Format: "YYYY-MM-DD"
  total: number
  status: MemoStatus
  type: MemoType
}

// demo memos data
const memos: TMemo[] = [
  {
    id: 'M-01234-9876543',
    customerName: 'Alex Johnson',
    phoneNumber: '+1-987-654-3210',
    date: '2023-05-15',
    total: 1299.99,
    status: 'paid',
    type: 'hand-to-hand',
  },
  {
    id: 'M-01235-8765432',
    customerName: 'Maria Garcia',
    phoneNumber: '+1-876-543-2109',
    date: '2023-05-16',
    total: 499.99,
    status: 'due',
    type: 'due-order',
  },
  {
    id: 'M-01236-7654321',
    customerName: 'James Smith',
    phoneNumber: '+1-765-432-1098',
    date: '2023-05-17',
    total: 899.99,
    status: 'partial',
    type: 'advance-order',
  },
  {
    id: 'M-01237-6543210',
    customerName: 'Sarah Wilson',
    phoneNumber: '+1-654-321-0987',
    date: '2023-05-18',
    total: 149.99,
    status: 'paid',
    type: 'hand-to-hand',
  },
  {
    id: 'M-01238-5432109',
    customerName: 'Robert Brown',
    phoneNumber: '+1-543-210-9876',
    date: '2023-05-19',
    total: 2499.99,
    status: 'due',
    type: 'due-order',
  },
]

export default function MemosPage() {
  // const user = {
  //   role: "owner",
  //   // This is just a placeholder. In a real application, you would fetch the user data from your auth provider.
  // }
  const [showCreateMemo, setShowCreateMemo] = useState(false)

  //   if (user?.role === "user") {
  //     return (
  //       <div className="flex h-full items-center justify-center">
  //         <p className="text-muted-foreground">You don&apos;t have permission to view this page.</p>
  //       </div>
  //     )
  //   }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Memo Management</h1>
          <p className="text-muted-foreground">Create and manage customer memos.</p>
        </div>
        <Button onClick={() => setShowCreateMemo(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Memo
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Input placeholder="Search memos by ID or customer..." className="max-w-sm" />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Memos</TabsTrigger>
          <TabsTrigger value="hand-to-hand">Hand to Hand</TabsTrigger>
          <TabsTrigger value="advance-order">Advance Order</TabsTrigger>
          <TabsTrigger value="due-order">Due Order</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <MemoTable memos={memos} />
        </TabsContent>
        <TabsContent value="hand-to-hand">
          <MemoTable memos={memos.filter(memo => memo.type === 'hand-to-hand')} />
        </TabsContent>
        <TabsContent value="advance-order">
          <MemoTable memos={memos.filter(memo => memo.type === 'advance-order')} />
        </TabsContent>
        <TabsContent value="due-order">
          <MemoTable memos={memos.filter(memo => memo.type === 'due-order')} />
        </TabsContent>
      </Tabs>

      <CreateMemoDialog open={showCreateMemo} onOpenChange={setShowCreateMemo} />
    </div>
  )
}

function MemoTable({ memos }: { memos: TMemo[] }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Memo ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {memos.map(memo => (
              <TableRow key={memo.id}>
                <TableCell className="font-medium">{memo.id}</TableCell>
                <TableCell>{memo.customerName}</TableCell>
                <TableCell>{memo.phoneNumber}</TableCell>
                <TableCell>{memo.date}</TableCell>
                <TableCell>${memo.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      memo.status === 'paid'
                        ? 'default'
                        : memo.status === 'partial'
                          ? 'outline'
                          : 'destructive'
                    }
                  >
                    {memo.status === 'paid'
                      ? 'Paid'
                      : memo.status === 'partial'
                        ? 'Partial'
                        : 'Due'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="capitalize">{memo.type.replace(/-/g, ' ')}</span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Print memo</DropdownMenuItem>
                      {memo.status !== 'paid' && (
                        <DropdownMenuItem>Record payment</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
