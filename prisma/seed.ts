import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const problems = [
  {
    problemNumber: 1,
    title: 'The Range Maxima',
    slug: 'the-range-maxima',
    difficulty: 'Easy',
    rating: 800,
    pattern: 'Initialization & Extremes',
    tags: 'Arrays, Implementation, Extremes',
    shortDescription: 'Find the maximum value in an array of sensor temperature readings.',
    statement: `Given an array of $N$ integer sensor temperature readings ($1 \\le N \\le 10^5$), find and print the maximum temperature among all sensor readings.

The readings can be positive, zero, or negative.`,
    inputFormat: `The first line contains a single integer $N$ ($1 \\le N \\le 10^5$) — the number of readings.
The second line contains $N$ space-separated integers $A_1, A_2, \\dots, A_N$ ($-10^9 \\le A_i \\le 10^9$).`,
    outputFormat: `Print a single integer — the maximum temperature value.`,
    constraints: `1 <= N <= 100000\n-10^9 <= A_i <= 10^9`,
    sampleInput: `4\n15 2 9 40`,
    sampleOutput: `40`,
    sampleExplanation: `40 is the largest value among 15, 2, 9, and 40.`,
    buggySolution: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    int max_val = 0; // Suspicious initialization
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (x > max_val) {
            max_val = x;
        }
    }
    cout << max_val << "\\n";
    return 0;
}`,
    referenceSolution: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    int max_val = INT_MIN;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (x > max_val) {
            max_val = x;
        }
    }
    cout << max_val << "\\n";
    return 0;
}`,
    hint: 'What happens if all sensor readings are strictly below freezing (< 0)?',
    editorial: `The buggy solution initializes 'max_val = 0'. If every reading in the array is negative (e.g. -15, -3, -42), 'x > max_val' is never true, so it outputs 0 instead of the true maximum -3. The reference solution initializes 'max_val = INT_MIN'.`,
    language: 'cpp'
  },
  {
    problemNumber: 2,
    title: 'Off-by-One Subarray Sum',
    slug: 'off-by-one-subarray-sum',
    difficulty: 'Easy/Medium',
    rating: 1100,
    pattern: 'Loop Bound Off-by-One',
    tags: 'Arrays, Prefix Sum, Off-by-One',
    shortDescription: 'Compute the range sum from 1-based index L to R in an array.',
    statement: `Given an array of $N$ integers ($1 \\le N \\le 10^5$) and a range query $[L, R]$ ($1 \\le L \\le R \\le N$), compute the sum of elements from 1-based index $L$ to $R$ inclusive: $A_L + A_{L+1} + \\dots + A_R$.`,
    inputFormat: `The first line contains an integer $N$.
The second line contains $N$ space-separated integers $A_1, A_2, \\dots, A_N$.
The third line contains two space-separated integers $L$ and $R$.`,
    outputFormat: `Print a single integer representing the range sum.`,
    constraints: `1 <= N <= 100000\n-10^4 <= A_i <= 10^4\n1 <= L <= R <= N`,
    sampleInput: `4\n10 20 0 40\n1 3`,
    sampleOutput: `30`,
    sampleExplanation: `A_1 + A_2 + A_3 = 10 + 20 + 0 = 30.`,
    buggySolution: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    int l, r;
    cin >> l >> r;
    long long sum = 0;
    // Suspicious range iteration logic
    for (int i = l; i < r; i++) {
        sum += a[i - 1];
    }
    cout << sum << "\\n";
    return 0;
}`,
    referenceSolution: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    int l, r;
    cin >> l >> r;
    long long sum = 0;
    for (int i = l; i <= r; i++) {
        sum += a[i - 1];
    }
    cout << sum << "\\n";
    return 0;
}`,
    hint: 'Look closely at the loop termination condition and whether element R is accumulated.',
    editorial: `The query requires summing from 1-based index L to R inclusive. The buggy code iterates 'for (int i = l; i < r; i++)', leaving out A[r - 1]. The reference solution loops 'for (int i = l; i <= r; i++)'.`,
    language: 'cpp'
  },
  {
    problemNumber: 3,
    title: 'Almost Palindrome',
    slug: 'almost-palindrome',
    difficulty: 'Medium',
    rating: 1400,
    pattern: 'Greedy Branching Pitfall',
    tags: 'Strings, Two Pointers, Greedy',
    shortDescription: 'Determine if a string can become a palindrome by removing at most one character.',
    statement: `Given a string $S$ consisting of lowercase English letters, determine if $S$ can be converted into a palindrome by deleting **at most one** character.

Output \`YES\` if it is possible, otherwise \`NO\`.`,
    inputFormat: `A single line containing the string $S$.`,
    outputFormat: `Print \`YES\` if $S$ can be turned into a palindrome by removing at most one character, otherwise print \`NO\`.`,
    constraints: `1 <= |S| <= 100000\nS contains only lowercase English letters ('a'-'z')`,
    sampleInput: `abca`,
    sampleOutput: `YES`,
    sampleExplanation: `Deleting 'b' yields "aca" (palindrome). Deleting 'c' yields "aba" (palindrome).`,
    buggySolution: `#include <iostream>
#include <string>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string s;
    if (!(cin >> s)) return 0;
    int left = 0, right = s.length() - 1;
    bool deleted = false;
    bool possible = true;

    while (left < right) {
        if (s[left] == s[right]) {
            left++;
            right--;
        } else {
            if (deleted) {
                possible = false;
                break;
            }
            // Suspicious greedy skip logic
            deleted = true;
            left++;
        }
    }

    if (possible) cout << "YES\\n";
    else cout << "NO\\n";
    return 0;
}`,
    referenceSolution: `#include <iostream>
#include <string>
using namespace std;

bool isPalindrome(const string& s, int l, int r) {
    while (l < r) {
        if (s[l] != s[r]) return false;
        l++;
        r--;
    }
    return true;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string s;
    if (!(cin >> s)) return 0;
    int left = 0, right = s.length() - 1;
    bool possible = true;

    while (left < right) {
        if (s[left] == s[right]) {
            left++;
            right--;
        } else {
            possible = isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1);
            break;
        }
    }

    if (possible) cout << "YES\\n";
    else cout << "NO\\n";
    return 0;
}`,
    hint: 'When a mismatch occurs, is skipping the left character always the right branch?',
    editorial: `When s[left] != s[right], either s[left] or s[right] could be the character to remove. The buggy code always skips 'left++'. On a string like "cbbcc", deleting the right 'c' leaves "cbbc" (valid palindrome), but buggy deletes the left 'c' yielding "bbcc" (not a palindrome) and outputs NO.`,
    language: 'cpp'
  },
  {
    problemNumber: 4,
    title: 'Task Scheduler',
    slug: 'task-scheduler',
    difficulty: 'Medium',
    rating: 1500,
    pattern: 'Greedy Sorting Comparator',
    tags: 'Greedy, Sorting, Scheduling',
    shortDescription: 'Find the maximum number of non-overlapping tasks.',
    statement: `Given $N$ tasks with start times $S_i$ and end times $E_i$, select the maximum number of tasks such that no two selected tasks overlap in time.

Two tasks $i$ and $j$ overlap if $\\max(S_i, S_j) < \\min(E_i, E_j)$. If task $i$ ends at time $T$ and task $j$ starts at time $T$, they do NOT overlap.`,
    inputFormat: `The first line contains an integer $N$ ($1 \\le N \\le 10^5$).
The next $N$ lines each contain two space-separated integers $S_i$ and $E_i$ ($0 \\le S_i < E_i \\le 10^9$).`,
    outputFormat: `Print a single integer representing the maximum number of non-overlapping tasks.`,
    constraints: `1 <= N <= 100000\n0 <= S_i < E_i <= 10^9`,
    sampleInput: `3\n1 3\n3 5\n5 7`,
    sampleOutput: `3`,
    sampleExplanation: `Tasks (1,3), (3,5), and (5,7) can all be completed without overlap.`,
    buggySolution: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Task {
    int start, end;
};

// Suspicious comparator sorting by start time
bool compareTasks(const Task& a, const Task& b) {
    if (a.start != b.start) return a.start < b.start;
    return a.end < b.end;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    vector<Task> tasks(n);
    for (int i = 0; i < n; i++) {
        cin >> tasks[i].start >> tasks[i].end;
    }
    sort(tasks.begin(), tasks.end(), compareTasks);
    
    int count = 0;
    int last_end = -1;
    for (int i = 0; i < n; i++) {
        if (tasks[i].start >= last_end) {
            count++;
            last_end = tasks[i].end;
        }
    }
    cout << count << "\\n";
    return 0;
}`,
    referenceSolution: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Task {
    int start, end;
};

// Correct greedy strategy sorts by end time
bool compareTasks(const Task& a, const Task& b) {
    if (a.end != b.end) return a.end < b.end;
    return a.start < b.start;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    vector<Task> tasks(n);
    for (int i = 0; i < n; i++) {
        cin >> tasks[i].start >> tasks[i].end;
    }
    sort(tasks.begin(), tasks.end(), compareTasks);
    
    int count = 0;
    int last_end = -1;
    for (int i = 0; i < n; i++) {
        if (tasks[i].start >= last_end) {
            count++;
            last_end = tasks[i].end;
        }
    }
    cout << count << "\\n";
    return 0;
}`,
    hint: 'What if an early-starting task lasts an exceptionally long time and blocks several shorter tasks?',
    editorial: `Sorting tasks by start time is flawed for interval scheduling. A long task starting early like (1, 10) will be chosen and prevent shorter tasks (2, 3) and (4, 5) from being selected. Optimal activity selection must sort by finish time ('a.end < b.end').`,
    language: 'cpp'
  },
  {
    problemNumber: 5,
    title: 'Modular Power Calculation',
    slug: 'modular-power-calculation',
    difficulty: 'Medium/Hard',
    rating: 1700,
    pattern: 'Negative Modulo Arithmetic',
    tags: 'Math, Number Theory, Implementation',
    shortDescription: 'Compute (A^B) mod M for an integer base A (can be negative).',
    statement: `Given three integers $A$, $B$, and $M$, compute $(A^B) \\pmod M$.

Note that $A$ can be negative, zero, or positive. The final output must be normalized to the standard non-negative range $[0, M-1]$.`,
    inputFormat: `A single line containing three space-separated integers $A$, $B$, and $M$.`,
    outputFormat: `Print a single integer representing $(A^B) \\pmod M$ in the range $[0, M-1]$.`,
    constraints: `-10^9 <= A <= 10^9\n0 <= B <= 10^9\n1 <= M <= 10^9`,
    sampleInput: `2 10 1000`,
    sampleOutput: `24`,
    sampleExplanation: `2^10 = 1024. 1024 mod 1000 = 24.`,
    buggySolution: `#include <iostream>
using namespace std;

long long power(long long base, long long exp, long long mod) {
    long long res = 1;
    // Suspicious modulo calculation for negative bases
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 == 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp /= 2;
    }
    return res;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long a, b, m;
    if (!(cin >> a >> b >> m)) return 0;
    cout << power(a, b, m) << "\\n";
    return 0;
}`,
    referenceSolution: `#include <iostream>
using namespace std;

long long power(long long base, long long exp, long long mod) {
    long long res = 1;
    base = (base % mod + mod) % mod; // Normalize base to non-negative [0, mod-1]
    while (exp > 0) {
        if (exp % 2 == 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp /= 2;
    }
    return res;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long a, b, m;
    if (!(cin >> a >> b >> m)) return 0;
    cout << power(a, b, m) << "\\n";
    return 0;
}`,
    hint: 'How does C++ calculate -5 % 7?',
    editorial: `In C++, the remainder operator '%' retains the sign of the numerator: '(-5) % 7 == -5'. Repeated multiplications retain negative values, violating the non-negative [0, M-1] requirement. The reference normalizes using '(base % mod + mod) % mod'.`,
    language: 'cpp'
  },
  {
    problemNumber: 6,
    title: 'Negative Parity Trap',
    slug: 'negative-parity-trap',
    difficulty: 'Easy',
    rating: 800,
    pattern: 'Parity on Negative Integers',
    tags: 'Math, Implementation, Parity',
    shortDescription: 'Count the number of odd integers in an array of N integers.',
    statement: `Given an array of $N$ integers ($1 \\le N \\le 10^5$), count how many elements are odd.

An integer $X$ is odd if it is not divisible by 2. The readings can be positive, zero, or negative.`,
    inputFormat: `The first line contains an integer $N$ ($1 \\le N \\le 10^5$).
The second line contains $N$ space-separated integers $A_1, A_2, \\dots, A_N$ ($-10^9 \\le A_i \\le 10^9$).`,
    outputFormat: `Print a single integer — the count of odd integers.`,
    constraints: `1 <= N <= 100000\n-10^9 <= A_i <= 10^9`,
    sampleInput: `4\n1 2 3 4`,
    sampleOutput: `2`,
    sampleExplanation: `1 and 3 are odd numbers.`,
    buggySolution: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    int count = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        // Suspicious parity check
        if (x % 2 == 1) {
            count++;
        }
    }
    cout << count << "\\n";
    return 0;
}`,
    referenceSolution: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    int count = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (x % 2 != 0) {
            count++;
        }
    }
    cout << count << "\\n";
    return 0;
}`,
    hint: 'What does (-3) % 2 evaluate to in C++?',
    editorial: `In C++, '(-3) % 2 == -1', not 1! Checking 'x % 2 == 1' fails for all negative odd numbers. The correct parity check is 'x % 2 != 0' or 'abs(x % 2) == 1'.`,
    language: 'cpp'
  },
  {
    problemNumber: 7,
    title: '32-Bit Product Overflow',
    slug: 'product-overflow',
    difficulty: 'Easy',
    rating: 900,
    pattern: '32-Bit Arithmetic Overflow',
    tags: 'Math, Overflow, Implementation',
    shortDescription: 'Calculate the total revenue from N sales orders with quantity and unit price.',
    statement: `Given $N$ customer orders, where order $i$ consists of quantity $Q_i$ and unit price $P_i$, calculate the grand total revenue:
$$\\sum_{i=1}^N (Q_i \\times P_i)$$`,
    inputFormat: `The first line contains an integer $N$ ($1 \\le N \\le 10^5$).
The next $N$ lines each contain two integers $Q_i$ and $P_i$ ($1 \\le Q_i, P_i \\le 10^6$).`,
    outputFormat: `Print a single integer representing total revenue.`,
    constraints: `1 <= N <= 100000\n1 <= Q_i, P_i <= 1000000`,
    sampleInput: `3\n2 5\n10 3\n4 2`,
    sampleOutput: `48`,
    sampleExplanation: `(2*5) + (10*3) + (4*2) = 10 + 30 + 8 = 48.`,
    buggySolution: `#include <iostream>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    int total = 0; // Suspicious 32-bit accumulator for revenue
    for (int i = 0; i < n; i++) {
        int q, p;
        cin >> q >> p;
        total += (q * p);
    }
    cout << total << "\\n";
    return 0;
}`,
    referenceSolution: `#include <iostream>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    long long total = 0;
    for (int i = 0; i < n; i++) {
        long long q, p;
        cin >> q >> p;
        total += (q * p);
    }
    cout << total << "\\n";
    return 0;
}`,
    hint: 'Notice the variable types of q and p when multiplied inside the loop.',
    editorial: `Although 'total' is a 64-bit 'long long', 'q' and 'p' are 32-bit signed ints. In C++, 'q * p' is evaluated as a 32-bit signed integer before being promoted to 'long long'. When Q_i = 100000 and P_i = 100000, 10^10 overflows 32-bit signed int to 1410065408.`,
    language: 'cpp'
  },
  {
    problemNumber: 8,
    title: 'Lower Bound Binary Search',
    slug: 'lower-bound-binary-search',
    difficulty: 'Easy/Medium',
    rating: 1000,
    pattern: 'Binary Search Boundary Condition',
    tags: 'Binary Search, Pointers, Search',
    shortDescription: 'Find the 1-based index of the first element >= X in a sorted array.',
    statement: `Given a sorted array of $N$ integers in non-decreasing order and a target value $X$, find the 1-based index of the first element that is $\\ge X$. If no element is $\\ge X$, print $-1$.`,
    inputFormat: `The first line contains two integers $N$ ($1 \\le N \\le 10^5$) and $X$ ($-10^9 \\le X \\le 10^9$).
The second line contains $N$ sorted integers $A_1, A_2, \\dots, A_N$.`,
    outputFormat: `Print the 1-based index of the first element >= X, or -1.`,
    constraints: `1 <= N <= 100000\n-10^9 <= X, A_i <= 10^9`,
    sampleInput: `4 8\n2 5 10 15`,
    sampleOutput: `3`,
    sampleExplanation: `The first element >= 8 is 10 at 1-based index 3.`,
    buggySolution: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    long long x;
    if (!(cin >> n >> x)) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    int l = 0, r = n - 1;
    int ans = -1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        // Suspicious comparison operator: strictly greater
        if (a[mid] > x) {
            ans = mid + 1;
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    cout << ans << "\\n";
    return 0;
}`,
    referenceSolution: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    long long x;
    if (!(cin >> n >> x)) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    int l = 0, r = n - 1;
    int ans = -1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (a[mid] >= x) {
            ans = mid + 1;
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    cout << ans << "\\n";
    return 0;
}`,
    hint: 'What happens when target X exists verbatim in the array?',
    editorial: `The problem asks for the first element >= X (lower_bound). The buggy solution checks 'if (a[mid] > x)', implementing upper_bound (first element strictly > X)! When X is absent from the array, upper_bound coincides with lower_bound, passing the sample. But when X is present (e.g. searching 5 in [1, 5, 10]), it skips 5 and returns index 3 (element 10).`,
    language: 'cpp'
  },
  {
    problemNumber: 9,
    title: 'Distinct Elements Counting',
    slug: 'distinct-elements-counting',
    difficulty: 'Easy/Medium',
    rating: 1100,
    pattern: 'Deduplication Without Prior Sort',
    tags: 'Arrays, Hashing, Implementation',
    shortDescription: 'Count the total number of distinct integers in an array.',
    statement: `Given an array of $N$ integers ($1 \\le N \\le 10^5$), determine the total number of distinct integers in the array.`,
    inputFormat: `The first line contains an integer $N$ ($1 \\le N \\le 10^5$).
The second line contains $N$ space-separated integers $A_1, A_2, \\dots, A_N$ ($-10^9 \\le A_i \\le 10^9$).`,
    outputFormat: `Print a single integer — the number of distinct elements.`,
    constraints: `1 <= N <= 100000\n-10^9 <= A_i <= 10^9`,
    sampleInput: `5\n1 1 2 3 3`,
    sampleOutput: `3`,
    sampleExplanation: `The distinct integers are 1, 2, and 3.`,
    buggySolution: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    // Suspicious: assuming duplicate elements are adjacent without sorting
    int distinct_count = 1;
    for (int i = 1; i < n; i++) {
        if (a[i] != a[i - 1]) {
            distinct_count++;
        }
    }
    cout << distinct_count << "\\n";
    return 0;
}`,
    referenceSolution: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    sort(a.begin(), a.end());
    int distinct_count = 1;
    for (int i = 1; i < n; i++) {
        if (a[i] != a[i - 1]) {
            distinct_count++;
        }
    }
    cout << distinct_count << "\\n";
    return 0;
}`,
    hint: 'Are identical elements in the input always placed adjacent to each other?',
    editorial: `The buggy solution checks 'a[i] != a[i - 1]', which only works if identical elements are adjacent. If duplicates are interleaved (e.g. 1 2 1 2), every transition is counted, reporting 4 instead of 2. Sorting before adjacent deduplication is required.`,
    language: 'cpp'
  },
  {
    problemNumber: 10,
    title: 'Point Coordinate Sorting',
    slug: 'point-coordinate-sorting',
    difficulty: 'Medium',
    rating: 1200,
    pattern: 'Sorting Tie-Breaker Pitfall',
    tags: 'Sorting, Comparators, Implementation',
    shortDescription: 'Sort 2D points primarily by X ascending, then by Y ascending.',
    statement: `Given $N$ 2D points $(X_i, Y_i)$, sort them primarily in ascending order of $X$-coordinate. If two points have identical $X$-coordinates, break ties by sorting them in ascending order of $Y$-coordinate.`,
    inputFormat: `The first line contains an integer $N$ ($1 \\le N \\le 10^5$).
The next $N$ lines each contain two integers $X_i$ and $Y_i$ ($-10^9 \\le X_i, Y_i \\le 10^9$).`,
    outputFormat: `Print $N$ lines, each containing the sorted coordinates X_i and Y_i separated by space.`,
    constraints: `1 <= N <= 100000\n-10^9 <= X_i, Y_i <= 10^9`,
    sampleInput: `3\n3 5\n1 2\n4 8`,
    sampleOutput: `1 2\n3 5\n4 8`,
    sampleExplanation: `Points sorted by X ascending: 1 < 3 < 4.`,
    buggySolution: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Point {
    long long x, y;
};

// Suspicious tie-breaker comparator
bool comparePoints(const Point& a, const Point& b) {
    if (a.x != b.x) return a.x < b.x;
    return a.y > b.y; // Inverted tie breaker
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    vector<Point> pts(n);
    for (int i = 0; i < n; i++) {
        cin >> pts[i].x >> pts[i].y;
    }
    sort(pts.begin(), pts.end(), comparePoints);
    for (int i = 0; i < n; i++) {
        cout << pts[i].x << " " << pts[i].y << "\\n";
    }
    return 0;
}`,
    referenceSolution: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Point {
    long long x, y;
};

bool comparePoints(const Point& a, const Point& b) {
    if (a.x != b.x) return a.x < b.x;
    return a.y < b.y;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    vector<Point> pts(n);
    for (int i = 0; i < n; i++) {
        cin >> pts[i].x >> pts[i].y;
    }
    sort(pts.begin(), pts.end(), comparePoints);
    for (int i = 0; i < n; i++) {
        cout << pts[i].x << " " << pts[i].y << "\\n";
    }
    return 0;
}`,
    hint: 'What happens when multiple points share the exact same X coordinate?',
    editorial: `The tie-breaker in the comparator sorts Y in descending order ('a.y > b.y') instead of ascending order ('a.y < b.y'). In the sample, all X coordinates were distinct, so the tie-breaker never fired. When two points have identical X, the buggy code prints larger Y first.`,
    language: 'cpp'
  },
  {
    problemNumber: 11,
    title: 'Coin Change Greedy Trap',
    slug: 'coin-change-greedy-trap',
    difficulty: 'Medium',
    rating: 1300,
    pattern: 'Greedy Choice Fallacy',
    tags: 'Dynamic Programming, Greedy, DP vs Greedy',
    shortDescription: 'Find minimum coins to make amount V given coin denominations.',
    statement: `You are given $N$ coin denominations $C_1, C_2, \\dots, C_N$ (with $C_1 = 1$), and a target amount $V$. You have an unlimited supply of each coin denomination. Find the minimum number of coins needed to make exactly amount $V$.`,
    inputFormat: `The first line contains two integers $N$ ($1 \\le N \\le 20$) and $V$ ($1 \\le V \\le 5000$).
The second line contains $N$ distinct integers $C_1, C_2, \\dots, C_N$.`,
    outputFormat: `Print a single integer — the minimum number of coins required.`,
    constraints: `1 <= N <= 20\n1 <= C_i <= 1000\n1 <= V <= 5000`,
    sampleInput: `3 15\n1 5 10`,
    sampleOutput: `2`,
    sampleExplanation: `Optimal combination is 10 + 5 = 15 using 2 coins.`,
    buggySolution: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, v;
    if (!(cin >> n >> v)) return 0;
    vector<int> c(n);
    for (int i = 0; i < n; i++) {
        cin >> c[i];
    }
    sort(c.rbegin(), c.rend());
    // Suspicious greedy strategy
    int ans = 0;
    for (int coin : c) {
        if (v >= coin) {
            ans += v / coin;
            v %= coin;
        }
    }
    cout << ans << "\\n";
    return 0;
}`,
    referenceSolution: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, v;
    if (!(cin >> n >> v)) return 0;
    vector<int> c(n);
    for (int i = 0; i < n; i++) {
        cin >> c[i];
    }
    vector<int> dp(v + 1, 1e9);
    dp[0] = 0;
    for (int i = 1; i <= v; i++) {
        for (int coin : c) {
            if (i >= coin) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    cout << dp[v] << "\\n";
    return 0;
}`,
    hint: 'Greedy coin change only works for canonical currency systems. What if denominations are {1, 6, 9} and target is 12?',
    editorial: `Greedy choice picks the largest denomination first. For denominations {1, 6, 9} and target 12, greedy picks 9 + 1 + 1 + 1 = 4 coins. The true optimal answer is 6 + 6 = 2 coins! Arbitrary coin systems require DP.`,
    language: 'cpp'
  },
  {
    problemNumber: 12,
    title: 'Bitwise Precedence Trap',
    slug: 'bitwise-precedence-trap',
    difficulty: 'Medium',
    rating: 1300,
    pattern: 'Bitwise Operator Precedence',
    tags: 'Bitwise, Math, C++ Pitfalls',
    shortDescription: 'Check if the K-th bit (2^K) of an integer X is set.',
    statement: `Given an integer $X$ and bit position $K$ ($0 \\le K \\le 30$), determine whether the $K$-th bit of $X$ (0-indexed, corresponding to value $2^K$) is 1. Print \`YES\` if set, otherwise \`NO\`.`,
    inputFormat: `A single line containing two space-separated integers $X$ and $K$.`,
    outputFormat: `Print \`YES\` or \`NO\`.`,
    constraints: `0 <= X <= 10^9\n0 <= K <= 30`,
    sampleInput: `5 0`,
    sampleOutput: `YES`,
    sampleExplanation: `5 in binary is 101_2; bit 0 is 1.`,
    buggySolution: `#include <iostream>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long x;
    int k;
    if (!(cin >> x >> k)) return 0;
    // Suspicious operator precedence without parentheses
    if (x & 1 << k != 0) {
        cout << "YES\\n";
    } else {
        cout << "NO\\n";
    }
    return 0;
}`,
    referenceSolution: `#include <iostream>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long x;
    int k;
    if (!(cin >> x >> k)) return 0;
    if ((x & (1LL << k)) != 0) {
        cout << "YES\\n";
    } else {
        cout << "NO\\n";
    }
    return 0;
}`,
    hint: 'In C++, does & or != have higher precedence?',
    editorial: `In C++, '!=' has higher operator precedence than bitwise '&'. The expression 'x & 1 << k != 0' evaluates as 'x & (1 << (k != 0))' or 'x & 1', which completely discards K and only checks if X is odd! The correct syntax is '(x & (1LL << k)) != 0'.`,
    language: 'cpp'
  },
  {
    problemNumber: 13,
    title: 'All-Negative Maximum Subarray',
    slug: 'all-negative-maximum-subarray',
    difficulty: 'Medium',
    rating: 1400,
    pattern: 'Kadane Negative Initialization',
    tags: 'Arrays, Dynamic Programming, Kadane',
    shortDescription: 'Find maximum contiguous subarray sum in an array of N integers.',
    statement: `Given an array of $N$ integers ($1 \\le N \\le 10^5$), find the maximum sum of any **non-empty** contiguous subarray.`,
    inputFormat: `The first line contains an integer $N$ ($1 \\le N \\le 10^5$).
The second line contains $N$ space-separated integers $A_1, A_2, \\dots, A_N$ ($-10^9 \\le A_i \\le 10^9$).`,
    outputFormat: `Print a single integer — the maximum non-empty subarray sum.`,
    constraints: `1 <= N <= 100000\n-10^9 <= A_i <= 10^9`,
    sampleInput: `5\n-2 1 -3 4 -1`,
    sampleOutput: `4`,
    sampleExplanation: `The contiguous subarray [4] has maximum sum 4.`,
    buggySolution: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    // Suspicious Kadane initialization to 0
    long long max_so_far = 0;
    long long current_max = 0;
    for (int i = 0; i < n; i++) {
        current_max += a[i];
        if (current_max < 0) current_max = 0;
        if (current_max > max_so_far) max_so_far = current_max;
    }
    cout << max_so_far << "\\n";
    return 0;
}`,
    referenceSolution: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    long long max_so_far = a[0];
    long long current_max = a[0];
    for (int i = 1; i < n; i++) {
        current_max = max(a[i], current_max + a[i]);
        max_so_far = max(max_so_far, current_max);
    }
    cout << max_so_far << "\\n";
    return 0;
}`,
    hint: 'The problem demands a non-empty subarray. What if every single number in the array is negative?',
    editorial: `Initializing 'max_so_far = 0' returns 0 when every element is negative. An empty subarray is not allowed. The correct maximum sum for [-7, -2, -9] is -2 (the element itself). Kadane must initialize 'max_so_far = a[0]'.`,
    language: 'cpp'
  },
  {
    problemNumber: 14,
    title: 'BFS on Weighted Graph',
    slug: 'bfs-on-weighted-graph',
    difficulty: 'Medium/Hard',
    rating: 1500,
    pattern: 'Dijkstra vs BFS on Weighted Graph',
    tags: 'Graphs, Shortest Path, Dijkstra, BFS',
    shortDescription: 'Find shortest path distance from vertex 1 to vertex N in a directed weighted graph.',
    statement: `Given a directed graph with $N$ vertices ($2 \\le N \\le 10^5$) and $M$ edges ($1 \\le M \\le 2 \\times 10^5$), each edge $(u, v)$ has a positive integer weight $W$. Find the minimum total weight of a path from vertex 1 to vertex $N$. If no path exists, print $-1$.`,
    inputFormat: `The first line contains two integers $N$ ($2 \\le N \\le 10^5$) and $M$ ($1 \\le M \\le 2 \\times 10^5$).
The next $M$ lines each contain three integers $u_i, v_i, W_i$ ($1 \\le u_i, v_i \\le N, 1 \\le W_i \\le 10^6$).`,
    outputFormat: `Print a single integer — the shortest distance to vertex N, or -1.`,
    constraints: `2 <= N <= 100000\n1 <= M <= 200000\n1 <= W_i <= 10^6`,
    sampleInput: `3 2\n1 2 5\n2 3 7`,
    sampleOutput: `12`,
    sampleExplanation: `Path 1 -> 2 -> 3 has total weight 5 + 7 = 12.`,
    buggySolution: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct Edge {
    int to;
    long long weight;
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<vector<Edge>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        long long w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
    }
    // Suspicious unweighted BFS queue
    queue<int> q;
    vector<long long> dist(n + 1, -1);
    vector<bool> visited(n + 1, false);
    dist[1] = 0;
    visited[1] = true;
    q.push(1);

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (const auto& edge : adj[u]) {
            if (!visited[edge.to]) {
                visited[edge.to] = true;
                dist[edge.to] = dist[u] + edge.weight;
                q.push(edge.to);
            }
        }
    }
    cout << dist[n] << "\\n";
    return 0;
}`,
    referenceSolution: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct Edge {
    int to;
    long long weight;
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<vector<Edge>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        long long w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
    }
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> pq;
    vector<long long> dist(n + 1, -1);
    pq.push({0, 1});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (dist[u] != -1) continue;
        dist[u] = d;
        if (u == n) break;
        for (const auto& edge : adj[u]) {
            if (dist[edge.to] == -1) {
                pq.push({d + edge.weight, edge.to});
            }
        }
    }
    cout << dist[n] << "\\n";
    return 0;
}`,
    hint: 'Does a path with fewer edges always have smaller total weight than a path with more edges?',
    editorial: `Standard queue BFS minimizes hop count, not total edge weight. If there is a direct edge 1 -> 3 of weight 100 and a 2-hop path 1 -> 2 -> 3 with weights 2 + 3 = 5, BFS reaches vertex 3 in 1 hop and records 100 instead of 5. Weighted shortest paths require Dijkstra.`,
    language: 'cpp'
  },
  {
    problemNumber: 15,
    title: 'Strictly Increasing Subsequence',
    slug: 'strictly-increasing-subsequence',
    difficulty: 'Medium/Hard',
    rating: 1600,
    pattern: 'Strictly vs Non-Decreasing LIS',
    tags: 'Dynamic Programming, Binary Search, LIS',
    shortDescription: 'Find length of the longest strictly increasing subsequence.',
    statement: `Given an array of $N$ integers ($1 \\le N \\le 10^5$), find the length of the longest **strictly** increasing subsequence ($A_{i_1} < A_{i_2} < \\dots < A_{i_k}$).`,
    inputFormat: `The first line contains an integer $N$ ($1 \\le N \\le 10^5$).
The second line contains $N$ space-separated integers $A_1, A_2, \\dots, A_N$ ($-10^9 \\le A_i \\le 10^9$).`,
    outputFormat: `Print a single integer — the length of the longest strictly increasing subsequence.`,
    constraints: `1 <= N <= 100000\n-10^9 <= A_i <= 10^9`,
    sampleInput: `6\n10 9 2 5 3 7`,
    sampleOutput: `3`,
    sampleExplanation: `The longest strictly increasing subsequence is [2, 5, 7] or [2, 3, 7] of length 3.`,
    buggySolution: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    vector<int> tails;
    for (int x : a) {
        // Suspicious binary search bound for strictly increasing
        auto it = upper_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) {
            tails.push_back(x);
        } else {
            *it = x;
        }
    }
    cout << tails.size() << "\\n";
    return 0;
}`,
    referenceSolution: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    vector<int> tails;
    for (int x : a) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) {
            tails.push_back(x);
        } else {
            *it = x;
        }
    }
    cout << tails.size() << "\\n";
    return 0;
}`,
    hint: 'What does upper_bound do when given duplicate identical values compared to lower_bound?',
    editorial: `In patience sorting / LIS, 'upper_bound' allows duplicate values to be treated as an increasing sequence, calculating the longest non-decreasing subsequence (where equal elements are allowed). For strictly increasing, identical elements must replace each other, which requires 'lower_bound'. On [5, 5, 5, 5], upper_bound outputs 4 instead of 1.`,
    language: 'cpp'
  },
  {
    problemNumber: 16,
    title: 'Touching Interval Disjoint Count',
    slug: 'touching-interval-merge',
    difficulty: 'Medium/Hard',
    rating: 1700,
    pattern: 'Interval Endpoint Touching',
    tags: 'Intervals, Sorting, Two Pointers',
    shortDescription: 'Merge overlapping/touching intervals and print the number of resulting disjoint intervals.',
    statement: `Given $N$ closed intervals $[L_i, R_i]$, two intervals touch or overlap if $\\max(L_a, L_b) \\le \\min(R_a, R_b)$ (e.g. $[1, 3]$ and $[3, 5]$ touch at point 3 and merge into $[1, 5]$). Merge all connected intervals and print the count of resulting disjoint intervals.`,
    inputFormat: `The first line contains an integer $N$ ($1 \\le N \\le 10^5$).
The next $N$ lines each contain two integers $L_i$ and $R_i$ ($0 \\le L_i \\le R_i \\le 10^9$).`,
    outputFormat: `Print a single integer — the number of disjoint merged intervals.`,
    constraints: `1 <= N <= 100000\n0 <= L_i <= R_i <= 10^9`,
    sampleInput: `3\n1 4\n2 6\n8 10`,
    sampleOutput: `2`,
    sampleExplanation: `[1, 4] and [2, 6] merge into [1, 6]. [8, 10] remains separate. Total 2 disjoint intervals.`,
    buggySolution: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Interval {
    long long l, r;
};

bool compareIntervals(const Interval& a, const Interval& b) {
    if (a.l != b.l) return a.l < b.l;
    return a.r < b.r;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    vector<Interval> intervals(n);
    for (int i = 0; i < n; i++) {
        cin >> intervals[i].l >> intervals[i].r;
    }
    sort(intervals.begin(), intervals.end(), compareIntervals);

    int count = 1;
    long long curr_r = intervals[0].r;
    for (int i = 1; i < n; i++) {
        // Suspicious strict inequality
        if (intervals[i].l < curr_r) {
            curr_r = max(curr_r, intervals[i].r);
        } else {
            count++;
            curr_r = intervals[i].r;
        }
    }
    cout << count << "\\n";
    return 0;
}`,
    referenceSolution: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Interval {
    long long l, r;
};

bool compareIntervals(const Interval& a, const Interval& b) {
    if (a.l != b.l) return a.l < b.l;
    return a.r < b.r;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    vector<Interval> intervals(n);
    for (int i = 0; i < n; i++) {
        cin >> intervals[i].l >> intervals[i].r;
    }
    sort(intervals.begin(), intervals.end(), compareIntervals);

    int count = 1;
    long long curr_r = intervals[0].r;
    for (int i = 1; i < n; i++) {
        if (intervals[i].l <= curr_r) {
            curr_r = max(curr_r, intervals[i].r);
        } else {
            count++;
            curr_r = intervals[i].r;
        }
    }
    cout << count << "\\n";
    return 0;
}`,
    hint: 'What happens when two closed intervals share the exact same boundary point (e.g. [1, 3] and [3, 5])?',
    editorial: `The problem statement explicitly specifies closed intervals: touching at a single point (intervals[i].l == curr_r) merges them. The buggy code checks 'intervals[i].l < curr_r', strictly requiring an interior overlap. Intervals [1, 3] and [3, 5] are incorrectly reported as 2 separate intervals instead of 1.`,
    language: 'cpp'
  },
  {
    problemNumber: 17,
    title: 'Modular Division Trap',
    slug: 'modular-division-trap',
    difficulty: 'Hard',
    rating: 1800,
    pattern: 'Integer Division vs Modular Inverse',
    tags: 'Number Theory, Modular Arithmetic, Math',
    shortDescription: 'Compute (A * B^-1) mod 10^9+7.',
    statement: `Given two positive integers $A$ and $B$, compute $(A \\times B^{-1}) \\pmod{10^9+7}$, where $B^{-1}$ is the modular multiplicative inverse of $B$ modulo $10^9+7$. It is guaranteed that $B \\not\\equiv 0 \\pmod{10^9+7}$.`,
    inputFormat: `A single line containing two space-separated integers $A$ and $B$ ($1 \\le A, B \\le 10^9$).`,
    outputFormat: `Print a single integer representing (A * B^-1) mod 10^9+7.`,
    constraints: `1 <= A, B <= 10^9`,
    sampleInput: `6 2`,
    sampleOutput: `3`,
    sampleExplanation: `6 * (2^-1) mod 10^9+7 = 3 because 3 * 2 = 6.`,
    buggySolution: `#include <iostream>
using namespace std;

const long long MOD = 1000000007;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long a, b;
    if (!(cin >> a >> b)) return 0;
    // Suspicious direct integer division
    long long ans = (a / b) % MOD;
    cout << ans << "\\n";
    return 0;
}`,
    referenceSolution: `#include <iostream>
using namespace std;

const long long MOD = 1000000007;

long long modExp(long long base, long long exp) {
    long long res = 1;
    base %= MOD;
    while (exp > 0) {
        if (exp % 2 == 1) res = (res * base) % MOD;
        base = (base * base) % MOD;
        exp /= 2;
    }
    return res;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long a, b;
    if (!(cin >> a >> b)) return 0;
    long long b_inv = modExp(b, MOD - 2);
    long long ans = (a % MOD * b_inv) % MOD;
    cout << ans << "\\n";
    return 0;
}`,
    hint: 'In modular arithmetic, division by B is multiplication by the modular inverse B^(MOD - 2) mod MOD.',
    editorial: `The buggy code uses standard integer truncation division 'a / b'. In modular arithmetic, division is not ordinary integer division. For instance, 4 / 3 in modulo 10^9+7 is 4 * 333333336 mod 10^9+7 = 333333337, whereas '4 / 3' evaluates to 1.`,
    language: 'cpp'
  },
  {
    problemNumber: 18,
    title: 'Fibonacci Zero Base Case',
    slug: 'fibonacci-zero-base-case',
    difficulty: 'Hard',
    rating: 1900,
    pattern: 'Zero Base Case Unhandled',
    tags: 'Matrix Exponentiation, Math, Edge Case',
    shortDescription: 'Compute N-th Fibonacci number modulo 10^9+7.',
    statement: `Given an integer $N$ ($0 \\le N \\le 10^{18}$), compute $F(N) \\pmod{10^9+7}$, where $F(0) = 0, F(1) = 1$, and $F(n) = F(n-1) + F(n-2)$ for $n \\ge 2$.`,
    inputFormat: `A single line containing the integer $N$ ($0 \\le N \\le 10^{18}$).`,
    outputFormat: `Print a single integer — F(N) mod 10^9+7.`,
    constraints: `0 <= N <= 1000000000000000000`,
    sampleInput: `5`,
    sampleOutput: `5`,
    sampleExplanation: `F(0)=0, F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5.`,
    buggySolution: `#include <iostream>
#include <vector>
using namespace std;

const long long MOD = 1000000007;

void multiply(long long F[2][2], long long M[2][2]) {
    long long x = (F[0][0] * M[0][0] + F[0][1] * M[1][0]) % MOD;
    long long y = (F[0][0] * M[0][1] + F[0][1] * M[1][1]) % MOD;
    long long z = (F[1][0] * M[0][0] + F[1][1] * M[1][0]) % MOD;
    long long w = (F[1][0] * M[0][1] + F[1][1] * M[1][1]) % MOD;
    F[0][0] = x; F[0][1] = y;
    F[1][0] = z; F[1][1] = w;
}

void power(long long F[2][2], long long n) {
    if (n <= 1) return;
    long long M[2][2] = {{1, 1}, {1, 0}};
    power(F, n / 2);
    multiply(F, F);
    if (n % 2 != 0) multiply(F, M);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long n;
    if (!(cin >> n)) return 0;
    // Missing base case check for n = 0!
    long long F[2][2] = {{1, 1}, {1, 0}};
    power(F, n - 1);
    cout << F[0][0] << "\\n";
    return 0;
}`,
    referenceSolution: `#include <iostream>
#include <vector>
using namespace std;

const long long MOD = 1000000007;

void multiply(long long F[2][2], long long M[2][2]) {
    long long x = (F[0][0] * M[0][0] + F[0][1] * M[1][0]) % MOD;
    long long y = (F[0][0] * M[0][1] + F[0][1] * M[1][1]) % MOD;
    long long z = (F[1][0] * M[0][0] + F[1][1] * M[1][0]) % MOD;
    long long w = (F[1][0] * M[0][1] + F[1][1] * M[1][1]) % MOD;
    F[0][0] = x; F[0][1] = y;
    F[1][0] = z; F[1][1] = w;
}

void power(long long F[2][2], long long n) {
    if (n <= 1) return;
    long long M[2][2] = {{1, 1}, {1, 0}};
    power(F, n / 2);
    multiply(F, F);
    if (n % 2 != 0) multiply(F, M);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long n;
    if (!(cin >> n)) return 0;
    if (n == 0) {
        cout << 0 << "\\n";
        return 0;
    }
    long long F[2][2] = {{1, 1}, {1, 0}};
    power(F, n - 1);
    cout << F[0][0] << "\\n";
    return 0;
}`,
    hint: 'Check the constraints. Does N include 0? What does F(0) equal?',
    editorial: `Matrix exponentiation computes M^(n-1). For N = 0, computing M^(-1) or running power with negative exponent produces F[0][0] = 1 instead of F(0) = 0. Explicit base cases for N = 0 must always be guarded.`,
    language: 'cpp'
  },
  {
    problemNumber: 19,
    title: 'Shortest Subarray with Negative Sum',
    slug: 'shortest-subarray-negative-sum',
    difficulty: 'Hard',
    rating: 2000,
    pattern: 'Two Pointers on Non-Monotonic Array',
    tags: 'Sliding Window, Two Pointers, Monotonicity',
    shortDescription: 'Find length of shortest contiguous subarray with sum >= S.',
    statement: `Given an array of $N$ integers ($1 \\le N \\le 10^5$) and an integer $S$, find the minimum length of a contiguous subarray whose sum is at least $S$. If no such subarray exists, print $-1$. Note: elements can be negative.`,
    inputFormat: `The first line contains two integers $N$ ($1 \\le N \\le 10^5$) and $S$ ($-10^9 \\le S \\le 10^9$).
The second line contains $N$ space-separated integers $A_1, A_2, \\dots, A_N$ ($-10^9 \\le A_i \\le 10^9$).`,
    outputFormat: `Print a single integer — the minimum length of a valid subarray, or -1.`,
    constraints: `1 <= N <= 100000\n-10^9 <= S, A_i <= 10^9`,
    sampleInput: `5 11\n1 2 3 4 5`,
    sampleOutput: `3`,
    sampleExplanation: `Subarray [3, 4, 5] has sum 12 >= 11 and length 3.`,
    buggySolution: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    long long s;
    if (!(cin >> n >> s)) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    // Suspicious two-pointer sliding window assuming positive numbers
    int l = 0;
    long long current_sum = 0;
    int min_len = 1e9;
    for (int r = 0; r < n; r++) {
        current_sum += a[r];
        while (current_sum >= s && l <= r) {
            min_len = min(min_len, r - l + 1);
            current_sum -= a[l++];
        }
    }
    if (min_len == 1e9) cout << -1 << "\\n";
    else cout << min_len << "\\n";
    return 0;
}`,
    referenceSolution: `#include <iostream>
#include <vector>
#include <deque>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    long long s;
    if (!(cin >> n >> s)) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    vector<long long> P(n + 1, 0);
    for (int i = 0; i < n; i++) {
        P[i + 1] = P[i] + a[i];
    }
    int min_len = 1e9;
    deque<int> dq;
    for (int y = 0; y <= n; y++) {
        while (!dq.empty() && P[y] - P[dq.front()] >= s) {
            min_len = min(min_len, y - dq.front());
            dq.pop_front();
        }
        while (!dq.empty() && P[y] <= P[dq.back()]) {
            dq.pop_back();
        }
        dq.push_back(y);
    }
    if (min_len == 1e9) cout << -1 << "\\n";
    else cout << min_len << "\\n";
    return 0;
}`,
    hint: 'Sliding window two-pointers requires monotonic sums. What happens when array elements are negative?',
    editorial: `Two pointers fails when array elements can be negative, because shrinking the window from the left can INCREASE the subarray sum (by discarding negative numbers)! Finding the shortest subarray with sum >= S with negative elements requires a monotonic deque with prefix sums in O(N).`,
    language: 'cpp'
  },
  {
    problemNumber: 20,
    title: 'Disconnected Graph Diameter',
    slug: 'disconnected-graph-diameter',
    difficulty: 'Hard',
    rating: 2100,
    pattern: 'Disconnected Component Assumption',
    tags: 'Graphs, Trees, BFS, Connectivity',
    shortDescription: 'Find graph diameter or report if graph is disconnected.',
    statement: `You are given an undirected unweighted graph with $N$ vertices ($1 \\le N \\le 10^5$) and $M$ edges ($0 \\le M \\le 2 \\times 10^5$). The diameter of a graph is the maximum shortest-path distance between any pair of vertices. If the graph is not connected (it has 2 or more separate components), print $-1$.`,
    inputFormat: `The first line contains two integers $N$ ($1 \\le N \\le 10^5$) and $M$ ($0 \\le M \\le 2 \\times 10^5$).
The next $M$ lines each contain two integers $u_i$ and $v_i$ ($1 \\le u_i, v_i \\le N$).`,
    outputFormat: `Print a single integer — the graph diameter, or -1 if disconnected.`,
    constraints: `1 <= N <= 100000\n0 <= M <= 200000`,
    sampleInput: `4 3\n1 2\n2 3\n3 4`,
    sampleOutput: `3`,
    sampleExplanation: `The graph is a line of 4 vertices with diameter distance 3.`,
    buggySolution: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

pair<int, int> bfs(int start, int n, const vector<vector<int>>& adj) {
    vector<int> dist(n + 1, -1);
    queue<int> q;
    q.push(start);
    dist[start] = 0;
    int farthest = start, max_d = 0;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        if (dist[u] > max_d) {
            max_d = dist[u];
            farthest = u;
        }
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return {farthest, max_d};
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    // Suspicious: assuming graph is connected without checking visited count!
    auto [farthest1, d1] = bfs(1, n, adj);
    auto [farthest2, diameter] = bfs(farthest1, n, adj);
    cout << diameter << "\\n";
    return 0;
}`,
    referenceSolution: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

struct BFSResult {
    int farthest;
    int max_d;
    int visited_count;
};

BFSResult bfs(int start, int n, const vector<vector<int>>& adj) {
    vector<int> dist(n + 1, -1);
    queue<int> q;
    q.push(start);
    dist[start] = 0;
    int farthest = start, max_d = 0, count = 0;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        count++;
        if (dist[u] > max_d) {
            max_d = dist[u];
            farthest = u;
        }
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return {farthest, max_d, count};
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, m;
    if (!(cin >> n >> m)) return 0;
    if (n == 1) {
        cout << 0 << "\\n";
        return 0;
    }
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    auto res1 = bfs(1, n, adj);
    if (res1.visited_count < n) {
        cout << -1 << "\\n";
        return 0;
    }
    auto res2 = bfs(res1.farthest, n, adj);
    cout << res2.max_d << "\\n";
    return 0;
}`,
    hint: 'Does an undirected graph with M < N - 1 ever have a single connected component?',
    editorial: `The buggy solution runs double BFS starting at vertex 1, assuming that vertex 1 can reach all other vertices. If the graph is disconnected (e.g. vertices 3 and 4 are isolated), double BFS computes the diameter of only the component containing vertex 1, failing to report -1 for a disconnected graph.`,
    language: 'cpp'
  }
];

async function main() {
  console.log(`Seeding ${problems.length} BreakCase problems...`);
  for (const prob of problems) {
    await prisma.problem.upsert({
      where: { problemNumber: prob.problemNumber },
      update: prob,
      create: prob,
    });
    console.log(`Seeded Problem ${prob.problemNumber} (*${prob.rating}): ${prob.title} [${prob.pattern}]`);
  }
  console.log('Done seeding all 20 problems successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
