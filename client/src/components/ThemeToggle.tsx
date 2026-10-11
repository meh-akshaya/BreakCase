import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-1.5 rounded-md text-[#64748B] hover:text-[#1F2937] dark:text-[#B7BBC7] dark:hover:text-[#F1F3F5] hover:bg-[#EAF0FA] dark:hover:bg-[#292535] transition-colors focus:outline-none"
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="w-4 h-4 text-[#6C5CE7]" /> : <Moon className="w-4 h-4 text-[#3B5FA3]" />}
    </button>
  );
};

