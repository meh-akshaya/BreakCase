import React from 'react';

export const ContributePage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-white dark:bg-[#17181D] text-[#1F2937] dark:text-[#F1F3F5] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Box 1: Contribution Invitation */}
        <div className="p-6 sm:p-7 rounded-lg border border-[#B9B9B9] dark:border-[#393443] bg-[#F8FAFC] dark:bg-[#1E1F26] shadow-xs">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B5998] dark:text-[#82A0DF] mb-3">
            Open-Source Contributions &bull; BreakCase
          </div>
          
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#333333] dark:text-[#D1D5DB] font-sans">
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-[#FFFFFF]">
              Recently stuck on a tricky edge case? Contribute it!
            </h1>
            
            <p>
              If you were solving a problem on Codeforces, CodeChef, or LeetCode and spent hours hunting down a sneaky edge case where a seemingly correct C++ solution failed, we want that problem on BreakCase.
            </p>

            <p>
              You can submit your problem by creating a Pull Request (PR) on GitHub. I will review and merge your question into the BreakCase platform, and credit your GitHub username/ID directly on the problem card.
            </p>

            <p className="font-medium text-[#82A0DF]">
              Contributing to BreakCase is also a great, hands-on way to learn and practice open-source workflows — from branching and staging to writing clean pull requests and collaborating on real projects.
            </p>

            <div className="pt-2">
              <a
                href="https://github.com/meh-akshaya/BreakCase"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2.5 rounded text-xs font-mono font-bold bg-[#3B5998] hover:bg-[#2E4577] dark:bg-[#4F7CFF] dark:hover:bg-[#3B67E6] text-white transition-colors"
              >
                Go to GitHub Repository &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Box 2: How to Contribute Step-by-Step */}
        <div className="rounded-lg border border-[#B9B9B9] dark:border-[#393443] bg-white dark:bg-[#1C1D24] shadow-xs overflow-hidden">
          
          <div className="px-5 py-3 border-b border-[#B9B9B9] dark:border-[#393443] bg-[#EFEFEF] dark:bg-[#252630] flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#333333] dark:text-[#E0E0E0]">
              CONTRIBUTING.md &bull; Submission Guide
            </span>
            <span className="text-[11px] font-mono text-[#666666] dark:text-[#9999AA]">
              Git PR Workflow
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-6 font-sans text-sm text-[#374151] dark:text-[#D1D5DB] leading-relaxed">
            
            <section className="space-y-4">
              <h2 className="text-base font-bold font-mono text-[#111827] dark:text-[#FFFFFF]">
                # 4-Step Contribution Process
              </h2>

              <div className="space-y-3 font-mono text-xs">
                
                <div className="p-4 rounded border border-[#E5E7EB] dark:border-[#30313E] bg-[#F9FAFB] dark:bg-[#1A1B22] space-y-1">
                  <div className="font-bold text-[#3B5998] dark:text-[#82A0DF]">Step 1: Fork & Clone</div>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF]">
                    Fork the repository at <code>https://github.com/meh-akshaya/BreakCase</code> and clone your fork locally:
                  </p>
                  <pre className="p-2 rounded bg-[#EFEFEF] dark:bg-[#121318] text-[#111827] dark:text-[#E5E7EB] overflow-x-auto mt-2">
                    git clone https://github.com/&lt;your-username&gt;/BreakCase.git
                  </pre>
                </div>

                <div className="p-4 rounded border border-[#E5E7EB] dark:border-[#30313E] bg-[#F9FAFB] dark:bg-[#1A1B22] space-y-1">
                  <div className="font-bold text-[#3B5998] dark:text-[#82A0DF]">Step 2: Prepare Your Problem</div>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF]">
                    Make sure you have:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-[#4B5563] dark:text-[#9CA3AF] mt-1">
                    <li>Clear problem statement and strict constraints</li>
                    <li>Sample input/output that passes on both codes</li>
                    <li>The buggy C++ solution that looks correct but fails</li>
                    <li>The reference correct C++ solution</li>
                    <li>The failing counterexample input and expected output</li>
                    <li>Your GitHub handle for author credit</li>
                  </ul>
                </div>

                <div className="p-4 rounded border border-[#E5E7EB] dark:border-[#30313E] bg-[#F9FAFB] dark:bg-[#1A1B22] space-y-1">
                  <div className="font-bold text-[#3B5998] dark:text-[#82A0DF]">Step 3: Add to Problem Catalog</div>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF]">
                    Add your problem JSON under the problems dataset directory following the structure below.
                  </p>
                </div>

                <div className="p-4 rounded border border-[#E5E7EB] dark:border-[#30313E] bg-[#F9FAFB] dark:bg-[#1A1B22] space-y-1">
                  <div className="font-bold text-[#3B5998] dark:text-[#82A0DF]">Step 4: Create a Pull Request</div>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF]">
                    Push your branch and open a PR with the title <code>feat: add problem &lt;Problem Title&gt;</code>. I will review, test the counterexample, and merge it with your credit!
                  </p>
                </div>

              </div>
            </section>

            {/* Template Format */}
            <section className="space-y-2">
              <h3 className="text-base font-bold font-mono text-[#111827] dark:text-[#FFFFFF]">
                ## Problem Template Format (JSON)
              </h3>
              <pre className="p-4 rounded border border-[#E5E7EB] dark:border-[#30313E] bg-[#F9FAFB] dark:bg-[#121318] text-[#111827] dark:text-[#E5E7EB] font-mono text-xs overflow-x-auto leading-normal">
{`{
  "title": "Problem Title",
  "difficulty": "800 - 1600",
  "author": "your-github-username",
  "description": "Clear statement of the problem...",
  "constraints": "1 <= N <= 10^5, -10^9 <= A[i] <= 10^9",
  "sampleInput": "3\\n1 2 3",
  "sampleOutput": "6",
  "buggyCode": "#include <iostream>\\nusing namespace std;\\nint main() { ... }",
  "referenceCode": "#include <iostream>\\nusing namespace std;\\nint main() { ... }",
  "counterexample": "2\\n1000000000 1000000000",
  "flawExplanation": "Integer overflow when calculating sum without using long long."
}`}
              </pre>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ContributePage;
