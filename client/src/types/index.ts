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
  difficulty: 'Easy' | 'Easy/Medium' | 'Medium' | 'Medium/Hard';
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

export interface UserProgressItem {
  id: string;
  problemNumber: number;
  title: string;
  slug: string;
  difficulty: string;
  solved: boolean;
}

export interface UserProgressResponse {
  totalProblems: number;
  solvedCount: number;
  progress: UserProgressItem[];
}
