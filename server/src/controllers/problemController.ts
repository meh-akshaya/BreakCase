import { Response } from 'express';
import { prisma } from '../db';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { ValidationService } from '../services/validationService';
import { ExecutionService } from '../services/executionService';

export class ProblemController {
  /**
   * GET /api/problems
   * Fetch all 5 problems with solved status if user is logged in
   */
  static async getAllProblems(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const problems = await prisma.problem.findMany({
        orderBy: { problemNumber: 'asc' },
        select: {
          id: true,
          problemNumber: true,
          title: true,
          slug: true,
          difficulty: true,
          tags: true,
          shortDescription: true,
          language: true,
        }
      });

      let solvedMap: Record<string, boolean> = {};

      if (req.user) {
        const userProgress = await prisma.progress.findMany({
          where: { userId: req.user.id }
        });
        userProgress.forEach((p) => {
          solvedMap[p.problemId] = p.solved;
        });
      }

      const formatted = problems.map((prob) => ({
        ...prob,
        tags: prob.tags ? prob.tags.split(',').map((t) => t.trim()) : [],
        solved: !!solvedMap[prob.id],
      }));

      res.json({ problems: formatted });
    } catch (err: any) {
      console.error('Error fetching problems:', err);
      res.status(500).json({ error: 'Failed to retrieve problems.' });
    }
  }

  /**
   * GET /api/problems/:slug
   * Fetch details of a single problem by slug (excludes referenceSolution)
   */
  static async getProblemBySlug(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const slug = req.params.slug as string;

      const problem = await prisma.problem.findUnique({
        where: { slug }
      });

      if (!problem) {
        res.status(404).json({ error: 'Problem not found.' });
        return;
      }

      let solved = false;
      if (req.user) {
        const progress = await prisma.progress.findUnique({
          where: {
            userId_problemId: {
              userId: req.user.id,
              problemId: problem.id,
            }
          }
        });
        solved = progress?.solved || false;
      }

      // Hide secret reference solution from client
      const { referenceSolution, ...safeProblem } = problem;

      res.json({
        problem: {
          ...safeProblem,
          tags: safeProblem.tags ? safeProblem.tags.split(',').map((t) => t.trim()) : [],
          solved,
        }
      });
    } catch (err: any) {
      console.error('Error fetching problem details:', err);
      res.status(500).json({ error: 'Failed to retrieve problem details.' });
    }
  }

  /**
   * POST /api/problems/:id/test
   * Main BreakCase endpoint: Test counterexample against buggy C++ solution & reference C++ solution
   */
  static async testCounterexample(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const { input } = req.body;

      if (typeof input !== 'string') {
        res.status(400).json({ error: 'Input must be a valid string.' });
        return;
      }

      const problem = await prisma.problem.findUnique({
        where: { id }
      });

      if (!problem) {
        res.status(404).json({ error: 'Problem not found.' });
        return;
      }

      // Step 1: Validate input constraints & format
      const validation = ValidationService.validateInput(problem.problemNumber, input);
      if (!validation.valid) {
        // Record invalid attempt if user is authenticated
        if (req.user) {
          await prisma.submission.create({
            data: {
              userId: req.user.id,
              problemId: problem.id,
              input,
              isValidInput: false,
              isCounterexample: false,
              statusMessage: validation.message || 'Invalid input format/constraints',
            }
          });
        }

        res.status(400).json({
          valid: false,
          broken: false,
          message: validation.message || 'Invalid test case. Your input violates problem constraints.',
        });
        return;
      }

      // Step 2: Compile & Execute Buggy and Reference C++ solutions
      const result = await ExecutionService.runCounterexampleTest(
        problem.id,
        problem.buggySolution,
        problem.referenceSolution,
        input
      );

      // Step 3: Store submission in DB if logged in
      if (req.user) {
        await prisma.submission.create({
          data: {
            userId: req.user.id,
            problemId: problem.id,
            input,
            buggyOutput: result.buggyOutput,
            expectedOutput: result.expectedOutput,
            isValidInput: true,
            isCounterexample: result.isCounterexample,
            statusMessage: result.isCounterexample
              ? 'Counterexample found! Solution broken.'
              : 'Not a counterexample. Solution produced expected answer.',
          }
        });

        // Step 4: If counterexample breaks solution, update Progress to solved!
        if (result.isCounterexample) {
          await prisma.progress.upsert({
            where: {
              userId_problemId: {
                userId: req.user.id,
                problemId: problem.id,
              }
            },
            update: {
              solved: true,
              solvedAt: new Date(),
            },
            create: {
              userId: req.user.id,
              problemId: problem.id,
              solved: true,
              solvedAt: new Date(),
            }
          });
        }
      }

      // Step 5: Return response to client
      if (result.isCounterexample) {
        res.json({
          valid: true,
          broken: true,
          expectedOutput: result.expectedOutput,
          actualOutput: result.buggyOutput,
          message: '✓ Counterexample Found! You broke the solution.',
        });
      } else {
        res.json({
          valid: true,
          broken: false,
          actualOutput: result.buggyOutput,
          message: '✗ Not a Counterexample. The provided solution produced the correct answer for this input.',
        });
      }
    } catch (err: any) {
      console.error('Error executing counterexample test:', err);
      res.status(500).json({ error: `Execution error: ${err.message || 'Server error'}` });
    }
  }
}
