import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { LogOut, User as UserIcon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white dark:bg-zinc-950 border-b border-gray-300 dark:border-yellow-500/30 transition-colors shadow-2xs sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between font-sans">
        
        {/* Left End: BreakCase Brand Name */}
        <Link to={user ? "/problems" : "/"} className="flex items-center space-x-2 shrink-0">
          <span className="font-extrabold text-2xl tracking-tight text-[#1a5ab8] dark:text-yellow-400 font-serif uppercase">
            BREAKCASE
          </span>
        </Link>

        {/* Middle: Navigation Links (HOME, PROBLEMS, PROGRESS, CONTEST, HELP) */}
        <nav className="flex items-center space-x-1 sm:space-x-2 text-xs font-bold uppercase tracking-wider overflow-x-auto py-1">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap border ${
              isActive('/') && location.pathname === '/'
                ? 'bg-[#1a5ab8] dark:bg-yellow-400 text-white dark:text-zinc-950 border-[#1a5ab8] dark:border-yellow-400 font-bold'
                : 'text-black dark:text-yellow-400 border-transparent hover:bg-sky-50 dark:hover:bg-yellow-400/10'
            }`}
          >
            HOME
          </Link>

          <Link
            to="/problems"
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap border ${
              isActive('/problems')
                ? 'bg-[#1a5ab8] dark:bg-yellow-400 text-white dark:text-zinc-950 border-[#1a5ab8] dark:border-yellow-400 font-bold'
                : 'text-black dark:text-yellow-400 border-transparent hover:bg-sky-50 dark:hover:bg-yellow-400/10'
            }`}
          >
            PROBLEMS
          </Link>

          <Link
            to="/progress"
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap border ${
              isActive('/progress')
                ? 'bg-[#1a5ab8] dark:bg-yellow-400 text-white dark:text-zinc-950 border-[#1a5ab8] dark:border-yellow-400 font-bold'
                : 'text-black dark:text-yellow-400 border-transparent hover:bg-sky-50 dark:hover:bg-yellow-400/10'
            }`}
          >
            PROGRESS
          </Link>

          <span className="px-3 py-1.5 text-gray-500 dark:text-zinc-600 cursor-not-allowed hidden md:inline whitespace-nowrap">
            CONTEST
          </span>

          <span className="px-3 py-1.5 text-gray-500 dark:text-zinc-600 cursor-not-allowed hidden md:inline whitespace-nowrap">
            HELP
          </span>
        </nav>

        {/* Right End: Login / Register (or User Profile & Logout) */}
        <div className="flex items-center space-x-3 text-xs shrink-0">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center space-x-3 border-l border-gray-300 dark:border-yellow-500/30 pl-3">
              <div className="flex items-center space-x-1.5 font-bold text-black dark:text-yellow-400">
                <UserIcon className="w-3.5 h-3.5 text-[#1a5ab8] dark:text-yellow-400" />
                <span>{user.username}</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-600 hover:text-rose-600 dark:text-zinc-400 dark:hover:text-yellow-400 transition-colors pl-2 border-l border-gray-300 dark:border-yellow-500/30"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-3 py-1 rounded text-xs font-semibold text-[#1a5ab8] dark:text-yellow-400 hover:bg-sky-50 dark:hover:bg-yellow-400/10 border border-[#1a5ab8] dark:border-yellow-500/50"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 rounded text-xs font-bold bg-[#1a5ab8] hover:bg-blue-700 dark:bg-yellow-400 dark:hover:bg-yellow-300 text-white dark:text-zinc-950 shadow-2xs"
              >
                Register
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;



