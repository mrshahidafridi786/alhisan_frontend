import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-surface-warm dark:bg-[#071524] px-4 py-16 transition-colors duration-300">
      <SEO
        title="Page Not Found (404) | Alhisan General Trading Company"
        description="The requested page could not be located on Alhisan.com."
      />

      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-navy-900 p-8 sm:p-10 rounded-2xl border border-surface-border dark:border-navy-700/80 shadow-subtle">
        <div className="w-16 h-16 rounded-full bg-navy-50 dark:bg-navy-800 text-gold-600 dark:text-gold-400 flex items-center justify-center mx-auto shadow-subtle">
          <Compass className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block mb-1">
            Status Code 404
          </span>
          <h1 className="font-heading text-3xl font-extrabold text-navy-800 dark:text-white">
            Page Not Found
          </h1>
          <p className="mt-3 text-content-muted dark:text-slate-400 text-sm leading-relaxed">
            The page or trading resource you are seeking does not exist or may have been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-navy-800 dark:bg-navy-700 text-white hover:bg-navy-700 dark:hover:bg-navy-600 transition-colors shadow-subtle"
          >
            <Home className="w-4 h-4 text-gold-400" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-surface-light dark:bg-navy-800 hover:bg-surface-border/60 text-navy-800 dark:text-slate-200 transition-colors"
          >
            <span>View Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
