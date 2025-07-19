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
  const [isLoading, setIsLoading] = useState(true)
  const axiosPublic = useAxiosPublic()
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
        localStorage.setItem('authUser', JSON.stringify(response.data.data))
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
      // now set user in localStorage
      // localStorage.setItem('authUser', JSON.stringify(response.data.data))
      
      if (response.data.success) {
        toast.success('Login successful', {
          description: 'You have been logged in successfully.',
        })
        setUser(response.data.data)
        router.push('/dashboard')
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error('Invalid email or password')
      } else {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message)
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
  // const login = async (email: string, password: string) => {
  //   setIsLoading(true)
  //   try {
  //     const response = await axiosPublic.post("/auth/login", { email, password })
  //     if (response.data.success && response.data.user) {
  //       const loggedInUser: User = response.data.user
  //       setUser(loggedInUser)
  //       localStorage.setItem("authUser", JSON.stringify(loggedInUser))
  //       router.push("/dashboard")
  //     } else {
  //       throw new Error("Invalid login response")
  //     }
  //   } catch (error: any) {
  //     console.error("Login error:", error)
  //     throw error // let the caller handle toast
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // const register = async (name: string, email: string, password: string) => {
  //   setIsLoading(true)
  //   try {
  //     const response = await axiosPublic.post("/auth/register", { name, email, password })
  //     if (response.data.success && response.data.user) {
  //       const newUser: User = response.data.user
  //       setUser(newUser)
  //       localStorage.setItem("authUser", JSON.stringify(newUser))
  //       router.push("/dashboard")
  //     } else {
  //       throw new Error("Invalid registration response")
  //     }
  //   } catch (error: any) {
  //     console.error("Registration error:", error)
  //     throw error // let the caller handle toast
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // const logout = () => {
  //   setUser(null)
  //   localStorage.removeItem("authUser")
  //   router.push("/")
  // }

  const logoutUser = () => {
    setUser(null)
    localStorage.removeItem('authUser')
    router.push('/')
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
