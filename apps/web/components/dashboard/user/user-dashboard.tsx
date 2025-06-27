'use client'

import { Button } from '@workspace/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card'

import { useState } from 'react'
import { toast } from 'sonner'

export function UserDashboard() {
  const [isRequesting, setIsRequesting] = useState(false)
  const [hasRequested, setHasRequested] = useState(false)

  const handleRequestManagerRole = () => {
    setIsRequesting(true)

    // Simulate API call
    setTimeout(() => {
      setIsRequesting(false)
      setHasRequested(true)
      toast('Request sent', {
        description: 'Your request for manager role has been sent to the owner.',
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the ERP system. Your account has limited access.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Request Manager Role Card */}
        <Card>
          <CardHeader>
            <CardTitle>Request Manager Role</CardTitle>
            <CardDescription>Request access to manage products and memos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">As a manager, you&apos;ll be able to:</p>
            <ul className="mt-2 list-disc pl-4 text-sm text-muted-foreground">
              <li>Add and edit inventory items</li>
              <li>Update product parameters</li>
              <li>View product statistics</li>
              <li>Create and manage customer memos</li>
              <li>Record payments and manage balances</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleRequestManagerRole}
              disabled={isRequesting || hasRequested}
              className="w-full"
            >
              {isRequesting
                ? 'Sending request...'
                : hasRequested
                  ? 'Request sent'
                  : 'Request manager role'}
            </Button>
          </CardFooter>
        </Card>

        {/* Account Status Card */}
        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
            <CardDescription>Your current account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Current role</p>
                <p className="text-sm text-muted-foreground">User</p>
              </div>
              <div>
                <p className="text-sm font-medium">Access level</p>
                <p className="text-sm text-muted-foreground">Limited</p>
              </div>
              <div>
                <p className="text-sm font-medium">Manager request</p>
                <p className="text-sm text-muted-foreground">
                  {hasRequested ? 'Request sent' : 'No request made'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
