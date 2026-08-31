import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ShieldAlert, Zap, Target, ArrowRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
      
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-yellow-400/10 text-sky-700 dark:text-yellow-400 border border-sky-200 dark:border-yellow-500/30 text-xs font-mono font-medium mb-6">
          <Terminal className="w-3.5 h-3.5" />
          <span>Competitive Programming Counterexample Platform</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight font-serif">
          Looks correct. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-sky-500 dark:from-yellow-400 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
            Break it.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Don't write another solution. Find the one valid input within constraints that makes a seemingly correct C++ algorithm fail.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-sky-600 hover:bg-sky-500 dark:bg-yellow-400 dark:hover:bg-yellow-300 text-white dark:text-zinc-950 shadow-lg shadow-sky-500/20 dark:shadow-yellow-500/10 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5"
          >
            <span>Start Breaking</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium bg-white dark:bg-zinc-900 border border-sky-200 dark:border-yellow-500/30 text-sky-800 dark:text-yellow-400 hover:bg-sky-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Log In
          </Link>
        </div>

        {/* Visual Workflow Diagram */}
        <div className="p-6 sm:p-8 rounded-2xl bg-sky-50/50 dark:bg-zinc-900 border border-sky-200 dark:border-yellow-500/30 shadow-xl max-w-3xl mx-auto">
          <div className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-6">
            The Core BreakCase Loop
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center font-mono text-xs text-center">
            
            {/* Step 1 */}
            <div className="p-3 rounded-lg bg-white dark:bg-black border border-sky-200 dark:border-yellow-500/30">
              <div className="font-bold text-sky-900 dark:text-yellow-400 mb-1">1. READ</div>
              <div className="text-slate-600 dark:text-zinc-400">Problem & Constraints</div>
            </div>

            <div className="hidden md:block text-slate-400 dark:text-yellow-500/50">→</div>

            {/* Step 2 */}
            <div className="p-3 rounded-lg bg-white dark:bg-black border border-sky-200 dark:border-yellow-500/30">
              <div className="font-bold text-amber-600 dark:text-yellow-400 mb-1">2. ANALYZE</div>
              <div className="text-slate-600 dark:text-zinc-400">Suspicious C++ Code</div>
            </div>

            <div className="hidden md:block text-slate-400 dark:text-yellow-500/50">→</div>

            {/* Step 3 */}
            <div className="p-3 rounded-lg bg-white dark:bg-black border border-sky-200 dark:border-yellow-500/30">
              <div className="font-bold text-sky-600 dark:text-yellow-400 mb-1">3. SUBMIT</div>
              <div className="text-slate-600 dark:text-zinc-400">Your Counterexample</div>
            </div>

            <div className="hidden md:block text-slate-400 dark:text-yellow-500/50">→</div>

            {/* Step 4 */}
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-yellow-400/20 border border-emerald-300 dark:border-yellow-500/50 text-emerald-700 dark:text-yellow-400">
              <div className="font-bold mb-1">4. BREAK IT</div>
              <div>✓ Solution Broken</div>
            </div>

          </div>
        </div>

      </div>

      {/* Feature Grid */}
      <div className="border-t border-sky-200 dark:border-yellow-500/30 bg-sky-50/30 dark:bg-zinc-900 py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex space-x-4">
            <div className="p-2.5 rounded-lg bg-sky-100 dark:bg-yellow-400/10 text-sky-600 dark:text-yellow-400 h-fit border border-sky-200 dark:border-yellow-500/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sky-900 dark:text-yellow-400 mb-1">Edge-Case Mindset</h3>
              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                Train your brain to spot off-by-one errors, integer overflow, greedy flaws, and boundary conditions.
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="p-2.5 rounded-lg bg-sky-100 dark:bg-yellow-400/10 text-sky-600 dark:text-yellow-400 h-fit border border-sky-200 dark:border-yellow-500/30">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sky-900 dark:text-yellow-400 mb-1">Real C++ Execution</h3>
              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                Your submitted test cases run against real compiled C++ binaries under strict resource limits.
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="p-2.5 rounded-lg bg-sky-100 dark:bg-yellow-400/10 text-sky-600 dark:text-yellow-400 h-fit border border-sky-200 dark:border-yellow-500/30">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sky-900 dark:text-yellow-400 mb-1">Focused V1 Experience</h3>
              <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                Zero clutter, zero meaningless gamification. Exactly 5 crafted problems to test your critical debugging skills.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LandingPage;

