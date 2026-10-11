import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import type { Problem } from '../types';
import { useAuth } from '../context/AuthContext';
import { getCFRatingInfo, getDifficultyRating } from '../utils/codeforces';
import {
  Send,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
  User as UserIcon,
  Search,
  BookOpen,
  Zap,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Search parameter handle
  const searchParams = new URLSearchParams(location.search);
  const searchFilter = searchParams.get('search') || '';

  useEffect(() => {
    if (searchFilter) {
      setSearchQuery(searchFilter);
    }
  }, [searchFilter]);

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
  const ratingInfo = getCFRatingInfo(userRating);

  const filteredProblems = problems.filter((p) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = query
      ? p.title.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query))
      : true;

    if (selectedTag === 'ALL') return matchesSearch;
    if (selectedTag === 'SOLVED') return matchesSearch && p.solved;
    if (selectedTag === 'UNSOLVED') return matchesSearch && !p.solved;
    return matchesSearch && p.difficulty.toUpperCase().includes(selectedTag);
  });

  const allTags = Array.from(
    new Set(problems.flatMap((p) => p.tags))
  );

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-white dark:bg-[#141519] text-[#1F2937] dark:text-[#F1F3F5] py-5 px-4 sm:px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Notice Alert Banner */}
        <div className="p-3 rounded border border-[#B9B9B9] dark:border-[#393443] bg-[#E1E1E1] dark:bg-[#292535] text-[#1F2937] dark:text-[#F1F3F5] text-xs flex items-center justify-between shadow-2xs">
          <div className="flex items-center space-x-2">
            <Send className="w-4 h-4 text-[#3B5998] dark:text-[#4F7CFF] shrink-0" />
            <span>
              Welcome to <strong>BreakCase Platform</strong>! Your mission is to inspect seemingly correct C++ solutions and find counterexample inputs that break them.{' '}
              <a
                href="#announcement"
                className="underline text-[#3B5998] dark:text-[#4F7CFF] hover:opacity-80 font-bold"
              >
                Read Official Round Announcement
              </a>.
            </span>
          </div>
          <span className="text-xs opacity-60 cursor-pointer font-bold hover:opacity-100">✕</span>
        </div>

        {/* Main 2-Column Codeforces Layout (75% Left / 25% Right Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          
          {/* ================= LEFT MAIN CONTENT AREA (3 COLS / 75%) ================= */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Roundbox: Contest Announcement Banner */}
            <div className="cf-roundbox" id="announcement">
              <div className="caption">
                BreakCase Round 1 (Div. 2)
              </div>
              <div className="content space-y-3">
                <div className="flex items-center justify-between border-b border-[#B9B9B9] dark:border-[#393443] pb-2">
                  <h1 className="text-base font-bold text-[#3B5998] dark:text-[#4F7CFF]">
                    Official Counterexample Practice Contest
                  </h1>
                  <span className="text-xs text-[#717171] dark:text-[#858A99] font-mono">Published 2 days ago</span>
                </div>
                <p className="text-xs text-[#454545] dark:text-[#B7BBC7] leading-relaxed">
                  We are glad to present <strong>BreakCase Round 1 (Div. 2)</strong>! You are provided with{' '}
                  <strong>{totalCount} handcrafted C++ competitive programming problems</strong>. Each problem includes a complete C++17 solution that compiles cleanly and passes sample cases, but contains a subtle algorithmic edge-case bug. Find 1 input counterexample to solve each problem!
                </p>
                <div className="text-[11px] text-[#717171] dark:text-[#858A99] italic flex items-center justify-between">
                  <span>
                    Problems created by <span className="text-[#3B5998] dark:text-[#4F7CFF] font-bold">BreakCase Team</span> and{' '}
                    <span className="text-[#008000] font-bold">Community Testers</span>.
                  </span>
                  <span className="font-bold text-[#3B5998] dark:text-[#4F7CFF] not-italic">
                    Standard Time Limit: 2.0s per test
                  </span>
                </div>
              </div>
            </div>

            {/* Roundbox: Problemset Datatable Container */}
            <div className="cf-roundbox">
              <div className="caption flex items-center justify-between">
                <span>Problemset Catalog</span>
                <span className="text-xs font-normal text-[#454545] dark:text-[#B7BBC7]">
                  Showing {filteredProblems.length} of {problems.length} problems
                </span>
              </div>

              {/* Filter Tabs & Search Header */}
              <div className="bg-[#F0F0F0] dark:bg-[#282933] border-b border-[#B9B9B9] dark:border-[#393443] p-2.5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-1.5 text-xs font-semibold">
                  <span className="text-[#717171] dark:text-[#858A99] mr-1 uppercase font-mono text-[11px] font-bold">Filter:</span>
                  {['ALL', 'EASY', 'MEDIUM', 'HARD', 'SOLVED', 'UNSOLVED'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-2.5 py-0.5 rounded text-xs transition-colors font-sans ${
                        selectedTag === tag
                          ? 'bg-[#3B5998] dark:bg-[#4F7CFF] text-white font-bold'
                          : 'bg-white dark:bg-[#1E1F26] text-[#1F2937] dark:text-[#F1F3F5] hover:bg-[#E1E1E1] dark:hover:bg-[#352E4A] border border-[#B9B9B9] dark:border-[#393443]'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-[#717171] dark:text-[#858A99]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search problem title or tag..."
                    className="pl-8 pr-3 py-0.5 bg-white dark:bg-[#1E1F26] border border-[#B9B9B9] dark:border-[#393443] rounded text-xs focus:outline-none focus:border-[#3B5998] dark:focus:border-[#4F7CFF] w-48 sm:w-64"
                  />
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex flex-col items-center justify-center py-12 space-y-2">
                  <RefreshCw className="w-6 h-6 text-[#3B5998] dark:text-[#4F7CFF] animate-spin" />
                  <span className="text-xs text-[#717171] dark:text-[#858A99] font-mono">Loading Codeforces problem catalog...</span>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="p-4 bg-rose-50 text-[#B94A48] border-b border-rose-200 text-xs flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-[#B94A48]" />
                    <span>{error}</span>
                  </div>
                  <button
                    onClick={fetchProblems}
                    className="px-2.5 py-1 bg-[#B94A48] text-white rounded font-bold hover:bg-rose-700"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Codeforces Problemset Table */}
              {!loading && !error && (
                <div className="overflow-x-auto">
                  <table className="cf-table">
                    <thead>
                      <tr>
                        <th className="w-12 text-center">#</th>
                        <th>Name</th>
                        <th className="w-28 text-center">Rating</th>
                        <th className="w-24 text-center">Status</th>
                        <th className="w-28 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProblems.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-8 text-xs text-[#717171]">
                            No problems match your current search/filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredProblems.map((prob) => {
                          const diffInfo = getDifficultyRating(prob.difficulty);
                          const formattedId = String(prob.problemNumber).padStart(2, '0');
                          return (
                            <tr key={prob.id} className={prob.solved ? 'bg-[#E6F4ED]/40 dark:bg-[#1E3A2B]/20' : ''}>
                              {/* Problem ID */}
                              <td className="text-center font-bold text-[#3B5998] dark:text-[#4F7CFF] font-mono">
                                {formattedId}
                              </td>

                              {/* Title & Tag Pills */}
                              <td>
                                <Link
                                  to={`/problems/${prob.slug}`}
                                  className="font-bold text-[#3B5998] dark:text-[#4F7CFF] hover:underline text-sm block mb-1"
                                >
                                  {prob.title}
                                </Link>
                                <div className="flex flex-wrap items-center gap-1">
                                  {prob.tags.map((t) => (
                                    <span key={t} className="tag-box cursor-pointer" onClick={() => setSearchQuery(t)}>
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </td>

                              {/* Codeforces Rating Score */}
                              <td className="text-center font-bold">
                                <span className={`text-xs px-2 py-0.5 rounded border border-current font-mono`} style={{ color: diffInfo.color }}>
                                  *{diffInfo.rating}
                                </span>
                              </td>

                              {/* Solved Status */}
                              <td className="text-center font-bold">
                                {prob.solved ? (
                                  <span className="inline-flex items-center text-[#008000] dark:text-[#4CAF50] text-xs">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                                    Solved
                                  </span>
                                ) : (
                                  <span className="text-[#717171] dark:text-[#858A99] text-xs font-normal">
                                    Unsolved
                                  </span>
                                )}
                              </td>

                              {/* Action Link */}
                              <td className="text-center">
                                <Link
                                  to={`/problems/${prob.slug}`}
                                  className="px-2.5 py-1 text-xs bg-[#3B5998] dark:bg-[#4F7CFF] hover:bg-[#2E4577] dark:hover:bg-[#3B67E6] text-white rounded font-bold transition-colors inline-block"
                                >
                                  Break →
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

          {/* ================= RIGHT SIDEBAR AREA (1 COL / 25%) ================= */}
          <div className="space-y-4">
            
            {/* Sidebar Roundbox: User Info & Rating */}
            <div className="cf-roundbox">
              <div className="caption">
                User Info & Rating
              </div>
              <div className="content space-y-3 text-xs">
                {user ? (
                  <>
                    <div className="flex items-center space-x-2">
                      <UserIcon className="w-4 h-4 text-[#3B5998] dark:text-[#4F7CFF]" />
                      <span className={`text-sm font-bold ${ratingInfo.className}`}>
                        {user.username}
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-1 border-t border-[#B9B9B9] dark:border-[#393443]">
                      <div className="flex justify-between">
                        <span className="text-[#717171] dark:text-[#858A99]">Contest Rating:</span>
                        <span className="font-bold font-mono" style={{ color: ratingInfo.color }}>
                          {userRating} ({ratingInfo.title})
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#717171] dark:text-[#858A99]">Solved Counterexamples:</span>
                        <span className="font-bold text-[#008000]">{solvedCount} / {totalCount}</span>
                      </div>

                      {/* Rating Progress Bar */}
                      <div className="w-full bg-[#E1E1E1] dark:bg-[#292535] rounded-full h-2 overflow-hidden mt-1">
                        <div
                          className="h-full bg-[#008000] transition-all duration-300"
                          style={{ width: `${(solvedCount / totalCount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-2 py-2">
                    <p className="text-[#717171] dark:text-[#858A99]">Log in to track your rating & progress</p>
                    <Link
                      to="/login"
                      className="block text-center py-1 bg-[#3B5998] dark:bg-[#4F7CFF] text-white rounded font-bold"
                    >
                      Enter Codeforces
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Roundbox: Pay Attention */}
            <div className="cf-roundbox">
              <div className="caption">
                Pay Attention
              </div>
              <div className="content space-y-2 text-xs text-[#454545] dark:text-[#B7BBC7]">
                <p>
                  <strong>Rule 1:</strong> Your counterexample input must strictly satisfy all numerical bounds and token formats specified in the problem statement.
                </p>
                <p>
                  <strong>Rule 2:</strong> Non-conforming or out-of-bound test cases will return <span className="text-[#B94A48] font-bold">Invalid Constraint</span>.
                </p>
              </div>
            </div>

            {/* Sidebar Roundbox: Top Problem Tags */}
            <div className="cf-roundbox">
              <div className="caption">
                Problem Tags
              </div>
              <div className="content">
                <div className="flex flex-wrap gap-1">
                  {allTags.map((t) => (
                    <span
                      key={t}
                      className="tag-box cursor-pointer"
                      onClick={() => setSearchQuery(t)}
                    >
                      {t}
                    </span>
                  ))}
                  <span className="tag-box cursor-pointer" onClick={() => setSearchQuery('math')}>math</span>
                  <span className="tag-box cursor-pointer" onClick={() => setSearchQuery('greedy')}>greedy</span>
                  <span className="tag-box cursor-pointer" onClick={() => setSearchQuery('implementation')}>implementation</span>
                </div>
              </div>
            </div>

            {/* Sidebar Roundbox: Contest Materials */}
            <div className="cf-roundbox">
              <div className="caption">
                Contest Materials
              </div>
              <div className="content space-y-1.5 text-xs text-[#3B5998] dark:text-[#4F7CFF]">
                <div className="hover:underline cursor-pointer flex items-center space-x-1 font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>BreakCase Tutorial & Problem Notes</span>
                </div>
                <div className="hover:underline cursor-pointer flex items-center space-x-1 font-semibold">
                  <Zap className="w-3.5 h-3.5" />
                  <span>C++17 Compiler Flags & Sandbox Spec</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
