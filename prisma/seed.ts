import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const problems = [
  {
    problemNumber: 1,
    title: 'The Range Maxima',
    slug: 'the-range-maxima',
    difficulty: 'Easy',
    tags: 'Arrays, Implementation',
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
    language: 'cpp'
  },
  {
    problemNumber: 2,
    title: 'Off-by-One Subarray Sum',
    slug: 'off-by-one-subarray-sum',
    difficulty: 'Easy/Medium',
    tags: 'Arrays, Prefix Sum',
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
    language: 'cpp'
  },
  {
    problemNumber: 3,
    title: 'Almost Palindrome',
    slug: 'almost-palindrome',
    difficulty: 'Medium',
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
    language: 'cpp'
  },
  {
    problemNumber: 4,
    title: 'Task Scheduler',
    slug: 'task-scheduler',
    difficulty: 'Medium',
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
    language: 'cpp'
  },
  {
    problemNumber: 5,
    title: 'Modular Power Calculation',
    slug: 'modular-power-calculation',
    difficulty: 'Medium/Hard',
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
    language: 'cpp'
  }
];

async function main() {
  console.log('Seeding BreakCase problems...');
  for (const prob of problems) {
    await prisma.problem.upsert({
      where: { problemNumber: prob.problemNumber },
      update: prob,
      create: prob,
    });
    console.log(`Seeded Problem ${prob.problemNumber}: ${prob.title}`);
  }
  console.log('Done seeding successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
