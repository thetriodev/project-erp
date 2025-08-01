import { asyncHandler } from 'app/utils/asyncHandler'
import { httpStatusCode } from 'app/utils/enum/statusCode'
import sendResponse from 'app/utils/sendResponse'
import { NextFunction, Request, Response } from 'express'

import { AuthService } from './auth.service'

// * Register a new user
const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const result = await AuthService.registerUser(req.body)
  sendResponse(res, {
    statusCode: httpStatusCode.CREATED,
    success: true,
    message: 'Registration successful.',
    data: result,
  })
  next()
}

// * Login an existing user
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const result = await AuthService.loginUser(req.body)
  //  set token in cookie
  // Note: In production, set secure to true and use HTTPS

  res.cookie('token', result.token, { httpOnly: true, secure: false, sameSite: 'strict' })
  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    success: true,
    message: 'Login successful.',
    data: result,
  })
  next()
}

// logout function to clear the token cookie
const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req?.cookies?.token
  if (!token) {
    return next(new Error('You are not logged in! Please log in to get access.'))
  }
  // Clear the token cookie
  res.clearCookie('token')
  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    success: true,
    message: 'Logout successful.',
  })
  next()
}

// * Update user profile (Accessible to manager and user)
const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user
  const { userId: id } = user
  const result = await AuthService.updateProfile(id, req.body)
  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    success: true,
    message: 'User profile updated successfully.',
    data: result,
  })
  next()
}

// * Update user password (Accessible to manager and user))
const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user
  const { userId: id } = user
  const result = await AuthService.updatePassword(id, req.body)
  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    success: true,
    message: 'Password updated successfully.',
    data: result,
  })
  next()
}

// * Update user delete status (Accessible to manager and user)
const updateDeletedStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const result = await AuthService.updateDeletedStatus(id)
  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    success: true,
    message: 'User deactivated successfully.',
    data: result,
  })
  next()
}

// * Retrieve all users (Admin only)
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const result = await AuthService.getAllUsers(req.query)
  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    success: true,
    message: 'Users retrieved successfully.',
    data: result,
  })
  next()
}

// * Update user role (Admin only)
const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const result = await AuthService.updateRole(id, req.body)
  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    success: true,
    message: 'User role updated successfully.',
    data: result,
  })
  next()
}

// update user active status (Admin only)

// * Update user active status (Admin only)
const updateActiveStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const result = await AuthService.updateActiveStatus(id)
  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    success: true,
    message: 'User status updated successfully.',
    data: result,
  })
  next()
}

export const AuthController = {
  registerUser: asyncHandler(registerUser),
  loginUser: asyncHandler(loginUser),
  updateProfile: asyncHandler(updateProfile),
  updatePassword: asyncHandler(updatePassword),
  updateDeletedStatus: asyncHandler(updateDeletedStatus),
  getAllUsers: asyncHandler(getAllUsers),
  updateRole: asyncHandler(updateRole),
  updateActiveStatus: asyncHandler(updateActiveStatus),
  logoutUser: asyncHandler(logoutUser),
}
