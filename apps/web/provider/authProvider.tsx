"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import useAxiosPublic from "@/hooks/useAxiosPublic"

type User = {
  id: string
  name: string
  email: string
  role: "owner" | "manager" | "user"
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const axiosPublic = useAxiosPublic()
  const router = useRouter()

  useEffect(() => {
    // Load user from localStorage or cookies on app load
    const loadUser = async () => {
      setIsLoading(true)
      try {
        const storedUser = localStorage.getItem("authUser")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Failed to load user", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await axiosPublic.post("/auth/login", { email, password })
      if (response.data.success && response.data.user) {
        const loggedInUser: User = response.data.user
        setUser(loggedInUser)
        localStorage.setItem("authUser", JSON.stringify(loggedInUser))
        router.push("/dashboard")
      } else {
        throw new Error("Invalid login response")
      }
    } catch (error: any) {
      console.error("Login error:", error)
      throw error // let the caller handle toast
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await axiosPublic.post("/auth/register", { name, email, password })
      if (response.data.success && response.data.user) {
        const newUser: User = response.data.user
        setUser(newUser)
        localStorage.setItem("authUser", JSON.stringify(newUser))
        router.push("/dashboard")
      } else {
        throw new Error("Invalid registration response")
      }
    } catch (error: any) {
      console.error("Registration error:", error)
      throw error // let the caller handle toast
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("authUser")
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
