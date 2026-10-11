import React from 'react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-white dark:bg-[#17181D] text-[#1F2937] dark:text-[#F1F3F5] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Box 1: Why I Created This Project */}
        <div className="p-6 sm:p-7 rounded-lg border border-[#B9B9B9] dark:border-[#393443] bg-[#F8FAFC] dark:bg-[#1E1F26] shadow-xs">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B5998] dark:text-[#82A0DF] mb-3">
            Note from the Creator &bull;{' '}
            <a
              href="https://akshayaverma.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80 transition-opacity"
            >
              Akshaya
            </a>
          </div>
          <div className="space-y-3 text-sm sm:text-base leading-relaxed text-[#333333] dark:text-[#D1D5DB] font-sans">
            <p className="font-semibold text-[#111827] dark:text-[#FFFFFF]">
              Hey, this is{' '}
              <a
                href="https://akshayaverma.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3B5998] dark:text-[#82A0DF] underline hover:opacity-80 transition-opacity"
              >
                Akshaya
              </a>
              ,
            </p>
            <p>
              While working on problems on platforms like Codeforces, CodeChef, and LeetCode, I often ran into this recurring challenge: finding the hidden edge case that was silently breaking my solution.
            </p>
            <p>
              I couldn't find a dedicated platform where I could deliberately practice this exact pain point without having to solve every problem from scratch. So I built BreakCase.
            </p>
            <p>
              I work primarily in C++, so we are starting with C++ and a curated set of around 28 problems. This focused catalog lets you jump straight into the debugging mindset: you are given a problem and a seemingly correct C++ solution that passes sample tests, and your goal is to inspect the logic and find the counterexample input to <strong>BreakCase</strong>.
            </p>
          </div>
        </div>

        {/* Box 2: breakcase.md Section */}
        <div className="rounded-lg border border-[#B9B9B9] dark:border-[#393443] bg-white dark:bg-[#1C1D24] shadow-xs overflow-hidden">
          
          {/* Header bar styled like breakcase.md */}
          <div className="px-5 py-3 border-b border-[#B9B9B9] dark:border-[#393443] bg-[#EFEFEF] dark:bg-[#252630] flex items-center justify-between">
            <div className="flex items-center space-x-2 font-mono text-xs font-bold text-[#333333] dark:text-[#E0E0E0]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B9B9B9] dark:bg-[#555565] inline-block"></span>
              <span>breakcase.md</span>
            </div>
            <span className="text-[11px] font-mono text-[#666666] dark:text-[#9999AA]">
              Platform Specification
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-8 font-sans text-sm text-[#374151] dark:text-[#D1D5DB] leading-relaxed">
            
            {/* Overview */}
            <section className="space-y-2">
              <h2 className="text-lg font-bold font-mono text-[#111827] dark:text-[#FFFFFF]">
                # Overview
              </h2>
              <p>
                BreakCase is a competitive programming training environment designed around <strong>counterexample debugging</strong>. Instead of writing algorithmic code from scratch, users are presented with a problem description, input constraints, and a complete C++17 solution that compiles cleanly and passes all basic sample tests.
              </p>
              <p>
                The challenge is to analyze the logic, spot the underlying vulnerability (e.g., integer overflow, flawed heuristics, or off-by-one errors), and supply a single valid input within problem constraints that causes the solution to fail.
              </p>
            </section>

            {/* Flowchart */}
            <section className="space-y-3">
              <h3 className="text-base font-bold font-mono text-[#111827] dark:text-[#FFFFFF]">
                ## Workflow Flowchart
              </h3>
              
              <pre className="p-4 sm:p-5 rounded-md border border-[#D1D5DB] dark:border-[#343541] bg-[#F9FAFB] dark:bg-[#121318] text-[#111827] dark:text-[#E5E7EB] font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto shadow-2xs">
{`[ 1. Problem & Constraints ]
           │
           ▼
[ 2. Inspect Buggy C++ Code ]
   (passes sample tests)
           │
           ▼
[ 3. Submit Counterexample Input ]
   (single input within limits)
           │
     ┌─────┴─────┐
     ▼           ▼
[ Buggy Binary ] [ Reference Binary ]
 (g++ -O2 sandbox) (g++ -O2 sandbox)
     │           │
     ▼           ▼
[ Output A ]   [ Output B ]
     │           │
     └─────┬─────┘
           │
           ▼
[ 4. Output Comparator Engine ]
   (Output A ≠ Output B or RTE/TLE)
           │
           ▼
[ 5. VERDICT: SOLUTION BROKEN! ]`}
              </pre>
            </section>

            {/* Sandboxed Execution Engine */}
            <section className="space-y-2">
              <h3 className="text-base font-bold font-mono text-[#111827] dark:text-[#FFFFFF]">
                ## Sandboxed Execution Engine
              </h3>
              <p>
                When an input is submitted:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 font-mono text-xs text-[#4B5563] dark:text-[#9CA3AF]">
                <li><strong>Constraint Validation:</strong> Checks that the submitted input string conforms to all problem boundaries and formats.</li>
                <li><strong>Dual Execution:</strong> Compiles and executes both the buggy candidate and the gold-standard reference solution using <code>g++ -O2 -std=c++17</code>.</li>
                <li><strong>Resource Protection:</strong> Enforces standard CPU time (1000ms) and memory limits (256MB) to detect Time Limit Exceeded (TLE) and Runtime Errors (RTE).</li>
                <li><strong>Diff Evaluation:</strong> Compares stdout token by token. Any divergence between outputs results in a successful break verdict.</li>
              </ul>
            </section>

            {/* Targeted Edge Case Categories */}
            <section className="space-y-2">
              <h3 className="text-base font-bold font-mono text-[#111827] dark:text-[#FFFFFF]">
                ## Targeted Vulnerability Categories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded border border-[#E5E7EB] dark:border-[#30313E] bg-[#F9FAFB] dark:bg-[#1A1B22]">
                  <span className="font-bold text-[#111827] dark:text-[#F3F4F6]">1. Integer Overflow</span>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] mt-1">Multiplication or sum exceeding 32-bit signed limits without <code>long long</code>.</p>
                </div>
                <div className="p-3 rounded border border-[#E5E7EB] dark:border-[#30313E] bg-[#F9FAFB] dark:bg-[#1A1B22]">
                  <span className="font-bold text-[#111827] dark:text-[#F3F4F6]">2. Boundary Traps</span>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] mt-1">Extreme cases like N = 1, N = 0, all identical elements, or negative numbers.</p>
                </div>
                <div className="p-3 rounded border border-[#E5E7EB] dark:border-[#30313E] bg-[#F9FAFB] dark:bg-[#1A1B22]">
                  <span className="font-bold text-[#111827] dark:text-[#F3F4F6]">3. Off-by-One Errors</span>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] mt-1">Inclusive vs exclusive loop bounds, 0-indexing vs 1-indexing discrepancies.</p>
                </div>
                <div className="p-3 rounded border border-[#E5E7EB] dark:border-[#30313E] bg-[#F9FAFB] dark:bg-[#1A1B22]">
                  <span className="font-bold text-[#111827] dark:text-[#F3F4F6]">4. Flawed Greedy Assumptions</span>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] mt-1">Locally optimal choices that fail on counter-intuitive, non-monotonic inputs.</p>
                </div>
              </div>
            </section>

            {/* Quick Links */}
            <div className="pt-2 border-t border-[#E5E7EB] dark:border-[#30313E] flex items-center justify-between text-xs font-mono">
              <Link
                to="/problems"
                className="text-[#3B5998] dark:text-[#82A0DF] hover:underline font-bold"
              >
                &larr; View 28 Problem Catalog
              </Link>
              <Link
                to="/contribute"
                className="text-[#3B5998] dark:text-[#82A0DF] hover:underline font-bold"
              >
                Contribute a Problem &rarr;
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
