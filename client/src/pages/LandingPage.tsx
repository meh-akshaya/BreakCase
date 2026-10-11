import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ShieldAlert, Zap, Target, ArrowRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-between bg-white dark:bg-[#17181D] text-[#1F2937] dark:text-[#F1F3F5]">
      
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EAF0FA] dark:bg-[#352E4A] text-[#3B5FA3] dark:text-[#6C5CE7] border border-[#D9DEE7] dark:border-[#393443] text-xs font-mono font-medium mb-6">
          <Terminal className="w-3.5 h-3.5" />
          <span>Competitive Programming Counterexample Platform</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight font-sans text-[#1F2937] dark:text-[#F1F3F5]">
          Looks correct. <br className="hidden sm:inline" />
          <span className="text-[#3B5FA3] dark:text-[#6C5CE7]">
            Break it.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-[#64748B] dark:text-[#B7BBC7] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Don't write another solution. Find the one valid input within constraints that makes a seemingly correct C++ algorithm fail.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-bold bg-[#3B5FA3] hover:bg-[#304F8C] dark:bg-[#6C5CE7] dark:hover:bg-[#7D6EFA] text-white shadow-xs flex items-center justify-center space-x-2 transition-all"
          >
            <span>Start Breaking</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-medium bg-white dark:bg-[#202127] border border-[#D9DEE7] dark:border-[#393443] text-[#3B5FA3] dark:text-[#F1F3F5] hover:bg-[#EAF0FA] dark:hover:bg-[#292535] transition-colors"
          >
            Log In
          </Link>
        </div>

        {/* Visual Workflow Diagram */}
        <div className="p-6 sm:p-8 rounded-lg bg-white dark:bg-[#202127] border border-[#D9DEE7] dark:border-[#393443] shadow-xs max-w-3xl mx-auto">
          <div className="text-xs font-mono text-[#64748B] dark:text-[#858A99] uppercase tracking-wider mb-6">
            The Core BreakCase Loop
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center font-mono text-xs text-center">
            
            {/* Step 1 */}
            <div className="p-3 rounded-md bg-[#F8FAFC] dark:bg-[#292535] border border-[#D9DEE7] dark:border-[#393443]">
              <div className="font-bold text-[#3B5FA3] dark:text-[#6C5CE7] mb-1">1. READ</div>
              <div className="text-[#64748B] dark:text-[#B7BBC7]">Problem & Constraints</div>
            </div>

            <div className="hidden md:block text-[#94A3B8] dark:text-[#858A99]">→</div>

            {/* Step 2 */}
            <div className="p-3 rounded-md bg-[#F8FAFC] dark:bg-[#292535] border border-[#D9DEE7] dark:border-[#393443]">
              <div className="font-bold text-[#D99A2B] dark:text-[#D99A2B] mb-1">2. ANALYZE</div>
              <div className="text-[#64748B] dark:text-[#B7BBC7]">Suspicious C++ Code</div>
            </div>

            <div className="hidden md:block text-[#94A3B8] dark:text-[#858A99]">→</div>

            {/* Step 3 */}
            <div className="p-3 rounded-md bg-[#F8FAFC] dark:bg-[#292535] border border-[#D9DEE7] dark:border-[#393443]">
              <div className="font-bold text-[#3B5FA3] dark:text-[#6C5CE7] mb-1">3. SUBMIT</div>
              <div className="text-[#64748B] dark:text-[#B7BBC7]">Your Counterexample</div>
            </div>

            <div className="hidden md:block text-[#94A3B8] dark:text-[#858A99]">→</div>

            {/* Step 4 */}
            <div className="p-3 rounded-md bg-[#E6F4ED] dark:bg-[#1E3A2B] border border-[#22A06B]/40 text-[#22A06B]">
              <div className="font-bold mb-1">4. BREAK IT</div>
              <div>✓ Solution Broken</div>
            </div>

          </div>
        </div>

      </div>

      {/* Feature Grid */}
      <div className="border-t border-[#D9DEE7] dark:border-[#393443] bg-white dark:bg-[#202127] py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex space-x-4">
            <div className="p-2.5 rounded-md bg-[#EAF0FA] dark:bg-[#292535] text-[#3B5FA3] dark:text-[#6C5CE7] h-fit border border-[#D9DEE7] dark:border-[#393443]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#1F2937] dark:text-[#F1F3F5] mb-1">Edge-Case Mindset</h3>
              <p className="text-sm text-[#64748B] dark:text-[#B7BBC7] leading-relaxed">
                Train your brain to spot off-by-one errors, integer overflow, greedy flaws, and boundary conditions.
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="p-2.5 rounded-md bg-[#EAF0FA] dark:bg-[#292535] text-[#3B5FA3] dark:text-[#6C5CE7] h-fit border border-[#D9DEE7] dark:border-[#393443]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#1F2937] dark:text-[#F1F3F5] mb-1">Real C++ Execution</h3>
              <p className="text-sm text-[#64748B] dark:text-[#B7BBC7] leading-relaxed">
                Your submitted test cases run against real compiled C++ binaries under strict resource limits.
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="p-2.5 rounded-md bg-[#EAF0FA] dark:bg-[#292535] text-[#3B5FA3] dark:text-[#6C5CE7] h-fit border border-[#D9DEE7] dark:border-[#393443]">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#1F2937] dark:text-[#F1F3F5] mb-1">Focused V1 Experience</h3>
              <p className="text-sm text-[#64748B] dark:text-[#B7BBC7] leading-relaxed">
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


