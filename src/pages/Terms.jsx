import React from 'react';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';

export const Terms = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-surface-warm dark:bg-[#071524] py-16 lg:py-24 transition-colors duration-300">
      <SEO
        title="Terms & Conditions | AL HISAN AL ASWA GENERAL TRADING"
        description="Terms and conditions governing the use of the corporate website of AL HISAN AL ASWA GENERAL TRADING, Abu Dhabi, UAE."
        canonical="/terms"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-navy-900 rounded-2xl border border-surface-border dark:border-navy-700/80 shadow-subtle p-8 sm:p-12 space-y-8">
          <div>
            <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block mb-2">
              {t('aboutPage.valuesBadge')}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-800 dark:text-white">
              {t('termsPage.title')}
            </h1>
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
              {t('termsPage.lastUpdated')} • AL HISAN AL ASWA GENERAL TRADING, Abu Dhabi, United Arab Emirates
            </p>
          </div>

          <div className="space-y-6 text-content-main dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-navy-800 dark:text-white">
                1. Acceptance of Terms
              </h2>
              <p className="text-content-muted dark:text-slate-400">
                {t('termsPage.intro')}
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-navy-800 dark:text-white">
                2. Nature of Website & Non-Binding Inquiries
              </h2>
              <p className="text-content-muted dark:text-slate-400">
                This website is an informational corporate trading website. Content published herein does not constitute 
                a binding legal offer to buy or sell commodities. Actual trade contracts, product specifications, quantities, 
                pricing, Incoterms (CIF, FOB, CFR), payment instruments (Letters of Credit, TT), and shipping schedules 
                are finalized exclusively through formal written commercial contracts executed by authorized corporate signatories.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-navy-800 dark:text-white">
                3. Intellectual Property
              </h2>
              <p className="text-content-muted dark:text-slate-400">
                All branding, trademarks, text, graphics, and layout designs on this website are the proprietary intellectual 
                property of AL HISAN AL ASWA GENERAL TRADING or its licensors and are protected under UAE and international copyright laws.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-navy-800 dark:text-white">
                4. Applicable Jurisdiction & Governing Law
              </h2>
              <p className="text-content-muted dark:text-slate-400">
                These terms are governed by the applicable laws of the Emirate of Abu Dhabi and federal laws of the United Arab Emirates. 
                Any formal disputes shall be resolved in accordance with relevant UAE commercial legal procedures.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
