import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, AlertCircle, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim() || !password) {
      setError('Please enter your username/email and password.');
      return;
    }

    try {
      setLoading(true);
      await login(identifier, password);
      navigate('/problems');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-950 font-sans">
      <div className="max-w-md w-full space-y-8 p-8 bg-sky-50/50 dark:bg-zinc-900 rounded-2xl border border-sky-200 dark:border-yellow-500/30 shadow-xl">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-sky-900 dark:text-yellow-400 font-serif uppercase">
            Welcome back to BreakCase
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
            Log in to continue breaking solutions
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 dark:bg-rose-950/40 dark:border-rose-500/40 text-rose-700 dark:text-rose-300 text-sm flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            {/* Identifier */}
            <div>
              <label className="block text-xs font-mono font-semibold text-sky-900 dark:text-yellow-400 uppercase mb-1">
                Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-sky-300 dark:border-yellow-500/40 bg-white dark:bg-black text-slate-900 dark:text-yellow-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-yellow-400 transition-colors"
                  placeholder="user@example.com or username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-mono font-semibold text-sky-900 dark:text-yellow-400 uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-sky-300 dark:border-yellow-500/40 bg-white dark:bg-black text-slate-900 dark:text-yellow-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-yellow-400 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-sky-600 hover:bg-sky-500 dark:bg-yellow-400 dark:hover:bg-yellow-300 text-white dark:text-zinc-950 shadow-md transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{loading ? 'Logging in...' : 'Log In'}</span>
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Footer link */}
        <div className="text-center text-sm text-slate-600 dark:text-zinc-400 pt-2">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-sky-600 dark:text-yellow-400 hover:underline">
            Sign up
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;

