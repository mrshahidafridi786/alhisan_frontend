import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { 
  Building2, 
  Target, 
  Compass, 
  ShieldCheck, 
  Globe2, 
  Layers, 
  ArrowRight, 
  CheckCircle2,
  Users
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { productsData } from '../data/productsData';
import { leadershipData } from '../data/leadershipData';

export const About = () => {
  const { openQuoteModal } = useOutletContext();

  return (
    <div className="bg-surface-warm dark:bg-[#071524] transition-colors duration-300">
      <SEO
        title="About Alhisan | Corporate Overview & International Trading Values"
        description="Learn about Alhisan General Trading Company, an Abu Dhabi based international trading enterprise operating across industrial minerals, chemical commodities, food products, and spices."
        canonical="/about"
      />

      {/* Page Hero Header */}
      <section className="relative py-20 lg:py-24 bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1800&q=80"
            alt="International trading logistics and cargo ports representing cross-border commerce"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/90 to-navy-900/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-widest mb-4">
              <span className="w-6 h-[1.5px] bg-gold-400"></span>
              <span>Abu Dhabi, United Arab Emirates</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              About Alhisan
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              An international trading company dedicated to reliable commodity distribution, 
              disciplined execution, and transparent commercial partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1 & 2: About Alhisan & Our Business Overview */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block">
                  Corporate Identity
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-800 dark:text-white tracking-tight">
                  Our Business Overview
                </h2>
              </div>
              <p className="text-content-main dark:text-slate-200 text-base leading-relaxed">
                Operating from Abu Dhabi, United Arab Emirates, <strong>Alhisan General Trading Company</strong> conducts international trading 
                operations centered around essential industrial minerals, chemical commodities, agricultural food products, 
                and culinary spices.
              </p>
              <p className="text-content-muted dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                As a focused trading enterprise, Alhisan acts as a strategic intermediary and trade facilitator. 
                We connect dependable suppliers with commercial buyers who demand transparent transactions, 
                consistent communication, and reliable fulfillment schedules.
              </p>
              <div className="p-5 rounded-xl bg-surface-light dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 text-sm space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 dark:text-gold-400 shrink-0 mt-0.5" />
                  <p className="text-navy-800 dark:text-slate-200">
                    <strong>Jurisdiction of Operation:</strong> Abu Dhabi, United Arab Emirates.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 dark:text-gold-400 shrink-0 mt-0.5" />
                  <p className="text-navy-800 dark:text-slate-200">
                    <strong>Business Classification:</strong> International General Trading & Commodity Distribution.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 dark:text-gold-400 shrink-0 mt-0.5" />
                  <p className="text-navy-800 dark:text-slate-200">
                    <strong>Operating Philosophy:</strong> Transparent contractual relationships, rigorous quality alignment, and long-term commercial trust.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-premium border border-surface-border dark:border-navy-700/80">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
                  alt="Corporate executive handshake and professional international business relationship"
                  className="w-full h-[440px] object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3, 4 & 5: Vision, Mission & Business Values */}
      <section className="py-20 lg:py-28 bg-surface-light dark:bg-[#0A1B2A] border-y border-surface-border dark:border-navy-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Our Vision */}
            <div className="p-8 lg:p-10 rounded-2xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-navy-800 text-gold-400 flex items-center justify-center mb-6 shadow-subtle border border-gold-500/30">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-navy-800 dark:text-white mb-4">
                  Our Vision
                </h3>
                <p className="text-content-main dark:text-slate-300 text-base leading-relaxed">
                  To be recognized as a highly respected, trustworthy international general trading company operating from the UAE, 
                  known across global commercial markets for integrity, dependability, and professional excellence in commodity supply.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-surface-border/60 dark:border-navy-800">
                <span className="text-xs font-semibold text-gold-600 dark:text-gold-400 uppercase tracking-widest">
                  Strategic Horizon
                </span>
              </div>
            </div>

            {/* Our Mission */}
            <div className="p-8 lg:p-10 rounded-2xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-navy-800 text-gold-400 flex items-center justify-center mb-6 shadow-subtle border border-gold-500/30">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-navy-800 dark:text-white mb-4">
                  Our Mission
                </h3>
                <p className="text-content-main dark:text-slate-300 text-base leading-relaxed">
                  To provide seamless, reliable trading solutions by bridging global commodity producers and commercial buyers, 
                  upholding rigorous standards of business ethics, transparent communication, and consistent trade execution.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-surface-border/60 dark:border-navy-800">
                <span className="text-xs font-semibold text-gold-600 dark:text-gold-400 uppercase tracking-widest">
                  Daily Execution Commitment
                </span>
              </div>
            </div>
          </div>

          {/* Section 5: Our Business Values */}
          <div className="mt-16 pt-12 border-t border-surface-border dark:border-navy-800">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block mb-2">
                Ethical Grounding
              </span>
              <h3 className="font-heading text-3xl font-extrabold text-navy-800 dark:text-white">
                Our Business Values
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle">
                <div className="text-gold-600 dark:text-gold-400 font-heading font-black text-2xl mb-2">01</div>
                <h4 className="font-heading text-base font-bold text-navy-800 dark:text-white mb-2">Integrity & Clarity</h4>
                <p className="text-content-muted dark:text-slate-400 text-xs leading-relaxed">
                  Transparent dealings with clear contracts, honest status updates, and truthful specifications.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle">
                <div className="text-gold-600 dark:text-gold-400 font-heading font-black text-2xl mb-2">02</div>
                <h4 className="font-heading text-base font-bold text-navy-800 dark:text-white mb-2">Reliable Supply</h4>
                <p className="text-content-muted dark:text-slate-400 text-xs leading-relaxed">
                  Disciplined execution dedicated to preserving supply chain continuity for commercial clients.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle">
                <div className="text-gold-600 dark:text-gold-400 font-heading font-black text-2xl mb-2">03</div>
                <h4 className="font-heading text-base font-bold text-navy-800 dark:text-white mb-2">Long-Term Focus</h4>
                <p className="text-content-muted dark:text-slate-400 text-xs leading-relaxed">
                  Cultivating enduring business partnerships that deliver mutual value over decades.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle">
                <div className="text-gold-600 dark:text-gold-400 font-heading font-black text-2xl mb-2">04</div>
                <h4 className="font-heading text-base font-bold text-navy-800 dark:text-white mb-2">Professionalism</h4>
                <p className="text-content-muted dark:text-slate-400 text-xs leading-relaxed">
                  Rigorous attention to detail, respectful communication, and prompt responses from Abu Dhabi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Our Trading Categories */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block mb-2">
                Product Portfolios
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-800 dark:text-white">
                Our Trading Categories
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300"
            >
              <span>Explore All 5 Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {productsData.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.slug}`}
                className="group p-5 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle hover:shadow-premium hover:border-gold-500/50 dark:hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-32 rounded-lg overflow-hidden bg-navy-900 mb-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="font-heading text-base font-bold text-navy-800 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-content-muted dark:text-slate-400 text-xs mt-2 line-clamp-3">
                    {item.shortDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 dark:border-navy-800 text-xs font-semibold text-navy-800 dark:text-slate-200 group-hover:text-gold-600 dark:group-hover:text-gold-400 flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Leadership Preview */}
      <section className="py-20 lg:py-28 bg-surface-light dark:bg-[#0A1B2A] border-t border-surface-border dark:border-navy-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block mb-2">
              Corporate Governance
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-800 dark:text-white">
              Executive Leadership
            </h2>
            <p className="mt-3 text-content-muted dark:text-slate-400 text-sm sm:text-base">
              The executive management guiding Alhisan’s strategic international trading operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipData.map((member) => (
              <div
                key={member.id}
                className="p-8 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle text-center flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full border-2 border-gold-500/50 overflow-hidden mb-5 bg-navy-800 shadow-subtle">
                  {member.portrait ? (
                    <img
                      src={member.portrait}
                      alt={member.portraitPlaceholder.alt}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gold-400">
                      <span className="font-heading text-2xl font-bold">
                        {member.portraitPlaceholder.initials}
                      </span>
                      <span className="text-[8px] uppercase tracking-widest text-slate-300">
                        Executive
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-heading text-lg font-bold text-navy-800 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-gold-600 dark:text-gold-400 font-semibold text-xs uppercase tracking-wider mt-1 mb-3">
                  {member.title}
                </p>
                <p className="text-content-muted dark:text-slate-400 text-xs leading-relaxed">
                  {member.bioPlaceholder}
                </p>
                <div className="mt-4 pt-3 border-t border-surface-border/60 dark:border-navy-800 text-[11px] text-slate-400 dark:text-slate-500 w-full text-center">
                  <span>Alhisan General Trading Company • Abu Dhabi</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/leadership"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-navy-800 dark:text-gold-400 bg-white dark:bg-navy-800 border border-surface-border dark:border-navy-700 hover:border-gold-500 shadow-subtle transition-colors"
            >
              <span>Read Full Leadership Page</span>
              <ArrowRight className="w-4 h-4 text-gold-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 8: Contact CTA */}
      <section className="py-20 bg-navy-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block">
            Direct Trade Engagement
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            Connect With Our Trading Desk in Abu Dhabi
          </h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Discuss product availability, supply terms, and partnership opportunities directly with our team.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold bg-gold-500 text-navy-900 hover:bg-gold-400 shadow-premium transition-colors"
            >
              Contact Our Office
            </Link>
            <button
              onClick={() => openQuoteModal()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold bg-navy-800 hover:bg-navy-700 text-white border border-slate-700 transition-colors"
            >
              Request a Commercial Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
