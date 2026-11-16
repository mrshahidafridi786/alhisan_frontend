import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Shield, Award, Users } from 'lucide-react';

export const CompanyIntro = () => {
  return (
    <section className="py-20 lg:py-28 bg-surface-warm dark:bg-[#071524] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-premium border border-surface-border dark:border-navy-700/80">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
                alt="Corporate commercial district architecture in Abu Dhabi representing professional enterprise"
                className="w-full h-[460px] object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent"></div>
              
              {/* Floating Corporate Anchor Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-navy-900/90 backdrop-blur-md border border-gold-500/30 text-white flex items-center gap-4">
                <img
                  src="/assets/logo.jpg"
                  alt="Al Hisan Logo"
                  className="w-12 h-12 rounded-full border border-gold-400/60 object-cover shrink-0 shadow-subtle"
                />
                <div>
                  <span className="text-gold-400 text-xs font-semibold uppercase tracking-wider block">
                    Abu Dhabi Headquarters
                  </span>
                  <p className="font-heading text-sm font-bold mt-0.5 text-slate-100">
                    Al Hisan Al Aswad General Trading
                  </p>
                </div>
              </div>
            </div>

            {/* Subtle decorative accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold-500/40 rounded-tl-xl pointer-events-none hidden sm:block"></div>
          </div>

          {/* Right Column: Introduction & Core Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest">
                <span className="w-6 h-[1.5px] bg-gold-600 dark:bg-gold-400"></span>
                <span>Corporate Overview</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-800 dark:text-white tracking-tight">
                Your Trusted Trading Partner
              </h2>
            </div>

            <p className="text-content-main dark:text-slate-200 text-base sm:text-lg leading-relaxed">
              Based in Abu Dhabi, United Arab Emirates, <strong>Alhisan General Trading Company</strong> operates across multiple international 
              trading categories, including essential industrial materials, staple food products, and culinary spices. 
              We serve as a dependable commercial link connecting global supply sources with institutional and commercial buyers.
            </p>

            <p className="text-content-muted dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              In modern global markets, consistent commercial execution and transparent communication define success. 
              We focus on building long-term, mutually beneficial business relationships grounded in trust, product quality, 
              and disciplined contract execution.
            </p>

            {/* Three Visual Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
              {/* Highlight 1: Quality Focus */}
              <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle hover:border-gold-500/50 dark:hover:border-gold-500/60 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-navy-50 dark:bg-navy-800 flex items-center justify-center text-gold-600 dark:text-gold-400 mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-sm font-bold text-navy-800 dark:text-white">
                  Quality Focus
                </h3>
                <p className="text-xs text-content-muted dark:text-slate-400 mt-1 leading-relaxed">
                  Careful sourcing protocols aligned with commercial buyer requirements.
                </p>
              </div>

              {/* Highlight 2: Professional Relationships */}
              <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle hover:border-gold-500/50 dark:hover:border-gold-500/60 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-navy-50 dark:bg-navy-800 flex items-center justify-center text-gold-600 dark:text-gold-400 mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-sm font-bold text-navy-800 dark:text-white">
                  Professional Relationships
                </h3>
                <p className="text-xs text-content-muted dark:text-slate-400 mt-1 leading-relaxed">
                  Transparent, responsive collaboration fostering enduring enterprise partnerships.
                </p>
              </div>

              {/* Highlight 3: Reliable Trading */}
              <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle hover:border-gold-500/50 dark:hover:border-gold-500/60 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-navy-50 dark:bg-navy-800 flex items-center justify-center text-gold-600 dark:text-gold-400 mb-3">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-sm font-bold text-navy-800 dark:text-white">
                  Reliable Trading
                </h3>
                <p className="text-xs text-content-muted dark:text-slate-400 mt-1 leading-relaxed">
                  Disciplined transaction coordination from inquiry to final fulfillment.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-navy-800 dark:bg-navy-700 text-white hover:bg-navy-700 dark:hover:bg-navy-600 active:bg-navy-900 border border-gold-500/40 shadow-subtle transition-all duration-300"
              >
                <span>Discover Alhisan</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
