import { Router } from 'express';
import { login, refresh, logout, getMe } from '../controllers/authController.js';
import authenticate from '../middleware/auth.js';
import { loginValidator } from '../validators/authValidator.js';

const router = Router();

router.post('/login', loginValidator, login);
router.post('/refresh', refresh);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);

export default router;
