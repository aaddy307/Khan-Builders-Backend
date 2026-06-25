import dotenv from 'dotenv';

dotenv.config();

const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',

  mongodbUri: process.env.MONGODB_URI,

  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenExpires: process.env.ACCESS_TOKEN_EXPIRES || '15m',
  refreshTokenExpires: process.env.REFRESH_TOKEN_EXPIRES || '7d',

  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,

  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

  defaultAdminEmail: process.env.DEFAULT_ADMIN_EMAIL || 'admin@khanbd.com',
  defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD || 'admin123',
};

export default env;
