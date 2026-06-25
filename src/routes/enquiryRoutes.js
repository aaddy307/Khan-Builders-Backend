import { Router } from 'express';
import * as enquiryController from '../controllers/enquiryController.js';
import authenticate from '../middleware/auth.js';
import { updateEnquiryValidator } from '../validators/enquiryValidator.js';

const router = Router();

router.use(authenticate);

router.get('/', enquiryController.getAll);
router.get('/:id', enquiryController.getById);
router.put('/:id', updateEnquiryValidator, enquiryController.update);
router.delete('/:id', enquiryController.remove);

export default router;
