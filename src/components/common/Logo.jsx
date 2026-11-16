import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';

export const Logo = ({ variant = 'dark', className = '', size = 'normal' }) => {
  const isLight = variant === 'light';
  const isLarge = size === 'large';

  return (
    <Link to="/" className={`group flex items-center gap-3.5 select-none ${className}`}>
      {/* Medallion Emblem */}
      <div
        className={`relative rounded-full overflow-hidden shrink-0 border-2 border-gold-500/60 shadow-subtle group-hover:border-gold-400 group-hover:shadow-gold-glow transition-all duration-300 bg-black ${
          isLarge ? 'w-16 h-16' : 'w-12 h-12'
        }`}
      >
        <img
          src={siteConfig.logo.imageUrl}
          alt={siteConfig.logo.altText}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col">
        <span
          className={`font-heading font-extrabold tracking-widest leading-none ${
            isLarge ? 'text-2xl' : 'text-xl'
          } ${isLight ? 'text-white' : 'text-navy-800 dark:text-white'}`}
        >
          {siteConfig.logo.brandText}
        </span>
        <span
          className={`text-[9px] font-bold tracking-[0.18em] uppercase mt-1 ${
            isLight ? 'text-gold-400' : 'text-gold-600 dark:text-gold-400'
          }`}
        >
          {siteConfig.logo.subText}
        </span>
      </div>
    </Link>
  );
};
