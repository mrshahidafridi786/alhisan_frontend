import React from 'react';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';

export const Privacy = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-surface-warm dark:bg-[#071524] py-16 lg:py-24 transition-colors duration-300">
      <SEO
        title="Privacy Policy | AL HISAN AL ASWA GENERAL TRADING"
        description="Privacy policy and data governance practices of AL HISAN AL ASWA GENERAL TRADING, operating in Abu Dhabi, United Arab Emirates."
        canonical="/privacy"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-navy-900 rounded-2xl border border-surface-border dark:border-navy-700/80 shadow-subtle p-8 sm:p-12 space-y-8">
          <div>
            <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block mb-2">
              {t('aboutPage.valuesBadge')}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-800 dark:text-white">
              {t('privacyPage.title')}
            </h1>
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
              {t('privacyPage.lastUpdated')} • AL HISAN AL ASWA GENERAL TRADING, Abu Dhabi, United Arab Emirates
            </p>
          </div>

          <div className="space-y-6 text-content-main dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-navy-800 dark:text-white">
                1. Overview & Commitment to Confidentiality
              </h2>
              <p className="text-content-muted dark:text-slate-400">
                {t('privacyPage.intro')}
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-navy-800 dark:text-white">
                2. Information We Collect
              </h2>
              <p className="text-content-muted dark:text-slate-400">
                We only collect information directly submitted by you through our contact and quote inquiry forms, including:
              </p>
              <ul className="list-disc list-inside space-y-1 text-content-muted dark:text-slate-400 text-sm pl-2">
                <li>Full Name and Professional Title</li>
                <li>Business Email Address</li>
                <li>Telephone or Mobile Number</li>
                <li>Company / Enterprise Name</li>
                <li>Subject and Commercial Requirements Details</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-navy-800 dark:text-white">
                3. Purpose of Data Processing
              </h2>
              <p className="text-content-muted dark:text-slate-400">
                Data provided is processed exclusively to respond to procurement inquiries, prepare formal commercial quotations, 
                coordinate commodity deliveries, and maintain professional commercial communications.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-navy-800 dark:text-white">
                4. Data Security & Storage
              </h2>
              <p className="text-content-muted dark:text-slate-400">
                We implement industry-standard technical security measures to safeguard corporate inquiries and commercial correspondence 
                against unauthorized disclosure, alteration, or interception.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-navy-800 dark:text-white">
                5. Contact & Privacy Inquiries
              </h2>
              <p className="text-content-muted dark:text-slate-400">
                For questions regarding corporate privacy or data handling, please contact our Abu Dhabi office directly at info@alhisanuae.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
