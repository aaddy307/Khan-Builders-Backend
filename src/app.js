import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import env from './config/env.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';

cloudinary.config({
  cloud_name: env.cloudinaryCloudName,
  api_key: env.cloudinaryApiKey,
  api_secret: env.cloudinaryApiSecret,
});

const app = express();

app.use(cors({
  origin: env.frontendUrl,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Khan BD API is running' });
});

app.use('/api', routes);

app.use(errorHandler);

export default app;
