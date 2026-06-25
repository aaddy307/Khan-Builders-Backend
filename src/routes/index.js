import { Router } from 'express';
import authRoutes from './authRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';
import propertyRoutes from './propertyRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import placeRoutes from './placeRoutes.js';
import contactRoutes from './contactRoutes.js';
import enquiryRoutes from './enquiryRoutes.js';
import publicRoutes from './publicRoutes.js';

const router = Router();

router.use('/admin/auth', authRoutes);
router.use('/admin/dashboard', dashboardRoutes);
router.use('/admin/properties', propertyRoutes);
router.use('/admin/categories', categoryRoutes);
router.use('/admin/places', placeRoutes);
router.use('/admin/contact', contactRoutes);
router.use('/admin/enquiries', enquiryRoutes);

router.use('/public', publicRoutes);

export default router;
