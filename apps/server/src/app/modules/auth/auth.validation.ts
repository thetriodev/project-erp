import { z } from 'zod'

const registerUserZodSchema = z.object({
  body: z.object({
    // * Name must be at least 5 characters
    name: z
      .string({ required_error: 'Name is required' })
      .min(2, { message: 'Name must be at least 2 characters' }),
    // * Must be a valid email address
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    // * Phone number is required (you can adjust the min length as needed)
    phone: z
      .string({ required_error: 'Phone number is required' })
      .min(10, { message: 'Phone number must be at least 10 characters' }),
    // * Password must be between 6 and 20 characters
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(50, { message: 'Password must be at most 50 characters' }),
    // role will be default to user
    role: z.enum(['user', 'admin', 'manager'], { required_error: 'Role is required' }).default('user'),
  }),
})

const updateProfileZodSchema = z.object({
  body: z.object({
    // * Name must be at least 5 characters
    name: z
      .string({ required_error: 'Name is required' })
      .min(2, { message: 'Name must be at least 2 characters' }),
    // * Must be a valid email address
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    // * Phone number is required for profile update as well
    phone: z
      .string({ required_error: 'Phone number is required' })
      .min(10, { message: 'Phone number must be at least 10 characters' }),
  }),
})

export const AuthValidation = {
  registerUserZodSchema,
  updateProfileZodSchema,
}
