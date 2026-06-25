import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js';
import authenticate from '../middleware/auth.js';
import {
  createCategoryValidator,
  updateCategoryValidator,
} from '../validators/categoryValidator.js';

const router = Router();

router.use(authenticate);

router.get('/', categoryController.getAll);
router.get('/all', categoryController.getAllList);
router.get('/:id', categoryController.getById);
router.post('/', createCategoryValidator, categoryController.create);
router.put('/:id', updateCategoryValidator, categoryController.update);
router.delete('/:id', categoryController.remove);

export default router;
