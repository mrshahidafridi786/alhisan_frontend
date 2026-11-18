import React from 'react';
import { Briefcase, Layers, HeartHandshake, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const WhyChooseUs = () => {
  const { t } = useLanguage();

  const principles = [
    {
      icon: Briefcase,
      title: t('whyUs.card1Title', 'UAE Strategic Hub'),
      description: t('whyUs.card1Desc', 'Situated at the crossroads of east-west trade, ensuring rapid logistics dispatch and commercial efficiency.'),
    },
    {
      icon: HeartHandshake,
      title: t('whyUs.card2Title', 'Commercial Trust'),
      description: t('whyUs.card2Desc', 'Every trade is governed by rigorous commercial compliance, clear contracts, and verified grade standards.'),
    },
    {
      icon: Layers,
      title: t('whyUs.card3Title', 'Supply Continuity'),
      description: t('whyUs.card3Desc', 'Multi-channel sourcing strategies that safeguard buyers against market disruption and price volatility.'),
    },
    {
      icon: ShieldCheck,
      title: t('whyUs.card4Title', 'Executive Oversight'),
      description: t('whyUs.card4Desc', 'Senior leadership directly guides key client accounts, ensuring responsive and senior-level accountability.'),
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-surface-warm dark:bg-[#071524] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest mb-3">
            <span className="w-6 h-[1.5px] bg-gold-600 dark:bg-gold-400"></span>
            <span>{t('whyUs.badge', 'Value Proposition')}</span>
            <span className="w-6 h-[1.5px] bg-gold-600 dark:bg-gold-400"></span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-800 dark:text-white tracking-tight">
            {t('whyUs.title', 'Why Global Partners Choose Alhisan')}
          </h2>
          <p className="mt-3 text-content-muted dark:text-slate-400 text-base max-w-2xl mx-auto">
            {t('whyUs.subtitle', 'Disciplined execution, strategic location in Abu Dhabi, and unwavering commitment to client success.')}
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle hover:shadow-premium hover:border-gold-500/40 dark:hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-navy-800 text-gold-400 flex items-center justify-center mb-6 shadow-subtle border border-gold-500/30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-navy-800 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-content-muted dark:text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-surface-border/50 dark:border-navy-800">
                  <span className="text-[11px] font-semibold text-gold-600 dark:text-gold-400 tracking-widest uppercase">
                    AL HISAN AL ASWA
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
