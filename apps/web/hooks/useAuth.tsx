import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { RegistrationFormData } from '@/components/auth/registration-form'
import useAxiosPublic from './useAxiosPublic'
import { loginFormData } from '@/components/auth/login-form'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const axiosPublic = useAxiosPublic()
  const router = useRouter()

  //   register user function
  const registerUser = async (payload: RegistrationFormData) => {
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

//   login user function
  const loginUser = async (payload: loginFormData) => {
    try {
      const response = await axiosPublic.post('/auth/login', payload)
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

  return { registerUser, loginUser, resetUserPassword, isLoading, user }
}

