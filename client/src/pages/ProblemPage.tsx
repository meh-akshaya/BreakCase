import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Problem, TestResult } from '../types';
import { CodeViewer } from '../components/CodeViewer';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Zap,
  Copy,
  Check,
} from 'lucide-react';

export const ProblemPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Counterexample input & evaluation state
  const [inputVal, setInputVal] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  const [sampleCopied, setSampleCopied] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center space-y-3 bg-slate-50 dark:bg-slate-950">
        <RefreshCw className="w-8 h-8 text-sky-500 animate-spin" />
        <p className="text-sm font-mono text-slate-500">Loading problem environment...</p>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
        <div className="p-6 max-w-md w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-4">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Problem Not Found</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">{error || 'The requested problem could not be located.'}</p>
          <Link
            to="/problems"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-sky-600 text-white font-medium text-sm hover:bg-sky-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Problems</span>
          </Link>
        </div>
      </div>
    );
  }

  const formattedId = String(problem.problemNumber).padStart(2, '0');

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 flex flex-col">
      
      {/* Top Header Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            to="/problems"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Back to problems"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="font-mono text-sm font-bold text-slate-400 dark:text-slate-500">
            {formattedId}
          </span>
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 truncate">
            {problem.title}
          </h1>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {problem.difficulty}
          </span>
        </div>

        {/* Status Badge */}
        <div>
          {problem.solved ? (
            <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Solved</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              <Zap className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>Unsolved</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Two-Panel Layout (Desktop 2-col, Mobile stacked) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800 max-w-[1800px] w-full mx-auto">
        
        {/* ================= LEFT PANEL: PROBLEM STATEMENT ================= */}
        <div className="p-6 lg:p-8 overflow-y-auto space-y-6 max-h-[calc(100vh-7.5rem)]">
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {problem.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded text-xs font-mono bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Statement */}
          <div className="space-y-3">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              Problem Statement
            </h2>
            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-normal">
              {problem.statement}
            </div>
          </div>

          {/* Input Format */}
          <div className="space-y-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              Input Format
            </h2>
            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-normal">
              {problem.inputFormat}
            </div>
          </div>

          {/* Output Format */}
          <div className="space-y-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              Output Format
            </h2>
            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-normal">
              {problem.outputFormat}
            </div>
          </div>

          {/* Constraints Callout */}
          <div className="p-4 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-slate-200 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>Constraints</span>
            </div>
            <pre className="font-mono text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
              {problem.constraints}
            </pre>
          </div>

          {/* Examples */}
          <div className="space-y-4 pt-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1">
              Sample Case
            </h2>

            <div className="space-y-3 font-mono text-xs">
              
              {/* Sample Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span>Input:</span>
                  <button
                    onClick={copySampleInput}
                    className="flex items-center space-x-1 text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    {sampleCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{sampleCopied ? 'Copied' : 'Copy sample'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 whitespace-pre-wrap">
                  {problem.sampleInput}
                </pre>
              </div>

              {/* Sample Output */}
              <div className="space-y-1">
                <div className="text-slate-500 dark:text-slate-400">Output:</div>
                <pre className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 whitespace-pre-wrap">
                  {problem.sampleOutput}
                </pre>
              </div>

              {/* Explanation */}
              {problem.sampleExplanation && (
                <div className="space-y-1 pt-1">
                  <div className="text-slate-500 dark:text-slate-400">Explanation:</div>
                  <p className="font-sans text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                    {problem.sampleExplanation}
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* ================= RIGHT PANEL: BREAKCASE CHALLENGE ================= */}
        <div className="p-6 lg:p-8 overflow-y-auto space-y-6 max-h-[calc(100vh-7.5rem)] bg-slate-100/50 dark:bg-slate-900/30">
          
          {/* Header Banner */}
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-amber-500/10 border border-sky-500/20 text-slate-900 dark:text-slate-100 space-y-2">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500/20" />
              <h2 className="font-bold text-base">Break the Solution</h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              This solution looks correct and passes sample tests.
              <br />
              <strong>Your task:</strong> Find <strong>ONE</strong> valid input within constraints that makes this solution produce the wrong output.
            </p>
          </div>

          {/* Provided C++ Solution Viewer */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                Provided C++17 Solution
              </span>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ Compiles & Passes Samples
              </span>
            </div>
            {problem.buggySolution && (
              <CodeViewer code={problem.buggySolution} language="cpp" readOnly={true} />
            )}
          </div>

          {/* Counterexample Input Submission Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">
                Your Counterexample Input
              </label>
              <textarea
                required
                rows={5}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={`Enter custom input testcase according to format...\ne.g.\n4\n-10 -5 -2 -9`}
                className="w-full p-4 font-mono text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-colors resize-y shadow-inner"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Must satisfy problem constraints
              </span>

              <button
                type="submit"
                disabled={evaluating || !inputVal.trim()}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white shadow-md shadow-sky-500/20 transition-all flex items-center space-x-2 disabled:opacity-50"
              >
                {evaluating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing C++...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Break It</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Feedback Result Banner */}
          {result && (
            <div className="pt-2">
              
              {/* SUCCESS: Counterexample Found */}
              {result.valid && result.broken && (
                <div className="p-5 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/40 text-slate-900 dark:text-slate-100 space-y-4 shadow-lg animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-emerald-600 dark:text-emerald-400">
                        ✓ COUNTEREXAMPLE FOUND
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        You broke the solution! This problem is now marked as <strong>Solved</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Output Comparison Table */}
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-1">
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <div className="text-emerald-600 dark:text-emerald-400 font-bold mb-1">Expected Output (Correct):</div>
                      <pre className="whitespace-pre-wrap font-bold text-slate-900 dark:text-slate-100">
                        {result.expectedOutput}
                      </pre>
                    </div>
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                      <div className="text-rose-600 dark:text-rose-400 font-bold mb-1">Solution Output (Buggy):</div>
                      <pre className="whitespace-pre-wrap font-bold text-slate-900 dark:text-slate-100">
                        {result.actualOutput}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* FAIL: Not a Counterexample */}
              {result.valid && !result.broken && (
                <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-slate-900 dark:text-slate-100 space-y-3 shadow-md animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-start space-x-3">
                    <XCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-extrabold text-base text-amber-600 dark:text-amber-400">
                        ✗ Not a Counterexample
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        The provided solution produced the correct answer for this input.
                        <br />
                        Try another edge case or boundary condition.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* INVALID INPUT: Violates constraints */}
              {!result.valid && (
                <div className="p-5 rounded-2xl bg-rose-500/10 border-2 border-rose-500/30 text-slate-900 dark:text-slate-100 space-y-2 shadow-md animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-extrabold text-base text-rose-600 dark:text-rose-400">
                        Invalid Test Case
                      </h3>
                      <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 font-mono leading-relaxed">
                        {result.message}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
