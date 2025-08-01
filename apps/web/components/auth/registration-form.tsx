'use client'
import type React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
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

import { TRegistrationFormData } from '@/types/authTypes'
import { useAuth } from '@/provider/authProvider'

export function RegisterForm() {
  const {isLoading, registerUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegistrationFormData>()
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(registerUser)} className="space-y-4">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4>Full Name</h4>
            <Input {...register('name', { required: 'Name is required' })} placeholder="John Doe" />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>
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
            <h4>Phone Number</h4>
            <Input
              type="tel"
              {...register('phone', { required: 'Phone number is required' })}
              placeholder="+1234567890"
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
          </div>
          <div className="space-y-2">
            <h4>Password</h4>
            <Input
              type="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
          <div className="space-y-2">
            <h4>Confirm Password</h4>
            <Input
              type="password"
              {...register('confirmPassword', { required: 'Please confirm your password' })}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 mt-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/" className="text-primary underline-offset-4 hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
