import { Router } from 'express';
import * as propertyController from '../controllers/propertyController.js';
import authenticate from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import {
  createPropertyValidator,
  updatePropertyValidator,
} from '../validators/propertyValidator.js';

const router = Router();

router.use(authenticate);

router.get('/', propertyController.getAll);
router.get('/:id', propertyController.getById);
router.post('/', createPropertyValidator, propertyController.create);
router.put('/:id', updatePropertyValidator, propertyController.update);
router.delete('/:id', propertyController.remove);
router.patch('/:id/toggle-featured', propertyController.toggleFeatured);
router.post('/upload-image', upload.single('image'), propertyController.uploadImage);

export default router;
