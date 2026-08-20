import type { Problem, TestResult, User, UserProgressResponse } from '../types';

const API_BASE = '/api';

function getHeaders() {
  const token = localStorage.getItem('breakcase_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const api = {
  async register(username: string, email: string, password: string): Promise<{ token: string; user: User }> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    return data;
  },

  async login(identifier: string, password: string): Promise<{ token: string; user: User }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  },

  async getMe(): Promise<{ user: User }> {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch session');
    return data;
  },

  async getProblems(): Promise<{ problems: Problem[] }> {
    const res = await fetch(`${API_BASE}/problems`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch problems');
    return data;
  },

  async getProblemBySlug(slug: string): Promise<{ problem: Problem }> {
    const res = await fetch(`${API_BASE}/problems/${slug}`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch problem');
    return data;
  },

  async testCounterexample(problemId: string, input: string): Promise<TestResult> {
    const res = await fetch(`${API_BASE}/problems/${problemId}/test`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    return data;
  },

  async getProgress(): Promise<UserProgressResponse> {
    const res = await fetch(`${API_BASE}/progress`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch progress');
    return data;
  }
};
