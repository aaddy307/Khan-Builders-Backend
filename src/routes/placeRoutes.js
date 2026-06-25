import { Router } from 'express';
import * as placeController from '../controllers/placeController.js';
import authenticate from '../middleware/auth.js';
import {
  createPlaceValidator,
  updatePlaceValidator,
} from '../validators/placeValidator.js';

const router = Router();

router.use(authenticate);

router.get('/', placeController.getAll);
router.get('/all', placeController.getAllList);
router.get('/:id', placeController.getById);
router.post('/', createPlaceValidator, placeController.create);
router.put('/:id', updatePlaceValidator, placeController.update);
router.delete('/:id', placeController.remove);

export default router;
