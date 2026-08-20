# BreakCase — Competitive Programming Counterexample Platform

> **"The solution looks correct. Your job is to break it."**

BreakCase is a modern, developer-oriented competitive-programming training web platform built around a unique debugging paradigm. Instead of asking users to write solutions from scratch, BreakCase presents them with:

1. A structured competitive-programming problem statement and constraints.
2. A seemingly correct **C++17** solution that compiles cleanly and passes sample tests.
3. The challenge: Find **ONE valid input counterexample within constraints** that makes the provided solution produce the wrong output.

---

## 🚀 Key Features

- **5 Handcrafted C++ Problems**: Ranging from Easy to Medium/Hard covering boundary conditions, off-by-one errors, greedy algorithmic flaws, string pointer branching, and negative modular exponentiation.
- **Sandboxed C++ Execution**: Server-side C++ compilation using `g++ -O2 -std=c++17` with strict process execution timeouts (2000ms) and buffer output limits (1MB).
- **Automated Input Constraint Validation**: Custom server-side validators enforcing exact token formats, integer bounds, and parameter constraints before execution.
- **Dual-Theme Developer Aesthetic**:
  - **Dark Mode (LeetCode-inspired)**: Near-black background (`#090d16`), dark slate cards (`#111827`), high readability, and green/amber status indicators.
  - **Light Mode (Codeforces-inspired)**: Clean, high-clarity technical UI (`#f8fafc`), crisp borders, and navy blue accents.
- **Desktop Two-Panel Layout**: Left panel holds the independently scrollable problem statement, constraints, and sample cases; Right panel holds the C++ code viewer, input editor, and execution feedback banner. Responsive stacked layout on mobile devices.
- **Secure Authentication**: Username/Email registration and login with bcrypt password hashing and JWT session tokens.
- **Progress Persistence**: Real-time progress tracking stored in a relational database (`User`, `Problem`, `Submission`, `Progress`).

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Monaco Editor (`@monaco-editor/react`), Lucide Icons, React Router v7.
- **Backend**: Node.js, Express.js, TypeScript, REST API, bcryptjs, jsonwebtoken.
- **Database & ORM**: SQLite / PostgreSQL via Prisma ORM v6.
- **Code Runner**: `/usr/bin/g++` compiler with isolated process execution via Node `child_process`.

---

## 📁 Repository Structure

```text
BreakCase/
├── client/                     # React + Vite + TypeScript Frontend
│   ├── src/
│   │   ├── components/         # Navbar, CodeViewer, ProblemCard, ThemeToggle
│   │   ├── context/            # AuthContext, ThemeContext
│   │   ├── pages/              # LandingPage, LoginPage, RegisterPage, DashboardPage, ProblemPage, ProgressPage
│   │   ├── services/           # API fetch client
│   │   └── types/              # TypeScript interface definitions
│   ├── vite.config.ts          # Vite configuration with API proxy to port 5001
│   └── package.json
│
├── server/                     # Express + TypeScript Backend
│   ├── src/
│   │   ├── controllers/        # AuthController, ProblemController, ProgressController
│   │   ├── middleware/         # AuthMiddleware (JWT verification)
│   │   ├── routes/             # authRoutes, problemRoutes, progressRoutes
│   │   ├── services/           # ExecutionService (g++ compiler & runner), ValidationService
│   │   └── index.ts            # Server entry point
│   └── package.json
│
├── prisma/                     # Database Schema & Seed Data
│   ├── schema.prisma           # Prisma ORM model definitions
│   └── seed.ts                 # Seeder for 5 C++ problems & reference solutions
│
├── scratch/                    # Binaries & automated test suites
│   ├── test_suite.js           # E2E test script
│   └── test_all_problems.js    # Comprehensive 5-problem counterexample test script
│
├── package.json                # Root monorepo configuration
└── README.md
```

---

## ⚙️ Environment Variables

Create `.env` files in both root and `server/`:

```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="breakcase-secret-key-2026-super-secure-jwt"
PORT=5001
```

---

## ⚡ Quick Start & Local Setup

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- C++ Compiler (`g++` or `clang++` in PATH)

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..

# Install client dependencies
cd client && npm install && cd ..
```

### 2. Database Migration & Problem Seeding

```bash
# Push Prisma schema to SQLite database
npx prisma db push --schema=./prisma/schema.prisma

# Seed 5 C++ problems into the database
npx ts-node --compiler-options '{"module":"CommonJS"}' ./prisma/seed.ts
```

### 3. Run Backend & Frontend Servers

**Terminal 1 (Backend Express Server on Port 5001):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend Vite Server on Port 3000):**
```bash
cd client
npm run dev
```

Open `http://localhost:3000` in your web browser.

---

## 🧪 Running Automated E2E Verification Tests

To run the complete automated test suite against a running server:

```bash
node scratch/test_all_problems.js
```

**Output Verification:**
```text
--- VERIFYING ALL 5 BREAKCASE PROBLEMS & COUNTEREXAMPLES ---

Testing Problem 1: The Range Maxima (Easy)
  Input: "3\n-15 -3 -42"
  Valid: true, Broken: true
  Message: ✓ Counterexample Found! You broke the solution.

Testing Problem 2: Off-by-One Subarray Sum (Easy/Medium)
  Input: "3\n5 5 5\n1 3"
  Valid: true, Broken: true
  Message: ✓ Counterexample Found! You broke the solution.

Testing Problem 3: Almost Palindrome (Medium)
  Input: "cbbcc"
  Valid: true, Broken: true
  Message: ✓ Counterexample Found! You broke the solution.

Testing Problem 4: Task Scheduler (Medium)
  Input: "3\n1 10\n2 3\n4 5"
  Valid: true, Broken: true
  Message: ✓ Counterexample Found! You broke the solution.

Testing Problem 5: Modular Power Calculation (Medium/Hard)
  Input: "-5 3 7"
  Valid: true, Broken: true
  Message: ✓ Counterexample Found! You broke the solution.

==============================================
FINAL USER PROGRESS: 5 / 5 Solved!
ALL 5 PROBLEMS BROKEN AND VERIFIED END-TO-END!
==============================================
```

---

## 🔒 Security & Code Execution Sandbox

- User input does **NOT** allow code injection; users only submit testcase data strings.
- Provided C++ solution and reference solution code are compiled once using system `g++ -O2 -std=c++17` into isolated binaries.
- Binaries execute via child processes with stdin/stdout piping, an absolute 2-second timeout, and a 1MB output buffer cap to prevent infinite loops, hangs, or resource exhaustion.
