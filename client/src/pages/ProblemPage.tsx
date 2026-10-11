import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Problem, TestResult } from '../types';
import Editor from '@monaco-editor/react';
import { getDifficultyRating } from '../utils/codeforces';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Copy,
  Check,
  Bookmark,
  FileText,
  Clock,
  Play,
  RotateCcw,
  Maximize2,
  ChevronDown,
  Code2,
  Terminal,
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
  const [language, setLanguage] = useState('GNU G++17 7.3.0');
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
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center space-y-3 bg-[#F8FAFC] dark:bg-[#141519] text-[#1F2937] dark:text-[#F1F3F5]">
        <RefreshCw className="w-8 h-8 text-[#3B5998] dark:text-[#4F7CFF] animate-spin" />
        <p className="text-xs font-mono text-[#717171] dark:text-[#858A99]">Loading Codeforces Problem Environment...</p>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 bg-[#F8FAFC] dark:bg-[#141519] text-[#1F2937] dark:text-[#F1F3F5]">
        <div className="p-6 max-w-md w-full rounded cf-roundbox text-center space-y-4 shadow-sm bg-white dark:bg-[#1E1F26]">
          <AlertTriangle className="w-10 h-10 text-[#C09853] dark:text-[#D99A2B] mx-auto" />
          <h2 className="text-lg font-bold text-[#3B5998] dark:text-[#4F7CFF]">Problem Not Found</h2>
          <p className="text-xs text-[#717171] dark:text-[#858A99]">{error || 'The requested problem could not be located.'}</p>
          <Link
            to="/problems"
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded bg-[#3B5998] dark:bg-[#4F7CFF] text-white font-bold text-xs hover:bg-[#2E4577] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Problemset Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const formattedId = String(problem.problemNumber).padStart(2, '0');
  const diffInfo = getDifficultyRating(problem.difficulty);

  return (
    <div className="h-[calc(100vh-6rem)] bg-white dark:bg-[#141519] text-[#1F2937] dark:text-[#F1F3F5] flex flex-col overflow-hidden font-sans">
      
      {/* Sub-Header Navigation & Control Bar */}
      <div className="bg-[#E1E1E1] dark:bg-[#202129] border-b border-[#B9B9B9] dark:border-[#393443] px-4 py-1.5 flex items-center justify-between text-xs shrink-0">
        
        {/* Navigation Tabs (Problem, Editorial, Submissions, Comments) */}
        <div className="flex items-center space-x-1">
          <Link
            to="/problems"
            className="p-1 rounded text-[#1F2937] hover:bg-[#CCCCCC] dark:text-[#F1F3F5] dark:hover:bg-[#292535] transition-colors mr-1"
            title="Back to problemset"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setActiveTab('problem')}
            className={`px-3 py-1 rounded font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'problem'
                ? 'bg-[#3B5998] dark:bg-[#4F7CFF] text-white shadow-2xs'
                : 'text-[#1F2937] dark:text-[#B7BBC7] hover:bg-white dark:hover:bg-[#292535]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Problem Statement</span>
          </button>

          <button
            onClick={() => setActiveTab('editorial')}
            className={`px-3 py-1 rounded font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'editorial'
                ? 'bg-[#3B5998] dark:bg-[#4F7CFF] text-white shadow-2xs'
                : 'text-[#1F2937] dark:text-[#B7BBC7] hover:bg-white dark:hover:bg-[#292535]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Tutorial & Hints</span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-3 py-1 rounded font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'submissions'
                ? 'bg-[#3B5998] dark:bg-[#4F7CFF] text-white shadow-2xs'
                : 'text-[#1F2937] dark:text-[#B7BBC7] hover:bg-white dark:hover:bg-[#292535]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>My Submissions</span>
          </button>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center space-x-3 text-[#1F2937] dark:text-[#F1F3F5]">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-1 rounded hover:bg-[#CCCCCC] dark:hover:bg-[#292535] transition-colors ${
              bookmarked ? 'text-[#FF8C00]' : 'text-[#717171] dark:text-[#858A99]'
            }`}
            title="Star problem"
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
            className="p-1 rounded hover:bg-[#CCCCCC] dark:hover:bg-[#292535] transition-colors text-[#1F2937] dark:text-[#F1F3F5]"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Split Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#B9B9B9] dark:divide-[#393443] overflow-hidden">
        
        {/* LEFT PANE: CODEFORCES PROBLEM STATEMENT */}
        <div className="p-6 overflow-y-auto space-y-5 bg-white dark:bg-[#1E1F26] text-[#1F2937] dark:text-[#F1F3F5] problem-statement">
          
          {/* Centered Codeforces Header & Limits */}
          <div className="header space-y-2">
            <div className="title text-[#3B5998] dark:text-[#4F7CFF]">
              {formattedId}. {problem.title}
            </div>

            <div className="text-center text-xs space-y-0.5 text-[#454545] dark:text-[#B7BBC7]">
              <div>
                <span className="property-title">time limit per test: </span>
                <span className="font-semibold">2.0 seconds</span>
              </div>
              <div>
                <span className="property-title">memory limit per test: </span>
                <span className="font-semibold">256 megabytes</span>
              </div>
              <div>
                <span className="property-title">input: </span>
                <span className="font-semibold">standard input</span>
              </div>
              <div>
                <span className="property-title">output: </span>
                <span className="font-semibold">standard output</span>
              </div>
              <div className="pt-1">
                <span className="property-title">rating: </span>
                <span className="font-bold font-mono px-1.5 py-0.2 rounded border border-current" style={{ color: diffInfo.color }}>
                  *{diffInfo.rating} ({problem.difficulty})
                </span>
              </div>
            </div>
          </div>

          {/* Statement Content */}
          {activeTab === 'problem' && (
            <div className="space-y-4 text-xs text-[#1F2937] dark:text-[#B7BBC7] leading-relaxed">
              
              <div className="whitespace-pre-line text-xs text-[#1F2937] dark:text-[#F1F3F5] leading-relaxed">
                {problem.statement}
              </div>

              {/* Input Section */}
              <div>
                <div className="section-title">Input</div>
                <div className="whitespace-pre-line text-[#1F2937] dark:text-[#B7BBC7]">{problem.inputFormat}</div>
              </div>

              {/* Output Section */}
              <div>
                <div className="section-title">Output</div>
                <div className="whitespace-pre-line text-[#1F2937] dark:text-[#B7BBC7]">{problem.outputFormat}</div>
              </div>

              {/* Constraints Section */}
              <div>
                <div className="section-title">Constraints</div>
                <pre className="bg-[#EFEFEF] dark:bg-[#15161B] p-2.5 rounded border border-[#B9B9B9] dark:border-[#393443] font-mono text-xs font-semibold whitespace-pre-wrap text-[#1F2937] dark:text-[#F1F3F5]">
                  {problem.constraints}
                </pre>
              </div>

              {/* Codeforces Examples Section (.sample-test) */}
              <div className="sample-test">
                <div className="section-title">Examples</div>

                <div className="input">
                  <div className="title">
                    <span>Input</span>
                    <button
                      onClick={copySampleInput}
                      className="text-[11px] text-[#3B5998] dark:text-[#4F7CFF] hover:underline font-bold flex items-center space-x-1"
                    >
                      {sampleCopied ? <Check className="w-3 h-3 text-[#008000]" /> : <Copy className="w-3 h-3" />}
                      <span>{sampleCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre>{problem.sampleInput}</pre>
                </div>

                <div className="output">
                  <div className="title">Output</div>
                  <pre>{problem.sampleOutput}</pre>
                </div>

                {problem.sampleExplanation && (
                  <div>
                    <div className="section-title">Note</div>
                    <div className="text-[#454545] dark:text-[#B7BBC7] italic text-xs leading-relaxed">
                      {problem.sampleExplanation}
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {activeTab === 'editorial' && (
            <div className="p-4 rounded cf-roundbox space-y-2 text-xs text-[#1F2937] dark:text-[#F1F3F5]">
              <div className="caption">Editorial & Counterexample Strategy</div>
              <div className="content space-y-2">
                <p>
                  To break this C++ implementation, carefully analyze boundary conditions, modular arithmetic overflows, or loop condition off-by-one bugs.
                </p>
                <div className="p-2.5 bg-[#E1E1E1] dark:bg-[#292535] rounded font-mono text-xs">
                  Target Language: GNU C++17 (-O2)
                </div>
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="cf-roundbox text-xs">
              <div className="caption">Submission History</div>
              <div className="content">
                {problem.solved ? (
                  <div className="text-[#008000] font-bold">
                    ✔ ACCEPTED: Counterexample found on BreakCase Platform
                  </div>
                ) : (
                  <div className="text-[#717171]">No successful counterexamples submitted yet.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANE: CODEVIEWER & COUNTEREXAMPLE INPUT */}
        <div className="flex flex-col bg-white dark:bg-[#1E1F26] overflow-hidden">
          
          {/* Top IDE Toolbar */}
          <div className="px-4 py-2 bg-[#E1E1E1] dark:bg-[#202129] border-b border-[#B9B9B9] dark:border-[#393443] flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-white dark:bg-[#1E1F26] text-[#1F2937] dark:text-[#F1F3F5] border border-[#B9B9B9] dark:border-[#393443] rounded px-3 py-1 text-xs font-mono font-bold focus:outline-none appearance-none pr-8 cursor-pointer"
                >
                  <option value="GNU G++17 7.3.0">GNU G++17 7.3.0</option>
                  <option value="GNU G++20 11.2.0">GNU G++20 11.2.0</option>
                  <option value="Clang++17">Clang++17 C++17</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#3B5998] dark:text-[#4F7CFF] absolute right-2.5 top-2 pointer-events-none" />
              </div>

              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors border ${
                  timerRunning
                    ? 'bg-[#FFF3E0] text-[#FF8C00] border-[#FF8C00]/40'
                    : 'bg-white dark:bg-[#1E1F26] text-[#3B5998] dark:text-[#4F7CFF] border-[#B9B9B9] dark:border-[#393443] hover:bg-[#E1E1E1] dark:hover:bg-[#292535]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{timerRunning ? formatTimer(seconds) : 'Start Timer ⏱'}</span>
              </button>
            </div>

            <div className="flex items-center space-x-2 text-[#3B5998] dark:text-[#4F7CFF]">
              <button
                onClick={() => setSeconds(0)}
                className="p-1 rounded hover:bg-[#CCCCCC] dark:hover:bg-[#292535] transition-colors"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Monaco Editor Workspace */}
          <div className="flex-1 bg-[#EFEFEF] dark:bg-[#15161B] relative min-h-[280px]">
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
                  fontFamily: "Consolas, 'Courier New', monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  lineNumbers: 'on',
                  folding: true,
                  padding: { top: 10, bottom: 10 },
                  renderLineHighlight: 'all',
                }}
              />
            )}
          </div>

          {/* Codeforces Style Counterexample Tester & Verdict Drawer */}
          <div className="bg-white dark:bg-[#1E1F26] border-t border-[#B9B9B9] dark:border-[#393443] p-3.5 space-y-3 shrink-0">
            
            {/* Input Form Header */}
            <div className="flex items-center justify-between text-xs text-[#3B5998] dark:text-[#4F7CFF] font-sans">
              <span className="font-bold flex items-center space-x-1.5">
                <Terminal className="w-4 h-4" />
                <span>Submit Counterexample Input:</span>
              </span>
              <span className="text-[11px] text-[#717171] dark:text-[#858A99] italic">
                Input will be parsed & validated against server constraints
              </span>
            </div>

            {/* Input Textarea */}
            <textarea
              rows={3}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Paste or type test case input here (e.g. 5\n1 -2 3 -4 5)..."
              className="w-full p-2.5 bg-[#F8FAFC] dark:bg-[#141519] text-[#1F2937] dark:text-[#F1F3F5] border border-[#B9B9B9] dark:border-[#393443] rounded font-mono text-xs focus:outline-none focus:border-[#3B5998] dark:focus:border-[#4F7CFF]"
            />

            {/* Submit CTA Button */}
            <div className="flex items-center justify-between">
              <button
                onClick={copySampleInput}
                className="px-2.5 py-1 text-xs border border-[#B9B9B9] dark:border-[#393443] rounded hover:bg-[#E1E1E1] dark:hover:bg-[#292535] text-[#454545] dark:text-[#B7BBC7] transition-colors font-semibold"
              >
                Insert Sample Case
              </button>

              <button
                onClick={handleTestCounterexample}
                disabled={evaluating || !inputVal.trim()}
                className="px-5 py-1.5 bg-[#3B5998] hover:bg-[#2E4577] dark:bg-[#4F7CFF] dark:hover:bg-[#3B67E6] disabled:opacity-50 text-white rounded font-bold text-xs transition-colors flex items-center space-x-2 shadow-xs cursor-pointer"
              >
                {evaluating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Compiling & Testing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Submit Counterexample</span>
                  </>
                )}
              </button>
            </div>

            {/* Execution Result Verdict Banner (Codeforces Style) */}
            {result && (
              <div
                className={`p-3 rounded border text-xs space-y-1.5 shadow-2xs font-sans ${
                  result.valid && result.broken
                    ? 'bg-[#DFF0D8] text-[#468847] border-[#D6E9C6] dark:bg-[#1E3A2B] dark:text-[#4CAF50] dark:border-[#2A523C]'
                    : result.valid && !result.broken
                    ? 'bg-[#F2DEDE] text-[#B94A48] border-[#EBCCD1] dark:bg-[#3A1E1E] dark:text-[#FF5252] dark:border-[#522A2A]'
                    : 'bg-[#FCF8E3] text-[#C09853] border-[#FAEBCC] dark:bg-[#3A331E] dark:text-[#FF9800] dark:border-[#52482A]'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <div className="flex items-center space-x-1.5">
                    {result.valid && result.broken ? (
                      <CheckCircle2 className="w-4 h-4 text-[#008000]" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    <span className="uppercase text-xs font-mono tracking-wide">
                      {result.valid && result.broken
                        ? '✔ ACCEPTED — COUNTEREXAMPLE FOUND!'
                        : result.valid && !result.broken
                        ? '✖ WRONG ANSWER — SOLUTION PASSED YOUR INPUT'
                        : '⚠ INVALID CONSTRAINTS — INPUT OUT OF BOUNDS'}
                    </span>
                  </div>
                </div>

                <p className="text-xs">{result.message}</p>

                {result.expectedOutput && result.actualOutput && (
                  <div className="pt-2 grid grid-cols-2 gap-2 font-mono text-[11px] border-t border-current/20">
                    <div>
                      <div className="font-bold opacity-80 mb-0.5">Expected Output:</div>
                      <pre className="p-1.5 bg-black/5 dark:bg-black/30 rounded overflow-x-auto whitespace-pre-wrap">
                        {result.expectedOutput}
                      </pre>
                    </div>
                    <div>
                      <div className="font-bold opacity-80 mb-0.5 font-sans">Buggy Solution Output:</div>
                      <pre className="p-1.5 bg-black/5 dark:bg-black/30 rounded overflow-x-auto whitespace-pre-wrap">
                        {result.actualOutput}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProblemPage;
