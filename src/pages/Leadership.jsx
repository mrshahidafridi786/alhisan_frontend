import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, UserCheck, ArrowRight, Building, Award } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { leadershipData } from '../data/leadershipData';

export const Leadership = () => {
  return (
    <div className="bg-surface-warm dark:bg-[#071524] transition-colors duration-300">
      <SEO
        title="Our Leadership | Executive Governance — Alhisan General Trading Company"
        description="Meet the leadership of Alhisan General Trading Company: Chairman Naser Almazrouie, CEO Muhammad Almazrouie, and Manager Marwan Israfeel, directing commercial operations from Abu Dhabi."
        canonical="/leadership"
      />

      {/* Page Header */}
      <section className="relative py-20 lg:py-24 bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80"
            alt="Corporate board room and executive headquarters representing leadership"
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/90 to-navy-900/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-widest mb-4">
              <span className="w-6 h-[1.5px] bg-gold-400"></span>
              <span>Corporate Governance & Stewardship</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Our Leadership
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              The executive leadership team guiding Alhisan’s strategic direction, commercial governance, 
              and international trading relationships from Abu Dhabi.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Profile Cards */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block mb-2">
              Executive Committee
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-800 dark:text-white">
              Steering International Commercial Excellence
            </h2>
            <p className="mt-3 text-content-muted dark:text-slate-400 text-base leading-relaxed">
              Alhisan is led by an experienced executive management structure dedicated to commercial transparency, 
              sustainable enterprise growth, and reliable cross-border commodity flow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {leadershipData.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-navy-900 rounded-2xl border border-surface-border dark:border-navy-700/80 shadow-subtle hover:shadow-premium hover:border-gold-500/50 dark:hover:border-gold-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Portrait Container */}
                <div className="p-8 pb-4 flex flex-col items-center text-center bg-gradient-to-b from-surface-light/60 dark:from-navy-800/40 to-white dark:to-navy-900">
                  <div className="relative mb-6">
                    <div className="w-36 h-36 rounded-2xl border-2 border-gold-500/50 overflow-hidden shadow-premium bg-navy-800">
                      {member.portrait ? (
                        <img
                          src={member.portrait}
                          alt={member.portraitPlaceholder.alt}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gold-400">
                          <span className="font-heading text-3xl font-bold tracking-wider">
                            {member.portraitPlaceholder.initials}
                          </span>
                          <span className="text-[9px] uppercase tracking-widest text-slate-300 mt-1">
                            Executive Officer
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-lg bg-gold-500 text-navy-950 flex items-center justify-center shadow-subtle border-2 border-white dark:border-navy-900">
                      <Shield className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-navy-800 dark:text-white">
                    {member.name}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 mt-1.5 px-3 py-1 rounded-full bg-navy-50 dark:bg-navy-800 text-gold-600 dark:text-gold-400 text-xs font-semibold uppercase tracking-wider">
                    <span>{member.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium">
                    {member.department}
                  </p>
                </div>

                {/* Profile Details & Overview */}
                <div className="p-8 pt-4 flex flex-col flex-grow justify-between border-t border-surface-border/60 dark:border-navy-800">
                  <div className="space-y-4">
                    <p className="text-content-muted dark:text-slate-400 text-sm leading-relaxed">
                      {member.bioPlaceholder}
                    </p>
                    <div className="p-3 rounded-lg bg-surface-light dark:bg-navy-800/60 border border-surface-border/60 dark:border-navy-700/60 text-[11.5px] text-slate-500 dark:text-slate-400">
                      Official executive profile and complete background will be published upon formal corporate clearance.
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-surface-border/60 dark:border-navy-800 text-xs text-navy-800 dark:text-slate-200 font-semibold flex items-center justify-between">
                    <span>Alhisan General Trading Company</span>
                    <span className="text-gold-600 dark:text-gold-400">Abu Dhabi, UAE</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Governance Principles */}
          <div className="mt-20 p-8 sm:p-10 rounded-2xl bg-surface-light dark:bg-[#0A1B2A] border border-surface-border dark:border-navy-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-navy-800 dark:text-white font-bold text-sm">
                  <Building className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                  <span>Strategic Stewardship</span>
                </div>
                <p className="text-xs text-content-muted dark:text-slate-400 leading-relaxed">
                  Active board governance providing directional guidance, risk management, and long-term commercial positioning.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-navy-800 dark:text-white font-bold text-sm">
                  <Award className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                  <span>Operational Transparency</span>
                </div>
                <p className="text-xs text-content-muted dark:text-slate-400 leading-relaxed">
                  Adhering to verified trade customs, disciplined compliance, and direct accountability to partners.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-navy-800 dark:text-white font-bold text-sm">
                  <Shield className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                  <span>Commercial Integrity</span>
                </div>
                <p className="text-xs text-content-muted dark:text-slate-400 leading-relaxed">
                  Ensuring that commitments made on contracts are honored accurately and reliably from Abu Dhabi.
                </p>
              </div>
            </div>
          </div>

          {/* Engagement CTA */}
          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold bg-navy-800 dark:bg-navy-700 text-white hover:bg-navy-700 dark:hover:bg-navy-600 active:bg-navy-900 border border-gold-500/40 shadow-subtle transition-all"
            >
              <span>Connect with Our Management Team</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
