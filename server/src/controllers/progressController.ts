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
        }
      });

      const userProgress = await prisma.progress.findMany({
        where: { userId: req.user.id }
      });

      const solvedMap: Record<string, boolean> = {};
      let solvedCount = 0;

      userProgress.forEach((p) => {
        if (p.solved) {
          solvedMap[p.problemId] = true;
          solvedCount++;
        }
      });

      const problemsProgress = allProblems.map((prob) => ({
        id: prob.id,
        problemNumber: prob.problemNumber,
        title: prob.title,
        slug: prob.slug,
        difficulty: prob.difficulty,
        solved: !!solvedMap[prob.id],
      }));

      res.json({
        totalProblems: allProblems.length,
        solvedCount,
        progress: problemsProgress,
      });
    } catch (err: any) {
      console.error('Error fetching progress:', err);
      res.status(500).json({ error: 'Failed to retrieve user progress.' });
    }
  }
}
