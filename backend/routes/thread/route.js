import { Router } from 'express'

import { authenticateToken } from '../../middleware/auth.js'
import handler from '../../handlers/thread/handler.js'

const router = new Router();

router.post('/thread', authenticateToken, handler.createThread);
router.get('/thread/:id', authenticateToken, handler.getThread);
router.get('/threads', authenticateToken, handler.getThreads);
router.put('/thread', authenticateToken, handler.updateThread);
router.put('/visibility-thread', authenticateToken, handler.setVisibilityThread);
router.get('/tags', authenticateToken, handler.getTags);

export default router
