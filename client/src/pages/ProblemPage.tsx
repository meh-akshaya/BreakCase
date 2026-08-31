import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Problem, TestResult } from '../types';
import Editor from '@monaco-editor/react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Zap,
  Copy,
  Check,
  Bookmark,
  MessageSquare,
  FileText,
  Clock,
  Play,
  RotateCcw,
  Maximize2,
  Lightbulb,
  ChevronDown,
  Code2,
} from 'lucide-react';

export const ProblemPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Top Tab state
  const [activeTab, setActiveTab] = useState<'problem' | 'editorial' | 'submissions' | 'comments'>('problem');
  const [bookmarked, setBookmarked] = useState(false);

  // Timer state
  const [timerRunning, setTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // Code editor & test state
  const [language, setLanguage] = useState('C++ (17)');
  const [showCustomInput, setShowCustomInput] = useState(true);
  const [inputVal, setInputVal] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [sampleCopied, setSampleCopied] = useState(false);

  // Fetch problem details
  const fetchProblem = async () => {
    if (!slug) return;
    try {
      setLoading(true);
      setError('');
      const res = await api.getProblemBySlug(slug);
      setProblem(res.problem);
    } catch (err: any) {
      setError(err.message || 'Failed to load problem.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblem();
  }, [slug]);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleTestCounterexample = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!problem || !inputVal.trim()) return;

    try {
      setEvaluating(true);
      setResult(null);
      const res = await api.testCounterexample(problem.id, inputVal);
      setResult(res);

      if (res.valid && res.broken) {
        setProblem((prev) => (prev ? { ...prev, solved: true } : prev));
      }
    } catch (err: any) {
      setResult({
        valid: false,
        broken: false,
        message: err.message || 'Server error while running test.',
      });
    } finally {
      setEvaluating(false);
    }
  };

  const copySampleInput = () => {
    if (problem?.sampleInput) {
      navigator.clipboard.writeText(problem.sampleInput);
      setSampleCopied(true);
      setTimeout(() => setSampleCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center space-y-3 bg-white dark:bg-black text-slate-800 dark:text-yellow-400">
        <RefreshCw className="w-8 h-8 text-sky-600 dark:text-yellow-400 animate-spin" />
        <p className="text-xs font-mono text-slate-500 dark:text-yellow-400/80">Loading Problem IDE...</p>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 bg-white dark:bg-black text-slate-800 dark:text-yellow-400">
        <div className="p-6 max-w-md w-full rounded-xl bg-sky-50 dark:bg-zinc-900 border border-sky-200 dark:border-yellow-500/30 text-center space-y-4 shadow-sm">
          <AlertTriangle className="w-10 h-10 text-amber-500 dark:text-yellow-400 mx-auto" />
          <h2 className="text-lg font-bold text-sky-900 dark:text-yellow-400">Problem Not Found</h2>
          <p className="text-xs text-slate-600 dark:text-zinc-400">{error || 'The requested problem could not be located.'}</p>
          <Link
            to="/problems"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded bg-sky-600 dark:bg-yellow-400 text-white dark:text-zinc-950 font-bold text-xs hover:bg-sky-500 dark:hover:bg-yellow-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Problemset</span>
          </Link>
        </div>
      </div>
    );
  }

  const formattedId = String(problem.problemNumber).padStart(2, '0');

  return (
    <div className="h-[calc(100vh-3.5rem)] bg-white dark:bg-black text-black dark:text-zinc-200 flex flex-col overflow-hidden font-sans">
      
      {/* Sub-Header Navigation Bar */}
      <div className="bg-[#e8f4fc] dark:bg-zinc-950 border-b border-gray-300 dark:border-yellow-500/30 px-4 py-1.5 flex items-center justify-between text-xs shrink-0">
        
        {/* Navigation Tabs (Problem, Editorial, Submissions, Comments) */}
        <div className="flex items-center space-x-1">
          <Link
            to="/problems"
            className="p-1 rounded text-black hover:bg-sky-100 dark:text-yellow-400 dark:hover:bg-zinc-900 transition-colors mr-1"
            title="Back to problems"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setActiveTab('problem')}
            className={`px-3 py-1 rounded font-bold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'problem'
                ? 'bg-[#1a5ab8] text-white dark:bg-yellow-400/20 dark:text-yellow-400 border-b-2 border-blue-900 dark:border-yellow-400'
                : 'text-black hover:bg-sky-100 dark:text-yellow-400/80 dark:hover:bg-zinc-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Problem</span>
          </button>

          <button
            onClick={() => setActiveTab('editorial')}
            className={`px-3 py-1 rounded font-bold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'editorial'
                ? 'bg-[#1a5ab8] text-white dark:bg-yellow-400/20 dark:text-yellow-400 border-b-2 border-blue-900 dark:border-yellow-400'
                : 'text-black hover:bg-sky-100 dark:text-yellow-400/80 dark:hover:bg-zinc-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Editorial</span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-3 py-1 rounded font-bold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'submissions'
                ? 'bg-[#1a5ab8] text-white dark:bg-yellow-400/20 dark:text-yellow-400 border-b-2 border-blue-900 dark:border-yellow-400'
                : 'text-black hover:bg-sky-100 dark:text-yellow-400/80 dark:hover:bg-zinc-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Submissions</span>
          </button>

          <button
            onClick={() => setActiveTab('comments')}
            className={`px-3 py-1 rounded font-bold transition-colors flex items-center space-x-1.5 ${
              activeTab === 'comments'
                ? 'bg-[#1a5ab8] text-white dark:bg-yellow-400/20 dark:text-yellow-400 border-b-2 border-blue-900 dark:border-yellow-400'
                : 'text-black hover:bg-sky-100 dark:text-yellow-400/80 dark:hover:bg-zinc-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Comments</span>
          </button>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center space-x-3 text-black dark:text-yellow-400">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-1 rounded hover:bg-sky-100 dark:hover:bg-zinc-900 transition-colors ${
              bookmarked ? 'text-amber-500 dark:text-yellow-400' : 'text-gray-400 dark:text-zinc-500'
            }`}
            title="Bookmark problem"
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
          <button
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
              } else {
                document.exitFullscreen();
              }
            }}
            className="p-1 rounded hover:bg-sky-100 dark:hover:bg-zinc-900 transition-colors text-black dark:text-yellow-400"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Split Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-300 dark:divide-yellow-500/30 overflow-hidden">
        
        {/* LEFT PANE: PROBLEM STATEMENT */}
        <div className="p-5 lg:p-6 overflow-y-auto space-y-5 bg-white dark:bg-black text-black dark:text-zinc-200">
          
          {/* Header & Badges */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-xl font-extrabold text-black dark:text-yellow-400 tracking-tight leading-snug font-serif">
                {formattedId}. {problem.title}
              </h1>
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-1 rounded ${bookmarked ? 'text-amber-500 dark:text-yellow-400' : 'text-gray-400 dark:text-zinc-600'}`}
              >
                <Bookmark className="w-5 h-5 fill-current" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-black dark:text-zinc-400 border-b border-gray-200 dark:border-yellow-500/20 pb-3">
              <div>
                Difficulty: <strong className="text-[#1a5ab8] dark:text-yellow-400">{problem.difficulty}</strong>
              </div>
              <div>
                Accuracy: <strong className="text-[#1a5ab8] dark:text-yellow-400">49.82%</strong>
              </div>
              <div>
                Submissions: <strong className="text-[#1a5ab8] dark:text-yellow-400">11K+</strong>
              </div>
              <div>
                Points: <strong className="text-[#1a5ab8] dark:text-yellow-400">4</strong>
              </div>
            </div>
          </div>

          {/* Statement */}
          {activeTab === 'problem' && (
            <div className="space-y-5 text-xs text-black dark:text-zinc-300 leading-relaxed font-normal">
              
              <div className="whitespace-pre-line leading-relaxed text-sm text-black dark:text-zinc-200">
                {problem.statement}
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-[#1a5ab8] dark:text-yellow-400 uppercase tracking-wider text-[11px] font-mono">
                  Input Format:
                </h3>
                <p className="whitespace-pre-line text-black dark:text-zinc-300">{problem.inputFormat}</p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-[#1a5ab8] dark:text-yellow-400 uppercase tracking-wider text-[11px] font-mono">
                  Output Format:
                </h3>
                <p className="whitespace-pre-line text-black dark:text-zinc-300">{problem.outputFormat}</p>
              </div>

              {/* Constraints Box */}
              <div className="p-3 rounded-lg bg-[#f8fafc] dark:bg-zinc-900 border border-gray-300 dark:border-yellow-500/30 space-y-1">
                <h3 className="font-bold text-[#1a5ab8] dark:text-yellow-400 uppercase tracking-wider text-[11px] font-mono flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Constraints:</span>
                </h3>
                <pre className="font-mono text-xs text-black dark:text-yellow-300 whitespace-pre-wrap font-semibold">
                  {problem.constraints}
                </pre>
              </div>

              {/* Examples Section */}
              <div className="space-y-3 pt-2">
                <h2 className="font-extrabold text-sm text-black dark:text-yellow-400">Examples:</h2>

                <div className="p-4 rounded-xl bg-[#f8fafc] dark:bg-black border border-gray-300 dark:border-yellow-500/40 space-y-2 font-mono text-xs text-black dark:text-yellow-300 shadow-2xs">
                  <div className="flex items-center justify-between text-gray-600 dark:text-yellow-400/80 text-[11px]">
                    <span className="font-bold text-[#1a5ab8] dark:text-yellow-400">Sample Case</span>
                    <button
                      onClick={copySampleInput}
                      className="flex items-center space-x-1 text-[#1a5ab8] dark:text-yellow-400 hover:underline font-bold"
                    >
                      {sampleCopied ? <Check className="w-3 h-3 text-emerald-600 dark:text-yellow-400" /> : <Copy className="w-3 h-3" />}
                      <span>{sampleCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div>
                    <span className="font-bold text-[#1a5ab8] dark:text-yellow-400">Input: </span>
                    <span className="whitespace-pre-wrap text-black dark:text-yellow-300 font-semibold">{problem.sampleInput}</span>
                  </div>

                  <div>
                    <span className="font-bold text-[#1a5ab8] dark:text-yellow-400">Output: </span>
                    <span className="whitespace-pre-wrap text-black dark:text-yellow-300 font-semibold">{problem.sampleOutput}</span>
                  </div>

                  {problem.sampleExplanation && (
                    <div className="pt-1 text-black dark:text-zinc-400 font-sans text-xs">
                      <span className="font-bold text-[#1a5ab8] dark:text-yellow-400 font-mono">Explanation: </span>
                      <span className="italic">{problem.sampleExplanation}</span>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {activeTab === 'editorial' && (
            <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-zinc-900 border border-gray-300 dark:border-yellow-500/30 text-xs text-black dark:text-zinc-300">
              <h3 className="font-bold text-[#1a5ab8] dark:text-yellow-400 text-sm mb-2">Editorial Hints</h3>
              <p>Analyze edge cases like negative numbers, integer overflows, or off-by-one loop boundaries.</p>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-zinc-900 border border-gray-300 dark:border-yellow-500/30 text-xs text-black dark:text-zinc-300">
              <h3 className="font-bold text-[#1a5ab8] dark:text-yellow-400 text-sm mb-2">Your Submissions</h3>
              <p className="text-black dark:text-zinc-400">
                {problem.solved ? '✓ Solved on BreakCase Platform' : 'No successful counterexamples yet.'}
              </p>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="p-4 rounded-lg bg-[#f8fafc] dark:bg-zinc-900 border border-gray-300 dark:border-yellow-500/30 text-xs text-black dark:text-zinc-300">
              <h3 className="font-bold text-[#1a5ab8] dark:text-yellow-400 text-sm mb-2">Discussion & Comments</h3>
              <p className="text-black dark:text-zinc-400">No public comments yet.</p>
            </div>
          )}

        </div>

        {/* RIGHT PANE: IDE & COUNTEREXAMPLE TESTER */}
        <div className="flex flex-col bg-white dark:bg-zinc-950 overflow-hidden">
          
          {/* Top IDE Toolbar */}
          <div className="px-4 py-2 bg-[#e8f4fc] dark:bg-zinc-900 border-b border-gray-300 dark:border-yellow-500/30 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-white dark:bg-black text-sky-900 dark:text-yellow-400 border border-sky-300 dark:border-yellow-500/40 rounded px-2.5 py-1 text-xs font-mono font-semibold focus:outline-none appearance-none pr-7 cursor-pointer"
                >
                  <option value="C++ (17)">C++ (17)</option>
                  <option value="Java">Java</option>
                  <option value="Python 3">Python 3</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-sky-600 dark:text-yellow-400 absolute right-2 top-2 pointer-events-none" />
              </div>

              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold transition-colors border ${
                  timerRunning
                    ? 'bg-amber-500/20 text-amber-600 dark:text-yellow-400 border-amber-500/40'
                    : 'bg-white dark:bg-black text-sky-700 dark:text-yellow-400 border-sky-300 dark:border-yellow-500/40 hover:bg-sky-50 dark:hover:bg-zinc-900'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{timerRunning ? formatTimer(seconds) : 'Start Timer ⏱'}</span>
              </button>
            </div>

            <div className="flex items-center space-x-2 text-sky-700 dark:text-yellow-400">
              <button
                onClick={() => setSeconds(0)}
                className="p-1 rounded hover:bg-sky-200 dark:hover:bg-zinc-800 transition-colors"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Monaco Editor Workspace */}
          <div className="flex-1 bg-slate-900 dark:bg-black relative min-h-[300px]">
            {problem.buggySolution && (
              <Editor
                height="100%"
                language="cpp"
                value={problem.buggySolution}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  domReadOnly: true,
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  lineNumbers: 'on',
                  folding: true,
                  padding: { top: 12, bottom: 12 },
                  renderLineHighlight: 'all',
                }}
              />
            )}
          </div>

          {/* Custom Input Drawer */}
          {showCustomInput && (
            <div className="bg-white dark:bg-zinc-950 border-t border-sky-200 dark:border-yellow-500/30 p-3 space-y-2 shrink-0 max-h-48 overflow-y-auto">
              <div className="flex items-center justify-between text-xs text-sky-900 dark:text-yellow-400 font-mono">
                <span className="font-bold">Custom Counterexample Input:</span>
                <span className="text-[10px] text-slate-500 dark:text-zinc-500">Provide input within problem constraints</span>
              </div>
              <textarea
                rows={3}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={`Enter custom input test case...\ne.g.\n4\n-10 -5 -2 -9`}
                className="w-full p-2.5 font-mono text-xs rounded border border-gray-300 dark:border-yellow-500/40 bg-white dark:bg-black text-black dark:text-yellow-300 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-yellow-400 transition-colors resize-y font-semibold"
              />
            </div>
          )}

          {/* Verdict Output Box */}
          {result && (
            <div className="bg-white dark:bg-zinc-950 border-t border-gray-300 dark:border-yellow-500/30 p-3 shrink-0 text-xs">
              {result.valid && result.broken && (
                <div className="p-3 rounded bg-emerald-50 dark:bg-yellow-950/40 border border-emerald-300 dark:border-yellow-500/50 text-black dark:text-yellow-300 space-y-2">
                  <div className="flex items-center space-x-2 font-bold text-emerald-800 dark:text-yellow-400 text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>✓ COUNTEREXAMPLE FOUND!</span>
                  </div>
                  <p className="text-black dark:text-zinc-300 text-[11px] font-medium">
                    Solution broke! Expected and actual outputs differ. Problem marked as <strong>Solved</strong>.
                  </p>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px] pt-1">
                    <div className="p-2 rounded bg-white dark:bg-black border border-emerald-300 dark:border-yellow-500/40">
                      <span className="text-emerald-800 dark:text-yellow-400 font-bold block mb-1">Expected Output (Correct):</span>
                      <pre className="whitespace-pre-wrap text-black dark:text-yellow-300 font-semibold">{result.expectedOutput}</pre>
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-black border border-rose-300 dark:border-rose-500/40">
                      <span className="text-rose-700 dark:text-rose-400 font-bold block mb-1">Solution Output (Buggy):</span>
                      <pre className="whitespace-pre-wrap text-black dark:text-rose-300 font-semibold">{result.actualOutput}</pre>
                    </div>
                  </div>
                </div>
              )}

              {result.valid && !result.broken && (
                <div className="p-3 rounded bg-amber-50 dark:bg-yellow-950/30 border border-amber-300 dark:border-yellow-500/40 text-black dark:text-yellow-300 space-y-1">
                  <div className="flex items-center space-x-2 font-bold text-amber-900 dark:text-yellow-400 text-sm">
                    <XCircle className="w-5 h-5" />
                    <span>✗ Not a Counterexample</span>
                  </div>
                  <p className="text-black dark:text-zinc-300 text-[11px]">
                    The provided C++ solution gave the correct output for this test case. Try another boundary condition.
                  </p>
                </div>
              )}

              {!result.valid && (
                <div className="p-3 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-500/40 text-black dark:text-rose-300 space-y-1">
                  <div className="flex items-center space-x-2 font-bold text-rose-800 dark:text-rose-400 text-sm">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Invalid Test Case</span>
                  </div>
                  <p className="text-black dark:text-rose-300 text-[11px] font-mono font-semibold">{result.message}</p>
                </div>
              )}
            </div>
          )}

          {/* Bottom Action Bar */}
          <div className="px-4 py-3 bg-[#e8f4fc] dark:bg-zinc-900 border-t border-gray-300 dark:border-yellow-500/30 flex items-center justify-between text-xs shrink-0">
            <button
              onClick={() => setShowCustomInput(!showCustomInput)}
              className="p-2 rounded bg-white dark:bg-black text-amber-600 dark:text-yellow-400 border border-gray-300 dark:border-yellow-500/40 hover:bg-sky-50 dark:hover:bg-zinc-900 transition-colors"
              title="Toggle Custom Input drawer"
            >
              <Lightbulb className="w-4 h-4 fill-current" />
            </button>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setShowCustomInput(!showCustomInput)}
                className="px-3 py-1.5 rounded font-bold text-black dark:text-yellow-400 hover:bg-sky-100 dark:hover:bg-zinc-800 border border-gray-300 dark:border-yellow-500/40 transition-colors"
              >
                Custom Input
              </button>

              <button
                type="button"
                onClick={() => handleTestCounterexample()}
                disabled={evaluating || !inputVal.trim()}
                className="px-4 py-1.5 rounded font-bold bg-[#1a5ab8] dark:bg-zinc-800 hover:bg-blue-700 dark:hover:bg-zinc-700 text-white dark:text-yellow-400 border border-transparent dark:border-yellow-500/30 transition-colors flex items-center space-x-1.5 disabled:opacity-50"
              >
                {evaluating ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current" />
                )}
                <span>Compile & Run</span>
              </button>

              <button
                type="button"
                onClick={() => handleTestCounterexample()}
                disabled={evaluating || !inputVal.trim()}
                className="px-5 py-1.5 rounded font-bold bg-[#1a5ab8] hover:bg-blue-700 dark:bg-yellow-400 dark:hover:bg-yellow-300 text-white dark:text-zinc-950 shadow-md transition-colors flex items-center space-x-1.5 disabled:opacity-50"
              >
                {evaluating ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Zap className="w-3.5 h-3.5 fill-current" />
                )}
                <span>Submit</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProblemPage;



