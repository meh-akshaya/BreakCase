export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export class ValidationService {
  /**
   * Validate user input against problem constraints based on problem slug or number.
   */
  static validateInput(problemNumber: number, inputStr: string): ValidationResult {
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
        default:
          return { valid: true };
      }
    } catch (err: any) {
      return { valid: false, message: `Input parsing error: ${err.message || 'Invalid format'}` };
    }
  }

  // Problem 1: The Range Maxima
  // Format: N \n A_1 A_2 ... A_N
  // Constraints: 1 <= N <= 100000, -10^9 <= A_i <= 10^9
  private static validateProblem1(input: string): ValidationResult {
    const tokens = input.trim().split(/\s+/);
    if (tokens.length < 1) {
      return { valid: false, message: 'Expected integer N on the first line.' };
    }

    const n = parseInt(tokens[0], 10);
    if (isNaN(n) || n < 1 || n > 100000) {
      return { valid: false, message: 'Constraint violated: 1 <= N <= 100000.' };
    }

    if (tokens.length - 1 < n) {
      return { valid: false, message: `Expected ${n} array elements, but received ${tokens.length - 1}.` };
    }

    for (let i = 1; i <= n; i++) {
      const val = parseInt(tokens[i], 10);
      if (isNaN(val) || val < -1000000000 || val > 1000000000) {
        return { valid: false, message: `Constraint violated for element A[${i}]: -10^9 <= A_i <= 10^9.` };
      }
    }

    return { valid: true };
  }

  // Problem 2: Off-by-One Subarray Sum
  // Format: N \n A_1 ... A_N \n L R
  // Constraints: 1 <= N <= 100000, -10^4 <= A_i <= 10^4, 1 <= L <= R <= N
  private static validateProblem2(input: string): ValidationResult {
    const tokens = input.trim().split(/\s+/);
    if (tokens.length < 1) {
      return { valid: false, message: 'Expected integer N.' };
    }

    const n = parseInt(tokens[0], 10);
    if (isNaN(n) || n < 1 || n > 100000) {
      return { valid: false, message: 'Constraint violated: 1 <= N <= 100000.' };
    }

    if (tokens.length < n + 3) {
      return { valid: false, message: `Expected N=${n} array elements plus L and R range parameters.` };
    }

    for (let i = 1; i <= n; i++) {
      const val = parseInt(tokens[i], 10);
      if (isNaN(val) || val < -10000 || val > 10000) {
        return { valid: false, message: `Constraint violated for array element A[${i}]: -10^4 <= A_i <= 10^4.` };
      }
    }

    const l = parseInt(tokens[n + 1], 10);
    const r = parseInt(tokens[n + 2], 10);

    if (isNaN(l) || isNaN(r)) {
      return { valid: false, message: 'L and R must be valid integers.' };
    }

    if (l < 1 || r > n || l > r) {
      return { valid: false, message: `Constraint violated: Range must satisfy 1 <= L <= R <= N (${n}). Got L=${l}, R=${r}.` };
    }

    return { valid: true };
  }

  // Problem 3: Almost Palindrome
  // Format: S
  // Constraints: 1 <= |S| <= 100000, lowercase english letters
  private static validateProblem3(input: string): ValidationResult {
    const s = input.trim();
    if (s.length < 1 || s.length > 100000) {
      return { valid: false, message: 'Constraint violated: String length must satisfy 1 <= |S| <= 100000.' };
    }

    if (!/^[a-z]+$/.test(s)) {
      return { valid: false, message: 'Constraint violated: String must contain only lowercase English letters (a-z).' };
    }

    return { valid: true };
  }

  // Problem 4: Task Scheduler
  // Format: N \n S_1 E_1 \n ... \n S_N E_N
  // Constraints: 1 <= N <= 100000, 0 <= S_i < E_i <= 10^9
  private static validateProblem4(input: string): ValidationResult {
    const tokens = input.trim().split(/\s+/);
    if (tokens.length < 1) {
      return { valid: false, message: 'Expected integer N.' };
    }

    const n = parseInt(tokens[0], 10);
    if (isNaN(n) || n < 1 || n > 100000) {
      return { valid: false, message: 'Constraint violated: 1 <= N <= 100000.' };
    }

    if (tokens.length - 1 < n * 2) {
      return { valid: false, message: `Expected ${n} pairs of (start, end) task times.` };
    }

    for (let i = 0; i < n; i++) {
      const s = parseInt(tokens[1 + i * 2], 10);
      const e = parseInt(tokens[1 + i * 2 + 1], 10);

      if (isNaN(s) || isNaN(e)) {
        return { valid: false, message: `Task ${i + 1} times must be valid integers.` };
      }

      if (s < 0 || e > 1000000000 || s >= e) {
        return { valid: false, message: `Constraint violated for task ${i + 1}: 0 <= S_i < E_i <= 10^9. Got S=${s}, E=${e}.` };
      }
    }

    return { valid: true };
  }

  // Problem 5: Modular Power Calculation
  // Format: A B M
  // Constraints: -10^9 <= A <= 10^9, 0 <= B <= 10^9, 1 <= M <= 10^9
  private static validateProblem5(input: string): ValidationResult {
    const tokens = input.trim().split(/\s+/);
    if (tokens.length < 3) {
      return { valid: false, message: 'Expected three space-separated integers: A, B, M.' };
    }

    const a = parseInt(tokens[0], 10);
    const b = parseInt(tokens[1], 10);
    const m = parseInt(tokens[2], 10);

    if (isNaN(a) || isNaN(b) || isNaN(m)) {
      return { valid: false, message: 'A, B, and M must be valid integers.' };
    }

    if (a < -1000000000 || a > 1000000000) {
      return { valid: false, message: 'Constraint violated: -10^9 <= A <= 10^9.' };
    }

    if (b < 0 || b > 1000000000) {
      return { valid: false, message: 'Constraint violated: 0 <= B <= 10^9.' };
    }

    if (m < 1 || m > 1000000000) {
      return { valid: false, message: 'Constraint violated: 1 <= M <= 10^9.' };
    }

    return { valid: true };
  }
}
