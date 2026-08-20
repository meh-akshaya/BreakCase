import { Router } from 'express';
import { ProblemController } from '../controllers/problemController';
import { optionalAuth } from '../middleware/authMiddleware';

const router = Router();

router.get('/', optionalAuth, ProblemController.getAllProblems);
router.get('/:slug', optionalAuth, ProblemController.getProblemBySlug);
router.post('/:id/test', optionalAuth, ProblemController.testCounterexample);

export default router;
