'use client'

import type React from 'react'
import Link from 'next/link'
import { Input } from '@workspace/ui/components/input'
import { Button } from '@workspace/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card'
import { useForm } from 'react-hook-form'
import { TLoginFormData } from '@/types/authTypes'
import { useAuth } from '@/provider/authProvider'


export function LoginForm() {
  const { isLoading, loginUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormData>()

  

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email and password to access your account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(loginUser)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4>Email</h4>
            <Input
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="m@example.com"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <h4>Password</h4>
            <Input
              type="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 mt-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary underline-offset-4 hover:underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
