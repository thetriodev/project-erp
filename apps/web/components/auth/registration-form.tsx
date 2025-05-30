'use client'

import type React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
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
import useAxiosPublic from '@/hooks/useAxiosPublic'

export type RegistrationFormData = {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const axiosPublic = useAxiosPublic()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>()

  const handleRegister = async (data: RegistrationFormData) => {
    setIsLoading(true)

    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match')
      setIsLoading(false)
      return
    }

    // save user to database
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    }
    try {
      const response = await axiosPublic.post('/auth/register', payload)
      if (response.data.success) {
        toast.success('Account created successfully', {
          description: 'You have been registered successfully.',
        })
        router.push('/')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleRegister)}>
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
