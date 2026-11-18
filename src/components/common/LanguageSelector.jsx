import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const LanguageSelector = ({ className = '', isMobile = false }) => {
  const { language, setLanguage, languages, currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Dropdown Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Select Language / اختر اللغة / Changer de langue / Sprache wählen / 选择语言"
        className={`relative inline-flex items-center transition-all duration-300 font-semibold select-none ${
          isMobile
            ? 'h-9 px-2 gap-1 rounded-lg text-xs shrink-0 bg-surface-light dark:bg-navy-800 text-navy-900 dark:text-slate-100 border border-surface-border dark:border-navy-700 active:bg-slate-200 dark:active:bg-navy-700'
            : 'gap-1.5 px-2.5 py-2 rounded-xl text-xs tracking-wider bg-surface-light hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-700 text-navy-800 dark:text-slate-200 border border-surface-border dark:border-gold-500/30 hover:border-gold-500/60 shadow-subtle hover:shadow-gold-glow'
        }`}
      >
        {!isMobile && <Globe className="w-4 h-4 text-gold-500 dark:text-gold-400 shrink-0" />}
        <span className="text-xs sm:text-sm shrink-0 leading-none" role="img" aria-label={currentLanguage.name}>
          {currentLanguage.flag}
        </span>
        <span className={`font-bold text-[11px] sm:text-xs uppercase ${isMobile ? 'inline-block' : 'hidden sm:inline-block'}`}>
          {currentLanguage.code.toUpperCase()}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-slate-400 dark:text-slate-400 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-gold-500' : ''
          }`}
        />
      </button>

      {/* Language Options Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute ${
            currentLanguage.dir === 'rtl' ? 'left-0 sm:right-auto' : 'right-0 sm:left-auto'
          } mt-2 w-48 sm:w-52 rounded-2xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700 shadow-2xl py-2 z-50 animate-fadeIn backdrop-blur-xl`}
        >
          <div className="px-3 py-1.5 border-b border-surface-border/60 dark:border-navy-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Select Language
          </div>

          <div className="py-1">
            {languages.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs transition-colors duration-150 ${
                    isSelected
                      ? 'bg-gold-500/15 text-gold-600 dark:text-gold-400 font-bold'
                      : 'text-navy-800 dark:text-slate-200 hover:bg-surface-light dark:hover:bg-navy-800 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base" role="img" aria-label={lang.name}>
                      {lang.flag}
                    </span>
                    <div className="flex flex-col text-start">
                      <span className="font-semibold text-xs leading-tight">
                        {lang.nativeName}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        {lang.name}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-gold-500 dark:text-gold-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
