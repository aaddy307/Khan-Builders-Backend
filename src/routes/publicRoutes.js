import { Router } from 'express';
import * as publicController from '../controllers/publicController.js';
import { createEnquiryValidator } from '../validators/enquiryValidator.js';

const router = Router();

router.get('/properties', publicController.getProperties);
router.get('/properties/featured', publicController.getFeaturedProperties);
router.get('/properties/:slug', publicController.getPropertyBySlug);
router.get('/categories', publicController.getCategories);
router.get('/places', publicController.getPlaces);
router.get('/contact', publicController.getContact);
router.post('/enquiries', createEnquiryValidator, publicController.createEnquiry);

export default router;
