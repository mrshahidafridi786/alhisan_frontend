import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';

export const Logo = ({ variant = 'dark', className = '', size = 'normal' }) => {
  const isLight = variant === 'light';
  const isLarge = size === 'large';

  return (
    <Link to="/" className={`group flex items-center gap-2 sm:gap-3.5 select-none shrink min-w-0 ${className}`}>
      {/* Medallion Emblem */}
      <div
        className={`relative rounded-full overflow-hidden shrink-0 border-2 border-gold-500/60 shadow-subtle group-hover:border-gold-400 group-hover:shadow-gold-glow transition-all duration-300 bg-black ${
          isLarge ? 'w-16 h-16' : 'w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12'
        }`}
      >
        <img
          src={siteConfig.logo.imageUrl}
          alt={siteConfig.logo.altText}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col min-w-0">
        <span
          className={`font-heading font-extrabold tracking-wider sm:tracking-widest leading-none truncate ${
            isLarge ? 'text-2xl' : 'text-sm sm:text-lg md:text-xl'
          } ${isLight ? 'text-white' : 'text-navy-800 dark:text-white'}`}
        >
          {siteConfig.logo.brandText}
        </span>
        <span
          className={`text-[7.5px] sm:text-[9px] font-bold tracking-[0.12em] sm:tracking-[0.18em] uppercase mt-0.5 sm:mt-1 truncate max-w-[125px] sm:max-w-none ${
            isLight ? 'text-gold-400' : 'text-gold-600 dark:text-gold-400'
          }`}
        >
          {siteConfig.logo.subText}
        </span>
      </div>
    </Link>
  );
};
