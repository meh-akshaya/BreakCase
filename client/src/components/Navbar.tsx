import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { getCFRatingInfo } from '../utils/codeforces';
import { LogOut, User as UserIcon, Target } from 'lucide-react';

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

  // Mock solved count for rating display in header
  const solvedCount = 2; 
  const userRating = 1200 + solvedCount * 150; // Pupil / Specialist
  const ratingInfo = getCFRatingInfo(userRating);

  const [isHalfway, setIsHalfway] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        setIsHalfway(false);
        return;
      }
      const scrollProgress = window.scrollY / scrollHeight;
      setIsHalfway(scrollProgress >= 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location.pathname]);

  return (
    <header className="bg-white dark:bg-[#181920] border-b border-[#B9B9B9] dark:border-[#393443] transition-colors sticky top-0 z-50 shadow-xs">
      
      {/* Top Bar: Logo & User Utilities */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between font-sans">
        
        {/* BreakCase Logo Header */}
        <Link to={user ? "/problems" : "/"} className="flex items-center space-x-3 shrink-0 group">
          {/* BreakCase Logo Icon */}
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-xs transition-all duration-300 ${
              isHalfway
                ? 'bg-[#3B5998] dark:bg-[#4F7CFF] ring-2 ring-[#3B5998]/40 dark:ring-[#4F7CFF]/50 scale-105 shadow-md'
                : 'bg-[#3B5998] dark:bg-[#6C5CE7]'
            } group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_12px_rgba(59,89,152,0.5)] dark:group-hover:shadow-[0_0_12px_rgba(79,124,255,0.5)]`}
          >
            <Target className={`w-5 h-5 stroke-[2.5] transition-transform duration-500 ${isHalfway ? 'rotate-45' : 'group-hover:rotate-90'}`} />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="font-extrabold text-2xl tracking-tight transition-colors duration-300 font-sans inline-block">
              <span
                className={`transition-colors duration-300 ${
                  isHalfway
                    ? 'text-[#3B5998] dark:text-[#4F7CFF]'
                    : 'text-[#3B5998] dark:text-[#FFFFFF] group-hover:text-[#2E4577] dark:group-hover:text-[#4F7CFF]'
                }`}
              >
                Break
              </span>
              <span
                className={`transition-colors duration-300 ${
                  isHalfway
                    ? 'text-white drop-shadow-[0_1px_2px_rgba(59,89,152,0.85)] dark:drop-shadow-none'
                    : 'text-[#E55353] dark:text-[#6C5CE7]'
                }`}
              >
                Case
              </span>
            </span>
            <span className="text-[10px] text-[#717171] dark:text-[#858A99] font-sans font-medium tracking-wide">
              Competitive Programming Counterexample Platform
            </span>
          </div>
        </Link>

        {/* Top Right Utilities */}
        <div className="flex items-center space-x-3 text-xs shrink-0">
          <span className="hidden sm:inline text-[11px] text-[#717171] dark:text-[#858A99] font-mono border-r border-[#CCCCCC] dark:border-[#393443] pr-3">
            <span className="hover:underline cursor-pointer font-bold">EN</span> | <span className="hover:underline cursor-pointer">RU</span>
          </span>

          <ThemeToggle />

          {user ? (
            <div className="flex items-center space-x-3 border-l border-[#B9B9B9] dark:border-[#393443] pl-3">
              <div className="flex items-center space-x-1.5 font-bold">
                <UserIcon className="w-3.5 h-3.5 text-[#3B5998] dark:text-[#4F7CFF]" />
                <span className={`${ratingInfo.className} font-sans`}>{user.username}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-mono border border-current opacity-80" style={{ color: ratingInfo.color }}>
                  {ratingInfo.title} ({userRating})
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-[#717171] hover:text-[#B94A48] dark:text-[#B7BBC7] dark:hover:text-[#E55353] transition-colors pl-2 border-l border-[#CCCCCC] dark:border-[#393443]"
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
                className="px-2.5 py-1 rounded text-xs font-bold text-[#3B5998] dark:text-[#F1F3F5] hover:bg-[#E1E1E1] dark:hover:bg-[#292535] border border-[#B9B9B9] dark:border-[#393443] transition-colors"
              >
                Enter
              </Link>
              <Link
                to="/register"
                className="px-2.5 py-1 rounded text-xs font-bold bg-[#3B5998] hover:bg-[#2E4577] dark:bg-[#4F7CFF] dark:hover:bg-[#3B67E6] text-white transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Codeforces Navigation Bar (.main-menu-list) */}
      <div className="bg-[#3B5998] dark:bg-[#202129] border-t border-b border-[#2E4577] dark:border-[#393443]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center space-x-1 text-xs font-bold uppercase tracking-wide overflow-x-auto py-1">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                isActive('/') && location.pathname === '/'
                  ? 'bg-white text-[#3B5998] font-bold shadow-xs'
                  : 'text-white hover:bg-white/15 dark:hover:bg-white/10'
              }`}
            >
              HOME
            </Link>

            <Link
              to="/problems"
              className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                isActive('/problems')
                  ? 'bg-white text-[#3B5998] font-bold shadow-xs'
                  : 'text-white hover:bg-white/15 dark:hover:bg-white/10'
              }`}
            >
              PROBLEMSET
            </Link>

            <Link
              to="/progress"
              className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                isActive('/progress')
                  ? 'bg-white text-[#3B5998] font-bold shadow-xs'
                  : 'text-white hover:bg-white/15 dark:hover:bg-white/10'
              }`}
            >
              PROGRESS
            </Link>

            <Link
              to="/contribute"
              className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                isActive('/contribute')
                  ? 'bg-white text-[#3B5998] font-bold shadow-xs'
                  : 'text-white hover:bg-white/15 dark:hover:bg-white/10'
              }`}
            >
              CONTRIBUTE
            </Link>

            <Link
              to="/about"
              className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                isActive('/about')
                  ? 'bg-white text-[#3B5998] font-bold shadow-xs'
                  : 'text-white hover:bg-white/15 dark:hover:bg-white/10'
              }`}
            >
              ABOUT
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
