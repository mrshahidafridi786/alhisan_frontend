import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UserCheck } from 'lucide-react';
import { leadershipData } from '../../data/leadershipData';

export const LeadershipSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-surface-light dark:bg-[#0A1B2A] border-t border-surface-border dark:border-navy-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest mb-3">
              <span className="w-6 h-[1.5px] bg-gold-600 dark:bg-gold-400"></span>
              <span>Governance & Management</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-800 dark:text-white tracking-tight">
              Meet Our Leadership
            </h2>
            <p className="mt-3 text-content-muted dark:text-slate-400 text-base">
              The executive leadership steering Alhisan’s strategic growth and international commercial trading operations.
            </p>
          </div>

          <div>
            <Link
              to="/leadership"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy-800 dark:text-gold-400 hover:text-gold-600 dark:hover:text-gold-300 transition-colors group"
            >
              <span>View Leadership Profiles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold-600 dark:text-gold-400" />
            </Link>
          </div>
        </div>

        {/* Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadershipData.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-navy-900 rounded-xl border border-surface-border dark:border-navy-700/80 shadow-subtle hover:shadow-premium hover:border-gold-500/40 dark:hover:border-gold-500/50 transition-all duration-300 p-8 flex flex-col items-center text-center group"
            >
              {/* Executive Portrait */}
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-full border-2 border-gold-500/50 overflow-hidden shadow-subtle group-hover:border-gold-500 transition-colors bg-navy-800">
                  {member.portrait ? (
                    <img
                      src={member.portrait}
                      alt={member.portraitPlaceholder.alt}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gold-400">
                      <span className="font-heading text-2xl font-bold tracking-wider">
                        {member.portraitPlaceholder.initials}
                      </span>
                      <span className="text-[9px] uppercase tracking-widest text-slate-300 mt-0.5">
                        Executive
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gold-500 text-navy-950 flex items-center justify-center shadow-subtle">
                  <UserCheck className="w-4 h-4" />
                </div>
              </div>

              {/* Title & Details */}
              <h3 className="font-heading text-xl font-bold text-navy-800 dark:text-white mb-1 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                {member.name}
              </h3>
              <p className="text-gold-600 dark:text-gold-400 font-semibold text-xs uppercase tracking-widest mb-3">
                {member.title}
              </p>
              <p className="text-content-muted dark:text-slate-400 text-xs leading-relaxed max-w-xs mb-6">
                {member.bioPlaceholder}
              </p>

              <div className="mt-auto w-full pt-4 border-t border-surface-border/60 dark:border-navy-800 text-[11px] text-slate-400 dark:text-slate-500">
                <span>Alhisan General Trading Company • Abu Dhabi</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
