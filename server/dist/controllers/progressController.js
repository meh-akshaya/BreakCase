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
                    rating: true,
                    pattern: true,
                }
            });
            const userProgress = await db_1.prisma.progress.findMany({
                where: { userId: req.user.id }
            });
            const solvedMap = {};
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
        }
        catch (err) {
            console.error('Error fetching progress:', err);
            res.status(500).json({ error: 'Failed to retrieve user progress.' });
        }
    }
}
exports.ProgressController = ProgressController;
