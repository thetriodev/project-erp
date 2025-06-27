"use client"

import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Badge } from "@workspace/ui/components/badge"
import { MoreHorizontal, Shield, ShieldAlert, UserCheck } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { UserRequestsTable } from "@/components/dashboard/admin/user-requests-table"


export default function UsersPage() {
  const user = {
    role: "owner",
    // This is just a placeholder. In a real application, you would fetch the user data from your auth provider.
  }

  const [users, setUsers] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "manager",
      status: "active",
      createdAt: "2023-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      status: "active",
      createdAt: "2023-02-20",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "user",
      status: "blocked",
      createdAt: "2023-03-10",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "manager",
      status: "active",
      createdAt: "2023-04-05",
    },
  ])

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
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Manage users, roles, and permissions.</p>
      </div>

      <Tabs defaultValue="all-users">
        <TabsList>
          <TabsTrigger value="all-users">All Users</TabsTrigger>
          <TabsTrigger value="requests">Role Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="all-users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>A list of all users in your organization.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {user.role === "owner" ? (
                            <ShieldAlert className="h-4 w-4 text-primary" />
                          ) : user.role === "manager" ? (
                            <Shield className="h-4 w-4 text-blue-500" />
                          ) : (
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="capitalize">{user.role}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "active" ? "default" : "destructive"}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>{user.createdAt}</TableCell>
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
                            {user.role === "user" && <DropdownMenuItem>Promote to manager</DropdownMenuItem>}
                            {user.status === "active" ? (
                              <DropdownMenuItem className="text-destructive">Block user</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>Unblock user</DropdownMenuItem>
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
        </TabsContent>
        <TabsContent value="requests">
          <UserRequestsTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
