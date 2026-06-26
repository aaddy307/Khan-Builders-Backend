import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { login as loginService, refreshAccessToken } from '../services/authService.js';
import env from '../config/env.js';

const cookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === 'production',
  sameSite: env.nodeEnv === 'production' ? 'none' : 'lax',
};

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const data = await loginService(email, password);

  res.cookie('accessToken', data.accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie('refreshToken', data.refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/api/admin/auth',
  });

  res.status(200).json(
    new ApiResponse(200, 'Login successful', {
      admin: data.admin,
      accessToken: data.accessToken,
    })
  );
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No refresh token',
    });
  }

  const accessToken = await refreshAccessToken(token);

  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  res.status(200).json(
    new ApiResponse(200, 'Token refreshed', { accessToken })
  );
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken', { path: '/api/admin/auth' });

  res.status(200).json(
    new ApiResponse(200, 'Logged out successfully')
  );
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, 'Admin profile', req.admin)
  );
});
