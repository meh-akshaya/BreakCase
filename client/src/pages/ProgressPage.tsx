import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { UserProgressResponse } from '../types';
import { CheckCircle2, Circle, Trophy, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const [data, setData] = useState<UserProgressResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProgress = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.getProgress();
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Failed to load progress.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center space-y-3 bg-slate-50 dark:bg-slate-950">
        <RefreshCw className="w-8 h-8 text-sky-500 animate-spin" />
        <p className="text-sm font-mono text-slate-500">Fetching user progress...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
        <div className="p-6 max-w-md w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-xl">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Failed to Load Progress</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">{error || 'Unable to retrieve your progress statistics.'}</p>
          <button
            onClick={fetchProgress}
            className="px-4 py-2 rounded-lg bg-sky-600 text-white font-medium text-sm hover:bg-sky-500 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const percent = Math.round((data.solvedCount / data.totalProblems) * 100);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Summary Box */}
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-sky-500/20 text-amber-500 border border-amber-500/30">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                Your BreakCase Progress
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                Keep testing edge cases to break all 5 competitive programming solutions.
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <div className="text-3xl font-extrabold text-sky-600 dark:text-sky-400 font-mono">
              {data.solvedCount} / {data.totalProblems}
            </div>
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mt-1">
              Problems Solved ({percent}%)
            </div>
          </div>
        </div>

        {/* Progress List */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400">
            <span>Problem</span>
            <span>Difficulty & Status</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {data.progress.map((item) => {
              const formattedId = String(item.problemNumber).padStart(2, '0');
              return (
                <Link
                  key={item.id}
                  to={`/problems/${item.slug}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                >
                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-sm font-bold text-slate-400 dark:text-slate-500">
                      {formattedId}
                    </span>
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {item.title}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {item.difficulty}
                    </span>

                    {item.solved ? (
                      <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Solved</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                        <Circle className="w-4 h-4 text-slate-400" />
                        <span>Unsolved</span>
                      </span>
                    )}

                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
