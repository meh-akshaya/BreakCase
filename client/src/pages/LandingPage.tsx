import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const [isHalfway, setIsHalfway] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center bg-[#17181D] text-[#F1F3F5] px-4 py-16">
      
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center space-y-8">
        
        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight font-sans">
          <span
            className={`transition-colors duration-300 ${
              isHalfway ? 'text-[#F1F3F5]' : 'text-[#4F7CFF]'
            }`}
          >
            Looks correct.
          </span>{' '}
          <br className="hidden sm:inline" />
          <span
            className={`transition-colors duration-300 ${
              isHalfway ? 'text-[#4F7CFF]' : 'text-[#F1F3F5]'
            }`}
          >
            Break it.
          </span>
        </h1>

        {/* Box: Explanation & Links (Styled like Note from Creator box) */}
        <div className="p-6 sm:p-7 rounded-lg border border-[#393443] bg-[#1E1F26] shadow-xs text-left max-w-2xl mx-auto space-y-4">
          <p className="text-sm sm:text-base leading-relaxed text-[#D1D5DB] font-sans">
            Don't write another solution. Find the one valid input within constraints that makes a seemingly correct C++ algorithm fail and train your brain to debug or simply{' '}
            <Link to="/contribute" className="font-bold text-[#6C5CE7] underline hover:opacity-80">
              contribute
            </Link>{' '}
            and help us add more such questions with your github ID attached.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-[#D1D5DB] font-sans">
            To know more about breakcase read{' '}
            <Link to="/about" className="font-bold text-[#6C5CE7] underline hover:opacity-80">
              about
            </Link>{' '}
            section.
          </p>
        </div>

        {/* Primary CTA */}
        {user ? (
          <div className="flex items-center justify-center -mt-3">
            <Link
              to="/problems"
              className="w-full sm:w-auto px-5 py-2 rounded-md text-xs sm:text-sm font-bold bg-[#6C5CE7] hover:bg-[#7D6EFA] text-white shadow-xs flex items-center justify-center space-x-1.5 transition-all"
            >
              <span>Go to Problemset</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 -mt-3">
            <Link
              to="/register"
              className="w-full sm:w-auto px-5 py-2 rounded-md text-xs sm:text-sm font-bold bg-[#6C5CE7] hover:bg-[#7D6EFA] text-white shadow-xs flex items-center justify-center space-x-1.5 transition-all"
            >
              <span>New here? Register</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <span className="text-xs text-[#858A99] font-medium lowercase">or</span>

            <Link
              to="/login"
              className="w-full sm:w-auto px-5 py-2 rounded-md text-xs sm:text-sm font-medium bg-[#202127] border border-[#393443] text-[#F1F3F5] hover:bg-[#292535] transition-colors"
            >
              Log In
            </Link>
          </div>
        )}

      </div>

    </div>
  );
};

export default LandingPage;
