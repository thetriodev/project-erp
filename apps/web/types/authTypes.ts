// This file defines types for authentication-related data structures used in the application.

// Registration form data type
export type TRegistrationFormData = {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

// Login form data type
export type TLoginFormData = {
  email: string
  password: string
}

// user type
export type TUser = {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'user'
}


// Reset password form data type
export type TResetPasswordFormData = {
  email: string
  newPassword: string
  confirmNewPassword: string
}