import { Response } from 'express';
import { prisma } from '../db';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export class ProgressController {
  static async getUserProgress(req: AuthenticatedRequest, res: Response): Promise<void> {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required.' });
      return;
    }

    try {
      const allProblems = await prisma.problem.findMany({
        orderBy: { problemNumber: 'asc' },
        select: {
          id: true,
          problemNumber: true,
          title: true,
          slug: true,
          difficulty: true,
          rating: true,
          pattern: true,
        }
      });

      const userProgress = await prisma.progress.findMany({
        where: { userId: req.user.id }
      });

      const solvedMap: Record<string, boolean> = {};
      let solvedCount = 0;
      let totalRatingScore = 0;

      userProgress.forEach((p) => {
        if (p.solved) {
          solvedMap[p.problemId] = true;
          solvedCount++;
        }
      });

      const problemsProgress = allProblems.map((prob) => {
        const isSolved = !!solvedMap[prob.id];
        if (isSolved) {
          totalRatingScore += Math.round((prob.rating || 1000) * 0.06);
        }
        return {
          id: prob.id,
          problemNumber: prob.problemNumber,
          title: prob.title,
          slug: prob.slug,
          difficulty: prob.difficulty,
          rating: prob.rating || 1000,
          pattern: prob.pattern,
          solved: isSolved,
        };
      });

      const userRating = 1200 + totalRatingScore;

      res.json({
        totalProblems: allProblems.length,
        solvedCount,
        userRating,
        progress: problemsProgress,
      });
    } catch (err: any) {
      console.error('Error fetching progress:', err);
      res.status(500).json({ error: 'Failed to retrieve user progress.' });
    }
  }
}
