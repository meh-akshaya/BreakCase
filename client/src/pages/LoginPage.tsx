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
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F7F8FA] dark:bg-[#17181D] font-sans">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-[#202127] rounded-lg border border-[#D9DEE7] dark:border-[#393443] shadow-xs">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#3B5FA3] dark:text-[#6C5CE7] uppercase">
            Welcome back to BreakCase
          </h2>
          <p className="mt-2 text-sm text-[#64748B] dark:text-[#B7BBC7]">
            Log in to continue breaking solutions
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-md bg-[#FDE8E8] border border-[#D9534F]/40 text-[#D9534F] text-sm flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            {/* Identifier */}
            <div>
              <label className="block text-xs font-mono font-semibold text-[#1F2937] dark:text-[#F1F3F5] uppercase mb-1">
                Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8] dark:text-[#858A99]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-md border border-[#D9DEE7] dark:border-[#393443] bg-white dark:bg-[#1A1926] text-[#1F2937] dark:text-[#F1F3F5] text-sm focus:outline-none focus:ring-2 focus:ring-[#3B5FA3] dark:focus:ring-[#6C5CE7] transition-colors"
                  placeholder="user@example.com or username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-mono font-semibold text-[#1F2937] dark:text-[#F1F3F5] uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8] dark:text-[#858A99]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-md border border-[#D9DEE7] dark:border-[#393443] bg-white dark:bg-[#1A1926] text-[#1F2937] dark:text-[#F1F3F5] text-sm focus:outline-none focus:ring-2 focus:ring-[#3B5FA3] dark:focus:ring-[#6C5CE7] transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-md text-sm font-bold bg-[#3B5FA3] hover:bg-[#304F8C] dark:bg-[#6C5CE7] dark:hover:bg-[#7D6EFA] text-white transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 shadow-xs"
          >
            <span>{loading ? 'Logging in...' : 'Log In'}</span>
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Footer link */}
        <div className="text-center text-sm text-[#64748B] dark:text-[#B7BBC7] pt-2">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-[#3B5FA3] dark:text-[#6C5CE7] hover:underline">
            Sign up
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;


