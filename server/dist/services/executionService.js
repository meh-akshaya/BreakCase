"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionService = void 0;
const child_process_1 = require("child_process");
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const BIN_DIR = path_1.default.join(__dirname, '../../../scratch/bin');
if (!fs_1.default.existsSync(BIN_DIR)) {
    fs_1.default.mkdirSync(BIN_DIR, { recursive: true });
}
class ExecutionService {
    static binaryCache = new Map();
    /**
     * Compiles C++ code to a binary executable. Returns path to the binary.
     */
    static async compileCpp(cppCode, cacheKey) {
        const hash = crypto_1.default.createHash('md5').update(cppCode).digest('hex');
        const binaryName = `${cacheKey}_${hash}`;
        const binaryPath = path_1.default.join(BIN_DIR, binaryName);
        const cppPath = path_1.default.join(BIN_DIR, `${binaryName}.cpp`);
        if (fs_1.default.existsSync(binaryPath)) {
            return binaryPath;
        }
        // Write source file
        fs_1.default.writeFileSync(cppPath, cppCode, 'utf-8');
        // Compile with g++
        return new Promise((resolve, reject) => {
            const compileCmd = `g++ -O2 -std=c++17 "${cppPath}" -o "${binaryPath}"`;
            (0, child_process_1.exec)(compileCmd, { timeout: 10000 }, (err, stdout, stderr) => {
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
    static async runBinary(binaryPath, inputStr) {
        return new Promise((resolve) => {
            let child = (0, child_process_1.execFile)(binaryPath, [], {
                timeout: 2000, // 2 second timeout limit
                maxBuffer: 1024 * 1024, // 1 MB output limit
            }, (error, stdout, stderr) => {
                if (error && error.killed) {
                    return resolve({
                        success: false,
                        output: '',
                        error: 'Time Limit Exceeded (2s)',
                        timedOut: true,
                    });
                }
                if (error && error.code === 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER') {
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
            });
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
    static async runCounterexampleTest(problemId, buggyCpp, referenceCpp, inputStr) {
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
        const isCounterexample = buggyOutput.trim() !== expectedOutput.trim() ||
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
exports.ExecutionService = ExecutionService;
