'use client'

import axios from 'axios'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Important: send cookies (httpOnly JWT)
})

const useAxiosSecure = () => {
  const router = useRouter()

  useEffect(() => {
    // Request interceptor (optional logging)
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        // You can log request here
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status

        // Handle 401 Unauthorized globally
        if (status === 401) {
          console.error('Unauthorized. Redirecting to login...')
        //logout user or redirect to login page
          router.push('/login')
        }

        // Handle 403 Forbidden
        if (status === 403) {
          console.error('Access denied.')
        }

        return Promise.reject(error)
      }
    )

    // Cleanup interceptors on component unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor)
      axiosSecure.interceptors.response.eject(responseInterceptor)
    }
  }, [router])

  return axiosSecure
}

export default useAxiosSecure
