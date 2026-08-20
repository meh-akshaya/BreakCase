import { execFile, exec } from 'child_process';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  timedOut?: boolean;
}

const BIN_DIR = path.join(__dirname, '../../../scratch/bin');

if (!fs.existsSync(BIN_DIR)) {
  fs.mkdirSync(BIN_DIR, { recursive: true });
}

export class ExecutionService {
  private static binaryCache: Map<string, string> = new Map();

  /**
   * Compiles C++ code to a binary executable. Returns path to the binary.
   */
  public static async compileCpp(cppCode: string, cacheKey: string): Promise<string> {
    const hash = crypto.createHash('md5').update(cppCode).digest('hex');
    const binaryName = `${cacheKey}_${hash}`;
    const binaryPath = path.join(BIN_DIR, binaryName);
    const cppPath = path.join(BIN_DIR, `${binaryName}.cpp`);

    if (fs.existsSync(binaryPath)) {
      return binaryPath;
    }

    // Write source file
    fs.writeFileSync(cppPath, cppCode, 'utf-8');

    // Compile with g++
    return new Promise((resolve, reject) => {
      const compileCmd = `g++ -O2 -std=c++17 "${cppPath}" -o "${binaryPath}"`;
      exec(compileCmd, { timeout: 10000 }, (err, stdout, stderr) => {
        if (err) {
          console.error(`Compilation error for key [${cacheKey}]:`, stderr);
          return reject(new Error(`Compilation failed: ${stderr || err.message}`));
        }
        this.binaryCache.set(cacheKey, binaryPath);
        resolve(binaryPath);
      });
    });
  }

  /**
   * Executes a compiled C++ binary with the given input string.
   */
  public static async runBinary(binaryPath: string, inputStr: string): Promise<ExecutionResult> {
    return new Promise((resolve) => {
      let child = execFile(
        binaryPath,
        [],
        {
          timeout: 2000, // 2 second timeout limit
          maxBuffer: 1024 * 1024, // 1 MB output limit
        },
        (error, stdout, stderr) => {
          if (error && error.killed) {
            return resolve({
              success: false,
              output: '',
              error: 'Time Limit Exceeded (2s)',
              timedOut: true,
            });
          }

          if (error && (error as any).code === 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER') {
            return resolve({
              success: false,
              output: '',
              error: 'Output Limit Exceeded (1MB)',
            });
          }

          const output = (stdout || '').trim();
          resolve({
            success: true,
            output,
            error: stderr ? stderr.trim() : undefined,
          });
        }
      );

      // Write input to stdin
      if (child.stdin) {
        child.stdin.write(inputStr);
        child.stdin.end();
      }
    });
  }

  /**
   * High-level method: Compiles & executes both buggy and reference solutions for a problem.
   */
  public static async runCounterexampleTest(
    problemId: string,
    buggyCpp: string,
    referenceCpp: string,
    inputStr: string
  ): Promise<{
    buggyOutput: string;
    expectedOutput: string;
    isCounterexample: boolean;
    buggyError?: string;
    referenceError?: string;
  }> {
    const buggyBin = await this.compileCpp(buggyCpp, `prob_${problemId}_buggy`);
    const refBin = await this.compileCpp(referenceCpp, `prob_${problemId}_ref`);

    const [buggyRes, refRes] = await Promise.all([
      this.runBinary(buggyBin, inputStr),
      this.runBinary(refBin, inputStr),
    ]);

    const buggyOutput = buggyRes.output || (buggyRes.error ? `[Error: ${buggyRes.error}]` : '');
    const expectedOutput = refRes.output || (refRes.error ? `[Error: ${refRes.error}]` : '');

    // Solution is BROKEN (i.e. counterexample found) if buggy output differs from reference output!
    // Or if buggy code timed out / crashed while reference code completed cleanly!
    const isCounterexample: boolean =
      buggyOutput.trim() !== expectedOutput.trim() ||
      Boolean(buggyRes.timedOut && !refRes.timedOut);

    return {
      buggyOutput,
      expectedOutput,
      isCounterexample,
      buggyError: buggyRes.error,
      referenceError: refRes.error,
    };
  }
}
