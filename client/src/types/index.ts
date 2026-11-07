export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface Problem {
  id: string;
  problemNumber: number;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Easy/Medium' | 'Medium' | 'Medium/Hard' | 'Hard';
  rating: number;
  pattern?: string;
  tags: string[];
  shortDescription: string;
  statement?: string;
  inputFormat?: string;
  outputFormat?: string;
  constraints?: string;
  sampleInput?: string;
  sampleOutput?: string;
  sampleExplanation?: string;
  buggySolution?: string;
  hint?: string;
  editorial?: string;
  language?: string;
  solved?: boolean;
}

export interface TestResult {
  valid: boolean;
  broken: boolean;
  expectedOutput?: string;
  actualOutput?: string;
  message: string;
}

export interface SubmissionItem {
  id: string;
  input: string;
  buggyOutput?: string;
  expectedOutput?: string;
  isValidInput: boolean;
  isCounterexample: boolean;
  statusMessage?: string;
  createdAt: string;
}

export interface UserProgressItem {
  id: string;
  problemNumber: number;
  title: string;
  slug: string;
  difficulty: string;
  rating: number;
  pattern?: string;
  solved: boolean;
}

export interface UserProgressResponse {
  totalProblems: number;
  solvedCount: number;
  userRating?: number;
  progress: UserProgressItem[];
}
