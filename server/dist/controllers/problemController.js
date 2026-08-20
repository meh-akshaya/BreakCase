"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemController = void 0;
const db_1 = require("../db");
const validationService_1 = require("../services/validationService");
const executionService_1 = require("../services/executionService");
class ProblemController {
    /**
     * GET /api/problems
     * Fetch all 5 problems with solved status if user is logged in
     */
    static async getAllProblems(req, res) {
        try {
            const problems = await db_1.prisma.problem.findMany({
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
            let solvedMap = {};
            if (req.user) {
                const userProgress = await db_1.prisma.progress.findMany({
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
        }
        catch (err) {
            console.error('Error fetching problems:', err);
            res.status(500).json({ error: 'Failed to retrieve problems.' });
        }
    }
    /**
     * GET /api/problems/:slug
     * Fetch details of a single problem by slug (excludes referenceSolution)
     */
    static async getProblemBySlug(req, res) {
        try {
            const slug = req.params.slug;
            const problem = await db_1.prisma.problem.findUnique({
                where: { slug }
            });
            if (!problem) {
                res.status(404).json({ error: 'Problem not found.' });
                return;
            }
            let solved = false;
            if (req.user) {
                const progress = await db_1.prisma.progress.findUnique({
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
        }
        catch (err) {
            console.error('Error fetching problem details:', err);
            res.status(500).json({ error: 'Failed to retrieve problem details.' });
        }
    }
    /**
     * POST /api/problems/:id/test
     * Main BreakCase endpoint: Test counterexample against buggy C++ solution & reference C++ solution
     */
    static async testCounterexample(req, res) {
        try {
            const id = req.params.id;
            const { input } = req.body;
            if (typeof input !== 'string') {
                res.status(400).json({ error: 'Input must be a valid string.' });
                return;
            }
            const problem = await db_1.prisma.problem.findUnique({
                where: { id }
            });
            if (!problem) {
                res.status(404).json({ error: 'Problem not found.' });
                return;
            }
            // Step 1: Validate input constraints & format
            const validation = validationService_1.ValidationService.validateInput(problem.problemNumber, input);
            if (!validation.valid) {
                // Record invalid attempt if user is authenticated
                if (req.user) {
                    await db_1.prisma.submission.create({
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
            const result = await executionService_1.ExecutionService.runCounterexampleTest(problem.id, problem.buggySolution, problem.referenceSolution, input);
            // Step 3: Store submission in DB if logged in
            if (req.user) {
                await db_1.prisma.submission.create({
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
                    await db_1.prisma.progress.upsert({
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
            }
            else {
                res.json({
                    valid: true,
                    broken: false,
                    actualOutput: result.buggyOutput,
                    message: '✗ Not a Counterexample. The provided solution produced the correct answer for this input.',
                });
            }
        }
        catch (err) {
            console.error('Error executing counterexample test:', err);
            res.status(500).json({ error: `Execution error: ${err.message || 'Server error'}` });
        }
    }
}
exports.ProblemController = ProblemController;
