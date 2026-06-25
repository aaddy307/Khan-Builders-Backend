import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import env from '../config/env.js';
import ApiError from '../utils/ApiError.js';

const generateAccessToken = (adminId) => {
  return jwt.sign({ id: adminId }, env.accessTokenSecret, {
    expiresIn: env.accessTokenExpires,
  });
};

const generateRefreshToken = (adminId) => {
  return jwt.sign({ id: adminId }, env.refreshTokenSecret, {
    expiresIn: env.refreshTokenExpires,
  });
};

export const login = async (email, password) => {
  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const accessToken = generateAccessToken(admin._id);
  const refreshToken = generateRefreshToken(admin._id);

  return {
    admin: { id: admin._id, name: admin.name, email: admin.email },
    accessToken,
    refreshToken,
  };
};

export const refreshAccessToken = async (token) => {
  try {
    const decoded = jwt.verify(token, env.refreshTokenSecret);
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      throw new ApiError(401, 'Admin not found');
    }

    const accessToken = generateAccessToken(admin._id);
    return accessToken;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(401, 'Invalid refresh token');
  }
};
