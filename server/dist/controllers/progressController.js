"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressController = void 0;
const db_1 = require("../db");
class ProgressController {
    static async getUserProgress(req, res) {
        if (!req.user) {
            res.status(401).json({ error: 'Authentication required.' });
            return;
        }
        try {
            const allProblems = await db_1.prisma.problem.findMany({
                orderBy: { problemNumber: 'asc' },
                select: {
                    id: true,
                    problemNumber: true,
                    title: true,
                    slug: true,
                    difficulty: true,
                }
            });
            const userProgress = await db_1.prisma.progress.findMany({
                where: { userId: req.user.id }
            });
            const solvedMap = {};
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
        }
        catch (err) {
            console.error('Error fetching progress:', err);
            res.status(500).json({ error: 'Failed to retrieve user progress.' });
        }
    }
}
exports.ProgressController = ProgressController;
