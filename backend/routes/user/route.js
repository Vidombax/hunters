import { Router } from 'express'

import { authenticateToken } from '../../middleware/auth.js'
import handler from '../../handlers/user/handler.js'

const router = new Router();

router.post('/register', handler.createUser);
router.post('/login', handler.loginUser);
router.post('/create-comment', authenticateToken, handler.createComment);
router.post('/rate-tread', authenticateToken, handler.rateTread);
router.post('/rate-comment', authenticateToken, handler.rateComment);

export default router
