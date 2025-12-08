import { Router } from 'express'

import { authenticateToken } from '../../middleware/auth.js'
import handler from '../../handlers/user/handler.js'

const router = new Router();

router.post('/register', handler.createUser);
router.post('/login', handler.loginUser);
router.post('/rate-tread', handler.rateTread);
router.post('/rate-comment', handler.rateComment);

export default router
