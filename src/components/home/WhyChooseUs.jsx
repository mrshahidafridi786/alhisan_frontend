import React from 'react';
import { Briefcase, Layers, HeartHandshake, ShieldCheck, Gem } from 'lucide-react';

export const WhyChooseUs = () => {
  const principles = [
    {
      icon: Briefcase,
      title: 'Professional Business Approach',
      description: 'Structured commercial transactions with transparent terms, clear communication, and disciplined execution at every stage.',
    },
    {
      icon: Layers,
      title: 'Diverse Product Portfolio',
      description: 'Spanning industrial minerals, vital chemical commodities, agricultural food products, and aromatic spices to serve broad procurement needs.',
    },
    {
      icon: HeartHandshake,
      title: 'Customer-Focused Service',
      description: 'Attentive account coordination that actively listens to client specifications, timelines, and logistical parameters.',
    },
    {
      icon: ShieldCheck,
      title: 'Long-Term Business Relationships',
      description: 'Prioritizing enduring partnerships over transactional gains, cultivating mutual commercial reliability year after year.',
    },
    {
      icon: Gem,
      title: 'Commitment to Quality',
      description: 'Rigorous vetting of product consistency and sourcing alignment with international commercial standards.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-surface-warm dark:bg-[#071524] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest mb-3">
            <span className="w-6 h-[1.5px] bg-gold-600 dark:bg-gold-400"></span>
            <span>Operating Principles</span>
            <span className="w-6 h-[1.5px] bg-gold-600 dark:bg-gold-400"></span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-800 dark:text-white tracking-tight">
            Why Choose Alhisan
          </h2>
          <p className="mt-3 text-content-muted dark:text-slate-400 text-base max-w-2xl mx-auto">
            Our company values and service principles guide how we conduct international trade from Abu Dhabi.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`p-8 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle hover:shadow-premium hover:border-gold-500/40 dark:hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between ${
                  idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
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
                    Core Trading Value
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
