import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = ({ className = '', showLabel = false }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`relative inline-flex items-center justify-center transition-all duration-300 ${
        className.includes('p-') || className.includes('h-') ? '' : 'p-2 rounded-xl gap-2'
      } ${
        isDark
          ? 'bg-navy-800 hover:bg-navy-700 text-gold-400 border border-gold-500/40 shadow-subtle hover:shadow-gold-glow'
          : 'bg-surface-light hover:bg-slate-200 text-navy-800 border border-surface-border shadow-subtle'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon (shown in dark mode to switch to light) */}
        <Sun
          className={`w-4 h-4 text-gold-400 transition-all duration-300 transform ${
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0 absolute'
          }`}
        />
        {/* Moon Icon (shown in light mode to switch to dark) */}
        <Moon
          className={`w-4 h-4 text-navy-800 transition-all duration-300 transform ${
            isDark
              ? 'rotate-90 scale-0 opacity-0 absolute'
              : 'rotate-0 scale-100 opacity-100'
          }`}
        />
      </div>

      {showLabel && (
        <span className="text-xs font-semibold tracking-wider uppercase">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};
