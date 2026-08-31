import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import type { Problem } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  Send,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
  Circle,
  Trophy,
  ChevronRight,
  User as UserIcon,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');

  // Search parameter handle
  const searchParams = new URLSearchParams(location.search);
  const searchFilter = searchParams.get('search') || '';

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
  const totalCount = problems.length || 5;
  const userRating = 1200 + solvedCount * 150;

  const filteredProblems = problems.filter((p) => {
    const matchesSearch = searchFilter
      ? p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase()))
      : true;

    if (selectedTag === 'ALL') return matchesSearch;
    if (selectedTag === 'SOLVED') return matchesSearch && p.solved;
    if (selectedTag === 'UNSOLVED') return matchesSearch && !p.solved;
    return matchesSearch && p.difficulty.toUpperCase().includes(selectedTag);
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white dark:bg-zinc-950 text-black dark:text-zinc-100 py-4 px-3 sm:px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Notice Alert Banner (Light Blue in Light mode / Yellow in Dark mode) */}
        <div className="p-3 rounded border border-blue-200 dark:border-yellow-500/40 bg-[#e8f4fc] dark:bg-yellow-950/20 text-slate-900 dark:text-yellow-400 text-xs flex items-center justify-between shadow-2xs">
          <div className="flex items-center space-x-2">
            <Send className="w-4 h-4 text-[#1a5ab8] dark:text-yellow-400 shrink-0" />
            <span>
              Welcome to <strong>BreakCase Platform</strong>! Please review suspicious C++ solutions and find one valid input to break them.{' '}
              <a
                href="#practice-round"
                className="underline text-[#1a5ab8] dark:text-yellow-400 hover:opacity-80 font-bold"
              >
                Join official BreakCase discussion
              </a>.
            </span>
          </div>
          <span className="text-[10px] opacity-80 cursor-pointer font-bold text-black dark:text-yellow-400">✕</span>
        </div>

        {/* Main 2-Column Grid Layout (Left: Content & Problems Table, Right: Sidebars) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          
          {/* ================= LEFT MAIN CONTENT AREA (3 COLS / 75%) ================= */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Contest Announcement Banner Card */}
            <div className="p-5 rounded border border-gray-300 dark:border-yellow-500/30 bg-[#f8fafc] dark:bg-zinc-900 shadow-2xs space-y-3" id="practice-round">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-yellow-500/20 pb-2">
                <h1 className="text-xl font-extrabold text-[#1a5ab8] dark:text-yellow-400 font-serif">
                  BreakCase Round 1 (Div. 2)
                </h1>
                <span className="text-xs text-gray-600 dark:text-zinc-500 font-mono">Published 2 days ago</span>
              </div>
              <p className="text-xs text-black dark:text-zinc-300 leading-relaxed font-normal">
                We are proud to invite you to <strong>BreakCase Practice Round 1 (Div. 2)</strong>. You are given{' '}
                <strong>{totalCount} problems</strong>, each containing a flawed C++ implementation. Your goal is to inspect the code, identify the logic bug, and enter a counterexample test case that makes it fail.
              </p>
              <div className="text-[11px] text-gray-700 dark:text-zinc-400 italic">
                The problems were authored by <span className="text-[#1a5ab8] dark:text-yellow-400 font-bold">BreakCase Team</span> and{' '}
                <span className="text-[#1a5ab8] dark:text-yellow-500 font-bold">Community Testers</span>. Good luck & have fun!
              </div>
            </div>

            {/* Problemset Filters & Table Header */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-300 dark:border-yellow-500/30 rounded shadow-2xs overflow-hidden">
              
              {/* Filter Tabs Header */}
              <div className="bg-[#e8f4fc] dark:bg-zinc-900 border-b border-gray-300 dark:border-yellow-500/20 px-3 py-2 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-1 text-xs font-semibold">
                  <span className="text-black dark:text-zinc-400 mr-2 uppercase font-mono text-[11px] font-bold">Filter:</span>
                  {['ALL', 'EASY', 'MEDIUM', 'HARD', 'SOLVED', 'UNSOLVED'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-2.5 py-1 rounded text-xs transition-colors ${
                        selectedTag === tag
                          ? 'bg-[#1a5ab8] dark:bg-yellow-400 text-white dark:text-zinc-950 font-bold'
                          : 'bg-white dark:bg-zinc-800 text-black dark:text-yellow-400 hover:bg-sky-100 dark:hover:bg-zinc-700 border border-gray-300 dark:border-yellow-500/30'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-black dark:text-zinc-400 font-mono font-medium">
                  Showing {filteredProblems.length} of {problems.length} problems
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex flex-col items-center justify-center py-12 space-y-2">
                  <RefreshCw className="w-6 h-6 text-[#1a5ab8] dark:text-yellow-400 animate-spin" />
                  <span className="text-xs text-black dark:text-zinc-400 font-mono">Fetching problem catalog...</span>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="p-4 bg-rose-50 text-rose-700 border-b border-rose-200 text-xs flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>{error}</span>
                  </div>
                  <button
                    onClick={fetchProblems}
                    className="px-2 py-0.5 rounded bg-rose-200 hover:bg-rose-300 font-mono text-[11px]"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Problem Table */}
              {!loading && !error && (
                <div className="overflow-x-auto">
                  <table className="cf-table text-xs font-sans">
                    <thead>
                      <tr>
                        <th className="w-12 text-center">#</th>
                        <th>Problem Name</th>
                        <th className="w-28 text-center">Difficulty</th>
                        <th className="w-24 text-center">Status</th>
                        <th className="w-44">Tags</th>
                        <th className="w-24 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProblems.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-black dark:text-zinc-400 italic">
                            No problems match your current filter or search query.
                          </td>
                        </tr>
                      ) : (
                        filteredProblems.map((prob) => {
                          const formattedId = String(prob.problemNumber).padStart(2, '0');
                          return (
                            <tr
                              key={prob.id}
                              className="hover:bg-[#e8f4fc]/60 dark:hover:bg-zinc-800/60 transition-colors"
                            >
                              {/* # */}
                              <td className="text-center font-mono font-bold text-black dark:text-zinc-400">
                                {formattedId}
                              </td>

                              {/* Title */}
                              <td>
                                <Link
                                  to={`/problems/${prob.slug}`}
                                  className="font-bold text-[#1a5ab8] dark:text-yellow-400 hover:underline text-sm"
                                >
                                  {prob.title}
                                </Link>
                                <div className="text-[11px] text-gray-700 dark:text-zinc-400 line-clamp-1 mt-0.5">
                                  {prob.shortDescription}
                                </div>
                              </td>

                              {/* Difficulty */}
                              <td className="text-center font-semibold">
                                <span
                                  className={`inline-block px-2 py-0.5 rounded text-[11px] border ${
                                    prob.difficulty === 'Easy'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-500/40'
                                      : prob.difficulty === 'Medium'
                                      ? 'bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-500/40'
                                      : 'bg-rose-50 text-rose-900 border-rose-300 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-500/40'
                                  }`}
                                >
                                  {prob.difficulty}
                                </span>
                              </td>

                              {/* Status */}
                              <td className="text-center">
                                {prob.solved ? (
                                  <span className="inline-flex items-center space-x-1 text-emerald-700 dark:text-yellow-400 font-bold">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>Solved</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center space-x-1 text-gray-500 dark:text-zinc-500 font-medium">
                                    <Circle className="w-3.5 h-3.5" />
                                    <span>Try</span>
                                  </span>
                                )}
                              </td>

                              {/* Tags */}
                              <td>
                                <div className="flex flex-wrap gap-1">
                                  {prob.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-blue-50 dark:bg-zinc-800 text-[#1a5ab8] dark:text-yellow-400 border border-blue-200 dark:border-yellow-500/20"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </td>

                              {/* Action Link */}
                              <td className="text-center">
                                <Link
                                  to={`/problems/${prob.slug}`}
                                  className="inline-flex items-center space-x-1 text-xs font-bold text-[#1a5ab8] dark:text-yellow-400 hover:underline"
                                >
                                  <span>Solve</span>
                                  <ChevronRight className="w-3 h-3" />
                                </Link>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          </div>

          {/* ================= RIGHT SIDEBAR WIDGETS (1 COL / 25%) ================= */}
          <div className="space-y-4">
            
            {/* Sidebar Box 1: → Pay attention */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-300 dark:border-yellow-500/30 rounded shadow-2xs overflow-hidden">
              <div className="bg-[#e8f4fc] dark:bg-zinc-800 border-b border-gray-300 dark:border-yellow-500/20 px-3 py-1.5 text-xs font-extrabold text-[#1a5ab8] dark:text-yellow-400">
                → Pay attention
              </div>
              <div className="p-3 text-xs space-y-2 text-center">
                <div className="font-bold text-[#1a5ab8] dark:text-yellow-400">
                  Before contest
                </div>
                <div className="text-black dark:text-zinc-200 font-serif text-sm font-bold">
                  BreakCase Round 2 (Div. 1 + Div. 2)
                </div>
                <div className="text-[11px] text-gray-700 dark:text-zinc-400 font-mono">
                  Starting in 3 days
                </div>
                <button className="w-full py-1 px-2 rounded bg-[#1a5ab8] hover:bg-blue-700 dark:bg-yellow-400 dark:hover:bg-yellow-300 text-white dark:text-zinc-950 font-bold text-[11px] transition-colors">
                  Register for contest
                </button>
              </div>
            </div>

            {/* Sidebar Box 2: → user_profile */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-300 dark:border-yellow-500/30 rounded shadow-2xs overflow-hidden">
              <div className="bg-[#e8f4fc] dark:bg-zinc-800 border-b border-gray-300 dark:border-yellow-500/20 px-3 py-1.5 text-xs font-extrabold text-[#1a5ab8] dark:text-yellow-400 flex items-center justify-between">
                <span>→ {user?.username || 'Guest'}</span>
                <Trophy className="w-3.5 h-3.5 text-amber-500 dark:text-yellow-400" />
              </div>
              
              <div className="p-3 space-y-3 text-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded bg-sky-50 dark:bg-zinc-800 border border-gray-300 dark:border-yellow-500/30 flex items-center justify-center font-bold text-[#1a5ab8] dark:text-yellow-400 text-base shrink-0">
                    <UserIcon className="w-6 h-6 text-[#1a5ab8] dark:text-yellow-400" />
                  </div>
                  <div>
                    <div className="font-bold text-[#1a5ab8] dark:text-yellow-400 text-sm">
                      {user?.username || 'Guest User'}
                    </div>
                    <div className="text-black dark:text-zinc-400 text-[11px]">
                      Rating: <strong className="text-[#1a5ab8] dark:text-yellow-400">{userRating}</strong> (Specialist)
                    </div>
                    <div className="text-black dark:text-zinc-400 text-[11px]">
                      Contribution: <strong className="text-emerald-700 dark:text-yellow-400">+12</strong>
                    </div>
                  </div>
                </div>

                {/* Quick stats links */}
                <div className="border-t border-gray-200 dark:border-yellow-500/20 pt-2 space-y-1 text-[11px] text-[#1a5ab8] dark:text-yellow-400">
                  <div className="flex justify-between">
                    <span className="text-black dark:text-zinc-300">Solved Problems:</span>
                    <strong className="text-black dark:text-zinc-200 font-mono">{solvedCount} / {totalCount}</strong>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-1">
                    <div
                      className="bg-[#1a5ab8] dark:bg-yellow-400 h-full rounded-full"
                      style={{ width: `${Math.round((solvedCount / totalCount) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Box 3: → Top rated Leaderboard */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-300 dark:border-yellow-500/30 rounded shadow-2xs overflow-hidden">
              <div className="bg-[#e8f4fc] dark:bg-zinc-800 border-b border-gray-300 dark:border-yellow-500/20 px-3 py-1.5 text-xs font-extrabold text-[#1a5ab8] dark:text-yellow-400">
                → Top rated
              </div>
              <div className="p-0">
                <table className="cf-table text-xs">
                  <thead>
                    <tr>
                      <th className="w-8 text-center">#</th>
                      <th>User</th>
                      <th className="w-16 text-right">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="text-[11px] text-black dark:text-zinc-200">
                    <tr>
                      <td className="text-center font-mono">1</td>
                      <td><span className="font-bold text-rose-700 dark:text-yellow-400">tourist</span></td>
                      <td className="text-right font-mono font-bold">3857</td>
                    </tr>
                    <tr>
                      <td className="text-center font-mono">2</td>
                      <td><span className="font-bold text-rose-700 dark:text-yellow-400">jiangly</span></td>
                      <td className="text-right font-mono font-bold">3810</td>
                    </tr>
                    <tr>
                      <td className="text-center font-mono">3</td>
                      <td><span className="font-bold text-purple-700 dark:text-yellow-400">maroonrk</span></td>
                      <td className="text-right font-mono font-bold">3534</td>
                    </tr>
                    <tr>
                      <td className="text-center font-mono">4</td>
                      <td><span className="font-bold text-[#1a5ab8] dark:text-yellow-400">{user?.username || 'meh_akshaya'}</span></td>
                      <td className="text-right font-mono font-bold">{userRating}</td>
                    </tr>
                    <tr>
                      <td className="text-center font-mono">5</td>
                      <td><span className="font-bold text-amber-700 dark:text-yellow-400">Kevin114514</span></td>
                      <td className="text-right font-mono font-bold">3411</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardPage;


