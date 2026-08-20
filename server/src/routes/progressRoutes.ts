import { Router } from 'express';
import { ProgressController } from '../controllers/progressController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateToken, ProgressController.getUserProgress);

export default router;
