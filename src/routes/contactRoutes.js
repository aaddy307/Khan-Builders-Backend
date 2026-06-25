import { Router } from 'express';
import { getContact, updateContact } from '../controllers/contactController.js';
import authenticate from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', getContact);
router.put('/', updateContact);

export default router;
