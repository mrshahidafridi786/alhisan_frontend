import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall, MessageSquare } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { useLanguage } from '../../context/LanguageContext';

export const PartnershipCTA = ({ onOpenQuote }) => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative py-20 lg:py-24 bg-navy-900 text-white overflow-hidden">
      {/* Background Subtle Gradient & Accents */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold-500 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-navy-600 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest block mb-3">
            {t('cta.badge')}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t('cta.title')}
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-md text-sm font-semibold tracking-wide bg-gold-500 text-navy-900 hover:bg-gold-400 active:bg-gold-600 shadow-premium hover:shadow-gold-glow transition-all duration-300"
            >
              <span>{t('cta.buttonContact')}</span>
              <ArrowRight className={`w-4 h-4 text-navy-950 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>

            <a
              href={siteConfig.contact.whatsApp.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-md text-sm font-semibold tracking-wide bg-navy-800 hover:bg-navy-700 text-emerald-400 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t('cta.buttonWhatsApp')}</span>
            </a>
          </div>

          <div className="mt-8 text-xs text-slate-400 flex items-center justify-center gap-2">
            <PhoneCall className="w-3.5 h-3.5 text-gold-400" />
            <span>{t('cta.directLine')} {siteConfig.contact.primaryPhone.formatted}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
