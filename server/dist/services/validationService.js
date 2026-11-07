"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
class ValidationService {
    /**
     * Validate user input against problem constraints based on problem number.
     */
    static validateInput(problemNumber, inputStr) {
        const trimmed = inputStr.trim();
        if (!trimmed) {
            return { valid: false, message: 'Input cannot be empty.' };
        }
        try {
            switch (problemNumber) {
                case 1:
                    return this.validateProblem1(trimmed);
                case 2:
                    return this.validateProblem2(trimmed);
                case 3:
                    return this.validateProblem3(trimmed);
                case 4:
                    return this.validateProblem4(trimmed);
                case 5:
                    return this.validateProblem5(trimmed);
                case 6:
                    return this.validateProblem6(trimmed);
                case 7:
                    return this.validateProblem7(trimmed);
                case 8:
                    return this.validateProblem8(trimmed);
                case 9:
                    return this.validateProblem9(trimmed);
                case 10:
                    return this.validateProblem10(trimmed);
                case 11:
                    return this.validateProblem11(trimmed);
                case 12:
                    return this.validateProblem12(trimmed);
                case 13:
                    return this.validateProblem13(trimmed);
                case 14:
                    return this.validateProblem14(trimmed);
                case 15:
                    return this.validateProblem15(trimmed);
                case 16:
                    return this.validateProblem16(trimmed);
                case 17:
                    return this.validateProblem17(trimmed);
                case 18:
                    return this.validateProblem18(trimmed);
                case 19:
                    return this.validateProblem19(trimmed);
                case 20:
                    return this.validateProblem20(trimmed);
                default:
                    return { valid: true };
            }
        }
        catch (err) {
            return { valid: false, message: `Input parsing error: ${err.message || 'Invalid format'}` };
        }
    }
    // Problem 1: The Range Maxima
    static validateProblem1(input) {
        const tokens = input.trim().split(/\s+/);
        if (tokens.length < 1)
            return { valid: false, message: 'Expected integer N.' };
        const n = parseInt(tokens[0], 10);
        if (isNaN(n) || n < 1 || n > 100000)
            return { valid: false, message: 'Constraint: 1 <= N <= 100000.' };
        if (tokens.length - 1 < n)
            return { valid: false, message: `Expected ${n} elements, got ${tokens.length - 1}.` };
        for (let i = 1; i <= n; i++) {
            const val = parseInt(tokens[i], 10);
            if (isNaN(val) || val < -1000000000 || val > 1000000000) {
                return { valid: false, message: `Constraint violated for element A[${i}]: -10^9 <= A_i <= 10^9.` };
            }
        }
        return { valid: true };
    }
    // Problem 2: Off-by-One Subarray Sum
    static validateProblem2(input) {
        const tokens = input.trim().split(/\s+/);
        if (tokens.length < 1)
            return { valid: false, message: 'Expected integer N.' };
        const n = parseInt(tokens[0], 10);
        if (isNaN(n) || n < 1 || n > 100000)
            return { valid: false, message: 'Constraint: 1 <= N <= 100000.' };
        if (tokens.length < n + 3)
            return { valid: false, message: `Expected N=${n} elements plus L and R.` };
        for (let i = 1; i <= n; i++) {
            const val = parseInt(tokens[i], 10);
            if (isNaN(val) || val < -10000 || val > 10000) {
                return { valid: false, message: `Constraint: -10^4 <= A_i <= 10^4.` };
            }
        }
        const l = parseInt(tokens[n + 1], 10);
        const r = parseInt(tokens[n + 2], 10);
        if (isNaN(l) || isNaN(r) || l < 1 || r > n || l > r) {
            return { valid: false, message: `Constraint: 1 <= L <= R <= N (${n}).` };
        }
        return { valid: true };
    }
    // Problem 3: Almost Palindrome
    static validateProblem3(input) {
        const s = input.trim();
        if (s.length < 1 || s.length > 100000)
            return { valid: false, message: 'Constraint: 1 <= |S| <= 100000.' };
        if (!/^[a-z]+$/.test(s))
            return { valid: false, message: 'String must contain only lowercase English letters (a-z).' };
        return { valid: true };
    }
    // Problem 4: Task Scheduler
    static validateProblem4(input) {
        const tokens = input.trim().split(/\s+/);
        if (tokens.length < 1)
            return { valid: false, message: 'Expected integer N.' };
        const n = parseInt(tokens[0], 10);
        if (isNaN(n) || n < 1 || n > 100000)
            return { valid: false, message: 'Constraint: 1 <= N <= 100000.' };
        if (tokens.length - 1 < n * 2)
            return { valid: false, message: `Expected ${n} pairs of (start, end) times.` };
        for (let i = 0; i < n; i++) {
            const s = parseInt(tokens[1 + i * 2], 10);
            const e = parseInt(tokens[1 + i * 2 + 1], 10);
            if (isNaN(s) || isNaN(e) || s < 0 || e > 1000000000 || s >= e) {
                return { valid: false, message: `Constraint for task ${i + 1}: 0 <= S_i < E_i <= 10^9.` };
            }
        }
        return { valid: true };
    }
    // Problem 5: Modular Power Calculation
    static validateProblem5(input) {
        const tokens = input.trim().split(/\s+/);
        if (tokens.length < 3)
            return { valid: false, message: 'Expected 3 integers: A, B, M.' };
        const a = parseInt(tokens[0], 10);
        const b = parseInt(tokens[1], 10);
        const m = parseInt(tokens[2], 10);
        if (isNaN(a) || isNaN(b) || isNaN(m))
            return { valid: false, message: 'A, B, and M must be integers.' };
        if (a < -1000000000 || a > 1000000000)
            return { valid: false, message: 'Constraint: -10^9 <= A <= 10^9.' };
        if (b < 0 || b > 1000000000)
            return { valid: false, message: 'Constraint: 0 <= B <= 10^9.' };
        if (m < 1 || m > 1000000000)
            return { valid: false, message: 'Constraint: 1 <= M <= 10^9.' };
        return { valid: true };
    }
    // Problem 6: Negative Parity Trap
    static validateProblem6(input) {
        const tokens = input.trim().split(/\s+/);
        if (tokens.length < 1)
            return { valid: false, message: 'Expected integer N.' };
        const n = parseInt(tokens[0], 10);
        if (isNaN(n) || n < 1 || n > 100000)
            return { valid: false, message: 'Constraint: 1 <= N <= 100000.' };
        if (tokens.length - 1 < n)
            return { valid: false, message: `Expected ${n} integers, received ${tokens.length - 1}.` };
        for (let i = 1; i <= n; i++) {
            const x = parseInt(tokens[i], 10);
            if (isNaN(x) || x < -1000000000 || x > 1000000000) {
                return { valid: false, message: `Constraint: -10^9 <= A_i <= 10^9.` };
            }
        }
        return { valid: true };
    }
    // Problem 7: 32-Bit Product Overflow
    static validateProblem7(input) {
        const tokens = input.trim().split(/\s+/);
        if (tokens.length < 1)
            return { valid: false, message: 'Expected integer N.' };
        const n = parseInt(tokens[0], 10);
        if (isNaN(n) || n < 1 || n > 100000)
            return { valid: false, message: 'Constraint: 1 <= N <= 100000.' };
        if (tokens.length - 1 < n * 2)
            return { valid: false, message: `Expected ${n} pairs of (Q_i, P_i).` };
        for (let i = 0; i < n; i++) {
            const q = parseInt(tokens[1 + i * 2], 10);
            const p = parseInt(tokens[1 + i * 2 + 1], 10);
            if (isNaN(q) || isNaN(p) || q < 1 || q > 1000000 || p < 1 || p > 1000000) {
                return { valid: false, message: `Constraint: 1 <= Q_i, P_i <= 10^6.` };
            }
        }
        return { valid: true };
    }
    // Problem 8: Lower Bound Binary Search
    static validateProblem8(input) {
        const tokens = input.trim().split(/\s+/);
        if (tokens.length < 2)
            return { valid: false, message: 'Expected N and X.' };
        const n = parseInt(tokens[0], 10);
        const x = parseInt(tokens[1], 10);
        if (isNaN(n) || n < 1 || n > 100000)
            return { valid: false, message: 'Constraint: 1 <= N <= 100000.' };
        if (isNaN(x) || x < -1000000000 || x > 1000000000)
            return { valid: false, message: 'Constraint: -10^9 <= X <= 10^9.' };
        if (tokens.length - 2 < n)
            return { valid: false, message: `Expected ${n} sorted array elements.` };
        let prev = -Infinity;
        for (let i = 2; i < 2 + n; i++) {
            const val = parseInt(tokens[i], 10);
            if (isNaN(val) || val < -1000000000 || val > 1000000000) {
                return { valid: false, message: 'Constraint: -10^9 <= A_i <= 10^9.' };
            }
            if (val < prev) {
                return { valid: false, message: 'Array must be sorted in non-decreasing order.' };
            }
            prev = val;
        }
        return { valid: true };
    }
    // Problem 9: Distinct Elements Counting
    static validateProblem9(input) {
        const tokens = input.trim().split(/\s+/);
        if (tokens.length < 1)
            return { valid: false, message: 'Expected integer N.' };
        const n = parseInt(tokens[0], 10);
        if (isNaN(n) || n < 1 || n > 100000)
            return { valid: false, message: 'Constraint: 1 <= N <= 100000.' };
        if (tokens.length - 1 < n)
            return { valid: false, message: `Expected ${n} array elements.` };
        for (let i = 1; i <= n; i++) {
            const val = parseInt(tokens[i], 10);
            if (isNaN(val) || val < -1000000000 || val > 1000000000) {
                return { valid: false, message: 'Constraint: -10^9 <= A_i <= 10^9.' };
            }
        }
        return { valid: true };
    }
    // Problem 10: Point Coordinate Sorting
    static validateProblem10(input) {
        const tokens = input.trim().split(/\s+/);
        if (tokens.length < 1)
            return { valid: false, message: 'Expected integer N.' };
        const n = parseInt(tokens[0], 10);
        if (isNaN(n) || n < 1 || n > 100000)
            return { valid: false, message: 'Constraint: 1 <= N <= 100000.' };
        if (tokens.length - 1 < n * 2)
            return { valid: false, message: `Expected ${n} coordinate pairs (X_i, Y_i).` };
        for (let i = 0; i < n; i++) {
            const x = parseInt(tokens[1 + i * 2], 10);
            const y = parseInt(tokens[1 + i * 2 + 1], 10);
            if (isNaN(x) || isNaN(y) || x < -1000000000 || x > 1000000000 || y < -1000000000 || y > 1000000000) {
                return { valid: false, message: 'Constraint: -10^9 <= X_i, Y_i <= 10^9.' };
            }
        }
        return { valid: true };
    }
    // Problem 11: Coin Change Greedy Trap
    static validateProblem11(input) {
        const tokens = input.trim().split(/\s+/);
        if (tokens.length < 2)
            return { valid: false, message: 'Expected integers N and V.' };
        const n = parseInt(tokens[0], 10);
        const v = parseInt(tokens[1], 10);
        if (isNaN(n) || n < 1 || n > 20)
            return { valid: false, message: 'Constraint: 1 <= N <= 20.' };
        if (isNaN(v) || v < 1 || v > 5000)
            return { valid: false, message: 'Constraint: 1 <= V <= 5000.' };
        if (tokens.length - 2 < n)
            return { valid: false, message: `Expected ${n} coin denominations.` };
        const coins = new Set();
        for (let i = 2; i < 2 + n; i++) {
            const c = parseInt(tokens[i], 10);
            if (isNaN(c) || c < 1 || c > 1000)
                return { valid: false, message: 'Constraint: 1 <= C_i <= 1000.' };
            coins.add(c);
        }
        if (!coins.has(1))
            return { valid: false, message: 'Denominations must include 1 (C_1 = 1) so all values can be made.' };
        return { valid: true };
    }
    // Problem 12: Bitwise Precedence Trap
    static validateProblem12(input) {
        const tokens = input.trim().split(/\s+/);
        if (tokens.length < 2)
            return { valid: false, message: 'Expected integers X and K.' };
        const x = parseInt(tokens[0], 10);
        const k = parseInt(tokens[1], 10);
        if (isNaN(x) || x < 0 || x > 1000000000)
            return { valid: false, message: 'Constraint: 0 <= X <= 10^9.' };
        if (isNaN(k) || k < 0 || k > 30)
            return { valid: false, message: 'Constraint: 0 <= K <= 30.' };
        return { valid: true };
    }
    // Problem 13: All-Negative Maximum Subarray
    static validateProblem13(input) {
        const tokens = input.trim().split(/\s+/);
        if (tokens.length < 1)
            return { valid: false, message: 'Expected integer N.' };
        const n = parseInt(tokens[0], 10);
        if (isNaN(n) || n < 1 || n > 100000)
            return { valid: false, message: 'Constraint: 1 <= N <= 100000.' };
        if (tokens.length - 1 < n)
            return { valid: false, message: `Expected ${n} elements.` };
        for (let i = 1; i <= n; i++) {
            const val = parseInt(tokens[i], 10);
            if (isNaN(val) || val < -1000000000 || val > 1000000000) {
                return { valid: false, message: 'Constraint: -10^9 <= A_i <= 10^9.' };
            }
        }
        return { valid: true };
    }
    // Problem 14: BFS on Weighted Graph
    static validateProblem14(input) {
        const tokens = input.trim().split(/\s+/);
        if (tokens.length < 2)
            return { valid: false, message: 'Expected integers N and M.' };
        const n = parseInt(tokens[0], 10);
        const m = parseInt(tokens[1], 10);
        if (isNaN(n) || n < 2 || n > 100000)
            return { valid: false, message: 'Constraint: 2 <= N <= 100000.' };
        if (isNaN(m) || m < 1 || m > 200000)
            return { valid: false, message: 'Constraint: 1 <= M <= 200000.' };
        if (tokens.length - 2 < m * 3)
            return { valid: false, message: `Expected ${m} edge triples (u, v, W).` };
        for (let i = 0; i < m; i++) {
            const u = parseInt(tokens[2 + i * 3], 10);
            const v = parseInt(tokens[2 + i * 3 + 1], 10);
            const w = parseInt(tokens[2 + i * 3 + 2], 10);
            if (isNaN(u) || isNaN(v) || isNaN(w) || u < 1 || u > n || v < 1 || v > n || w < 1 || w > 1000000) {
                return { valid: false, message: `Invalid edge: 1 <= u, v <= N (${n}), 1 <= W <= 10^6.` };
            }
        }
        return { valid: true };
    }
    // Problem 15: Strictly Increasing Subsequence
    static validateProblem15(input) {
        const tokens = input.trim().split(/\s+/);
        if (tokens.length < 1)
            return { valid: false, message: 'Expected integer N.' };
        const n = parseInt(tokens[0], 10);
        if (isNaN(n) || n < 1 || n > 100000)
            return { valid: false, message: 'Constraint: 1 <= N <= 100000.' };
        if (tokens.length - 1 < n)
            return { valid: false, message: `Expected ${n} elements.` };
        for (let i = 1; i <= n; i++) {
            const val = parseInt(tokens[i], 10);
            if (isNaN(val) || val < -1000000000 || val > 1000000000) {
                return { valid: false, message: 'Constraint: -10^9 <= A_i <= 10^9.' };
            }
        }
        return { valid: true };
    }
    // Problem 16: Touching Interval Disjoint Count
    static validateProblem16(input) {
        const tokens = input.trim().split(/\s+/);
        if (tokens.length < 1)
            return { valid: false, message: 'Expected integer N.' };
        const n = parseInt(tokens[0], 10);
        if (isNaN(n) || n < 1 || n > 100000)
            return { valid: false, message: 'Constraint: 1 <= N <= 100000.' };
        if (tokens.length - 1 < n * 2)
            return { valid: false, message: `Expected ${n} interval pairs [L_i, R_i].` };
        for (let i = 0; i < n; i++) {
            const l = parseInt(tokens[1 + i * 2], 10);
            const r = parseInt(tokens[1 + i * 2 + 1], 10);
            if (isNaN(l) || isNaN(r) || l < 0 || r > 1000000000 || l > r) {
                return { valid: false, message: `Constraint for interval ${i + 1}: 0 <= L_i <= R_i <= 10^9.` };
            }
        }
        return { valid: true };
    }
    // Problem 17: Modular Division Trap
    static validateProblem17(input) {
        const tokens = input.trim().split(/\s+/);
        if (tokens.length < 2)
            return { valid: false, message: 'Expected integers A and B.' };
        const a = parseInt(tokens[0], 10);
        const b = parseInt(tokens[1], 10);
        if (isNaN(a) || isNaN(b) || a < 1 || a > 1000000000 || b < 1 || b > 1000000000) {
            return { valid: false, message: 'Constraint: 1 <= A, B <= 10^9.' };
        }
        if (b % 1000000007 === 0) {
            return { valid: false, message: 'B must not be a multiple of 10^9+7.' };
        }
        return { valid: true };
    }
    // Problem 18: Fibonacci Zero Base Case
    static validateProblem18(input) {
        const trimmed = input.trim();
        if (!/^\d+$/.test(trimmed))
            return { valid: false, message: 'Expected non-negative integer N.' };
        try {
            const n = BigInt(trimmed);
            if (n < 0n || n > 1000000000000000000n) {
                return { valid: false, message: 'Constraint: 0 <= N <= 10^18.' };
            }
        }
        catch {
            return { valid: false, message: 'Invalid integer format for N.' };
        }
        return { valid: true };
    }
    // Problem 19: Shortest Subarray with Negative Sum
    static validateProblem19(input) {
        const tokens = input.trim().split(/\s+/);
        if (tokens.length < 2)
            return { valid: false, message: 'Expected integers N and S.' };
        const n = parseInt(tokens[0], 10);
        const s = parseInt(tokens[1], 10);
        if (isNaN(n) || n < 1 || n > 100000)
            return { valid: false, message: 'Constraint: 1 <= N <= 100000.' };
        if (isNaN(s) || s < -1000000000 || s > 1000000000)
            return { valid: false, message: 'Constraint: -10^9 <= S <= 10^9.' };
        if (tokens.length - 2 < n)
            return { valid: false, message: `Expected ${n} elements.` };
        for (let i = 2; i < 2 + n; i++) {
            const val = parseInt(tokens[i], 10);
            if (isNaN(val) || val < -1000000000 || val > 1000000000) {
                return { valid: false, message: 'Constraint: -10^9 <= A_i <= 10^9.' };
            }
        }
        return { valid: true };
    }
    // Problem 20: Disconnected Graph Diameter
    static validateProblem20(input) {
        const tokens = input.trim().split(/\s+/);
        if (tokens.length < 2)
            return { valid: false, message: 'Expected integers N and M.' };
        const n = parseInt(tokens[0], 10);
        const m = parseInt(tokens[1], 10);
        if (isNaN(n) || n < 1 || n > 100000)
            return { valid: false, message: 'Constraint: 1 <= N <= 100000.' };
        if (isNaN(m) || m < 0 || m > 200000)
            return { valid: false, message: 'Constraint: 0 <= M <= 200000.' };
        if (tokens.length - 2 < m * 2)
            return { valid: false, message: `Expected ${m} edge pairs (u, v).` };
        for (let i = 0; i < m; i++) {
            const u = parseInt(tokens[2 + i * 2], 10);
            const v = parseInt(tokens[2 + i * 2 + 1], 10);
            if (isNaN(u) || isNaN(v) || u < 1 || u > n || v < 1 || v > n) {
                return { valid: false, message: `Invalid edge: 1 <= u, v <= N (${n}).` };
            }
        }
        return { valid: true };
    }
}
exports.ValidationService = ValidationService;
