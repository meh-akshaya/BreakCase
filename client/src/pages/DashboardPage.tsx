import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Problem } from '../types';
import { ProblemCard } from '../components/ProblemCard';
import { Terminal, AlertCircle, RefreshCw } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProblems = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.getProblems();
      setProblems(res.problems);
    } catch (err: any) {
      setError(err.message || 'Failed to load problems.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const solvedCount = problems.filter((p) => p.solved).length;
  const progressPercent = Math.round((solvedCount / (problems.length || 5)) * 100);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Dashboard Banner Header */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-sky-600 dark:text-sky-400 mb-2">
              <Terminal className="w-4 h-4" />
              <span>BREAKCASE PROBLEMS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              Find the Counterexample
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Inspect the suspicious C++ solution, analyze the logical flaw, and enter one input test case that makes it fail.
            </p>
          </div>

          {/* Progress Box */}
          <div className="w-full sm:w-64 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80">
            <div className="flex items-center justify-between text-xs font-mono font-semibold mb-2">
              <span className="text-slate-600 dark:text-slate-400">PROGRESS</span>
              <span className="text-sky-600 dark:text-sky-400 font-bold">
                {solvedCount} / {problems.length || 5} Solved
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <RefreshCw className="w-8 h-8 text-sky-500 animate-spin" />
            <p className="text-sm font-mono text-slate-500">Loading BreakCase challenges...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={fetchProblems}
              className="px-3 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-xs font-mono font-semibold"
            >
              Retry
            </button>
          </div>
        )}

        {/* Problem Cards Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
