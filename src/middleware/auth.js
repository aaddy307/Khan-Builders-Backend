import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import env from '../config/env.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  } else if (
    req.headers.authorization?.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, env.accessTokenSecret);
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      throw new ApiError(401, 'Admin not found');
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(401, 'Invalid or expired token');
  }
});

export default authenticate;
