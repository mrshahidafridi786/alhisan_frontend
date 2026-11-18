import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ShieldCheck, Globe, Anchor } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { siteConfig } from '../../data/siteConfig';

export const Hero = ({ onOpenQuote }) => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-navy-900 text-white">
      {/* Background Photography with Sophisticated Multi-Layer Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
          alt="International container vessel and maritime commerce representing global trade"
          className="w-full h-full object-cover object-center scale-105 transform animate-pulse duration-[10000ms]"
          loading="eager"
        />
        {/* Layered Gradient Overlays for High Contrast & Corporate Elegance */}
        <div className="absolute inset-0 bg-navy-950/85"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-transparent"></div>
        
        {/* Subtle geometric grid texture */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #C6A15B 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Badge: Origin & Strategic Location with Medallion Logo */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-navy-800/90 border border-gold-500/50 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md shadow-premium">
            <img
              src="/assets/logo.jpg"
              alt="Al Hisan Logo"
              className="w-6 h-6 rounded-full border border-gold-400/60 object-cover"
            />
            <span>{t('hero.badge', 'Abu Dhabi, United Arab Emirates • International Trading')}</span>
          </div>

          {/* Master Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
            {t('hero.title', 'Connecting Global Markets Through')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-amber-200">
              {t('hero.highlight', 'Trusted Trading')}
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
            {t('hero.description', 'Facilitating reliable international trade in essential industrial commodities, high-grade minerals, and agricultural foodstuffs with transparent execution.')}
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-md text-sm font-semibold tracking-wide bg-gold-500 text-navy-900 hover:bg-gold-400 active:bg-gold-600 shadow-premium hover:shadow-gold-glow transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>{t('hero.exploreProducts', 'Explore Trade Catalog')}</span>
              <ArrowRight className={`w-4 h-4 text-navy-950 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>

            <button
              onClick={onOpenQuote}
              type="button"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-md text-sm font-semibold tracking-wide bg-navy-800/80 hover:bg-navy-800 text-white border border-slate-700/80 hover:border-gold-500/50 backdrop-blur-sm transition-all duration-300"
            >
              <span>{t('hero.inquireNow', 'Request Quotation')}</span>
              <ChevronRight className={`w-4 h-4 text-gold-400 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Value Anchor Highlights */}
          <div className="mt-14 pt-8 border-t border-navy-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-slate-300 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-navy-800 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">{t('hero.stat1Label', 'Trade Reliability')}</p>
                <p className="text-slate-400 text-xs">{t('hero.stat1Value', '100%')} Verified</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-navy-800 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">{t('whyUs.card2Title', 'Commercial Trust')}</p>
                <p className="text-slate-400 text-xs">Disciplined trade execution</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-navy-800 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                <Anchor className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">{t('whyUs.card1Title', 'UAE Strategic Hub')}</p>
                <p className="text-slate-400 text-xs">Operating from Abu Dhabi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
