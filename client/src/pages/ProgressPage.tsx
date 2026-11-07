import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { UserProgressResponse } from '../types';
import { getCFRatingInfo, getDifficultyRating } from '../utils/codeforces';
import { CheckCircle2, Trophy, RefreshCw, AlertCircle, Award, Flame } from 'lucide-react';

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
      <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center space-y-3 bg-[#F8FAFC] dark:bg-[#141519] font-sans">
        <RefreshCw className="w-8 h-8 text-[#3B5998] dark:text-[#4F7CFF] animate-spin" />
        <p className="text-xs font-mono text-[#717171] dark:text-[#858A99]">Fetching Codeforces user progress...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center p-4 bg-[#F8FAFC] dark:bg-[#141519] font-sans">
        <div className="p-6 max-w-md w-full rounded cf-roundbox text-center space-y-4 shadow-sm bg-white dark:bg-[#1E1F26]">
          <AlertCircle className="w-10 h-10 text-[#B94A48] mx-auto" />
          <h2 className="text-lg font-bold text-[#3B5998] dark:text-[#4F7CFF]">Failed to Load Progress</h2>
          <p className="text-xs text-[#717171] dark:text-[#858A99]">{error || 'Unable to retrieve your progress statistics.'}</p>
          <button
            onClick={fetchProgress}
            className="px-4 py-1.5 rounded bg-[#3B5998] dark:bg-[#4F7CFF] text-white font-bold text-xs hover:bg-[#2E4577] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const percent = Math.round((data.solvedCount / data.totalProblems) * 100);
  const userRating = data.userRating || (1200 + data.solvedCount * 70);
  const ratingInfo = getCFRatingInfo(userRating);

  // Group solved by tiers
  const easySolved = data.progress.filter(p => p.solved && p.rating < 1200).length;
  const easyTotal = data.progress.filter(p => p.rating < 1200).length;
  const medSolved = data.progress.filter(p => p.solved && p.rating >= 1200 && p.rating < 1600).length;
  const medTotal = data.progress.filter(p => p.rating >= 1200 && p.rating < 1600).length;
  const hardSolved = data.progress.filter(p => p.solved && p.rating >= 1600).length;
  const hardTotal = data.progress.filter(p => p.rating >= 1600).length;

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-white dark:bg-[#141519] py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-5">
        
        {/* Header Summary Box */}
        <div className="cf-roundbox">
          <div className="caption">
            User Rating & Solved Statistics
          </div>
          <div className="content flex flex-col sm:flex-row items-center justify-between gap-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded bg-[#E1E1E1] dark:bg-[#292535] text-[#3B5998] dark:text-[#4F7CFF]">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#3B5998] dark:text-[#4F7CFF]">
                  Codeforces Progress & Submissions
                </h1>
                <p className="text-xs text-[#717171] dark:text-[#858A99] mt-0.5">
                  Current Rating Rank: <span className={`font-bold ${ratingInfo.className}`}>{ratingInfo.title}</span> ({userRating})
                </p>
              </div>
            </div>

            <div className="text-center sm:text-right">
              <div className="text-2xl font-bold font-mono" style={{ color: ratingInfo.color }}>
                {data.solvedCount} / {data.totalProblems}
              </div>
              <div className="text-[11px] font-mono text-[#717171] dark:text-[#858A99] uppercase tracking-wider mt-0.5">
                Solved ({percent}%)
              </div>
            </div>
          </div>
        </div>

        {/* Tier Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded border border-[#B9B9B9] dark:border-[#393443] bg-white dark:bg-[#1E1F26] flex items-center justify-between">
            <div>
              <div className="text-xs text-[#717171] font-bold uppercase font-mono">Easy (*800-*1100)</div>
              <div className="text-base font-bold text-[#808080] font-mono mt-0.5">{easySolved} / {easyTotal} Solved</div>
            </div>
            <Award className="w-6 h-6 text-[#808080]" />
          </div>

          <div className="p-3 rounded border border-[#B9B9B9] dark:border-[#393443] bg-white dark:bg-[#1E1F26] flex items-center justify-between">
            <div>
              <div className="text-xs text-[#717171] font-bold uppercase font-mono">Medium (*1200-*1500)</div>
              <div className="text-base font-bold text-[#008000] font-mono mt-0.5">{medSolved} / {medTotal} Solved</div>
            </div>
            <Flame className="w-6 h-6 text-[#008000]" />
          </div>

          <div className="p-3 rounded border border-[#B9B9B9] dark:border-[#393443] bg-white dark:bg-[#1E1F26] flex items-center justify-between">
            <div>
              <div className="text-xs text-[#717171] font-bold uppercase font-mono">Hard (*1600-*2100)</div>
              <div className="text-base font-bold text-[#0000FF] dark:text-[#4F7CFF] font-mono mt-0.5">{hardSolved} / {hardTotal} Solved</div>
            </div>
            <Trophy className="w-6 h-6 text-[#0000FF] dark:text-[#4F7CFF]" />
          </div>
        </div>

        {/* Progress List Table */}
        <div className="cf-roundbox">
          <div className="caption">
            Problem Solved Checklist (20 Problems)
          </div>
          <div className="overflow-x-auto">
            <table className="cf-table">
              <thead>
                <tr>
                  <th className="w-12 text-center">#</th>
                  <th>Problem Title & Bug Pattern</th>
                  <th className="w-28 text-center">Rating</th>
                  <th className="w-28 text-center">Status</th>
                  <th className="w-24 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.progress.map((item) => {
                  const formattedId = String(item.problemNumber).padStart(2, '0');
                  const diffInfo = getDifficultyRating(item.difficulty, item.rating);
                  return (
                    <tr key={item.id} className={item.solved ? 'bg-[#E6F4ED]/40 dark:bg-[#1E3A2B]/20' : ''}>
                      <td className="text-center font-bold font-mono text-[#3B5998] dark:text-[#4F7CFF]">
                        {formattedId}
                      </td>
                      <td>
                        <Link
                          to={`/problems/${item.slug}`}
                          className="font-bold text-[#3B5998] dark:text-[#4F7CFF] hover:underline text-sm block"
                        >
                          {item.title}
                        </Link>
                        {item.pattern && (
                          <span className="text-[10px] text-[#717171] dark:text-[#858A99] font-mono">
                            ⚡ {item.pattern}
                          </span>
                        )}
                      </td>
                      <td className="text-center">
                        <span className="text-xs px-2 py-0.5 rounded border border-current font-mono font-bold" style={{ color: diffInfo.color }}>
                          *{diffInfo.rating}
                        </span>
                      </td>
                      <td className="text-center font-bold text-xs">
                        {item.solved ? (
                          <span className="text-[#008000] dark:text-[#4CAF50] inline-flex items-center">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            Solved
                          </span>
                        ) : (
                          <span className="text-[#717171] font-normal">Unsolved</span>
                        )}
                      </td>
                      <td className="text-center">
                        <Link
                          to={`/problems/${item.slug}`}
                          className="px-2.5 py-1 text-xs bg-[#3B5998] dark:bg-[#4F7CFF] hover:bg-[#2E4577] text-white rounded font-bold transition-colors inline-block"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProgressPage;
