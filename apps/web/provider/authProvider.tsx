'use client'

import type React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAxiosPublic from '@/hooks/useAxiosPublic'
import { toast } from 'sonner'
import {
  TLoginFormData,
  TRegistrationFormData,
  TResetPasswordFormData,
  TUser,
} from '@/types/authTypes'
import { AxiosError } from 'axios'
import useAxiosSecure from '@/hooks/useAxiosSecure'

// type User = {
//   id: string
//   name: string
//   email: string
//   role: 'admin' | 'manager' | 'user'
// }

type AuthContextType = {
  user: TUser | null
  isLoading: boolean
  registerUser: (payload: TRegistrationFormData) => Promise<void>
  loginUser: (payload: TLoginFormData) => Promise<void>
  resetUserPassword: (payload: TResetPasswordFormData) => Promise<void>
  logoutUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TUser | null>(null)
  console.log('AuthProvider user:', user)

  const [isLoading, setIsLoading] = useState(true)
  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure()
  const router = useRouter()

  useEffect(() => {
    // Load user from localStorage or cookies on app load
    const loadUser = async () => {
      setIsLoading(true)
      try {
        const storedUser = localStorage.getItem('authUser')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Failed to load user', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  //   register user function
  const registerUser = async (data: TRegistrationFormData) => {
    setIsLoading(true)

    if (data?.password !== data?.confirmPassword) {
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
      // now set user in localStorage
      if (response.data.success) {
        // localStorage.setItem('authUser', JSON.stringify(response.data.data))
        toast.success('Account created successfully', {
          description: 'You have been registered successfully.',
        })
        router.push('/') // Redirect to home or login page
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  //   login user function
  const loginUser = async (payload: TLoginFormData) => {
    setIsLoading(true)
    try {
      const response = await axiosPublic.post('/auth/login', payload)
      if (response.data.success) {
        // now set user in localStorage
        localStorage.setItem('authUser', JSON.stringify(response.data.data.user))
        toast.success('Login successful', {
          description: 'You have been logged in successfully.',
        })
        setUser(response.data.data.user)
        router.push('/dashboard')
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>
      if (err.response?.status === 401) {
        toast.error('Invalid email or password')
      } else {
        if (err.response?.data?.message) {
          toast.error(err.response.data.message)
        } else {
          toast.error('Login failed')
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  // reset user password function
  const resetUserPassword = async (payload: any) => {
    try {
      const response = await axiosPublic.post('/auth/reset-password', payload)
      if (response.data.success) {
        toast.success('Password reset successful', {
          description: 'Your password has been reset successfully.',
        })
        router.push('/')
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Password reset failed')
      }
    }
  }

  const logoutUser = () => {
    setUser(null)
    // clear token and remove user from localStorage
    axiosSecure
      .post('/auth/logout')
      .then(() => {
        localStorage.removeItem('authUser')
        router.push('/')
        toast.success('Logged out successfully', {
          description: 'You have been logged out.',
        })
      })
      .catch(error => {
        console.error('Logout error:', error)
        toast.error('Logout failed')
      })
  }

  const authInfo: AuthContextType = {
    user,
    isLoading,
    registerUser,
    loginUser,
    resetUserPassword,
    logoutUser,
  }
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
