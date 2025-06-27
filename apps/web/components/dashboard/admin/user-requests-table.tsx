"use client"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"
import { Badge } from "@workspace/ui/components/badge"
import { Check, X } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

export function UserRequestsTable() {
  const requests = [
    {
      id: "1",
      userName: "Alice Johnson",
      email: "alice@example.com",
      requestedRole: "manager",
      requestDate: "2023-05-20",
      status: "pending",
    },
    {
      id: "2",
      userName: "Bob Smith",
      email: "bob@example.com",
      requestedRole: "manager",
      requestDate: "2023-05-19",
      status: "pending",
    },
    {
      id: "3",
      userName: "Carol Davis",
      email: "carol@example.com",
      requestedRole: "manager",
      requestDate: "2023-05-18",
      status: "approved",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Requests</CardTitle>
        <CardDescription>Pending requests for role upgrades</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Requested Role</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.userName}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell className="capitalize">{request.requestedRole}</TableCell>
                <TableCell>{request.requestDate}</TableCell>
                <TableCell>
                  <Badge variant={request.status === "pending" ? "outline" : "default"}>{request.status}</Badge>
                </TableCell>
                <TableCell>
                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
