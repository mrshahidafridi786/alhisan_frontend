import React from 'react';
import { SEO } from '../components/common/SEO';
import { siteConfig } from '../data/siteConfig';

export const Terms = () => {
  return (
    <div className="bg-surface-warm dark:bg-[#071524] py-16 lg:py-24 transition-colors duration-300">
      <SEO
        title="Terms & Conditions | Alhisan General Trading Company"
        description="Terms and conditions governing the use of Alhisan.com, an international trading company website based in Abu Dhabi, UAE."
        canonical="/terms"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-navy-900 rounded-2xl border border-surface-border dark:border-navy-700/80 shadow-subtle p-8 sm:p-12 space-y-8">
          <div>
            <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block mb-2">
              Legal Framework
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-800 dark:text-white">
              Terms & Conditions
            </h1>
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
              Last Updated: 2026 • Alhisan General Trading Company, Abu Dhabi, United Arab Emirates
            </p>
          </div>

          <div className="space-y-6 text-content-main dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-navy-800 dark:text-white">
                1. Acceptance of Terms
              </h2>
              <p className="text-content-muted dark:text-slate-400">
                By accessing or browsing the corporate website of Alhisan General Trading Company (&ldquo;Alhisan.com&rdquo;), 
                you agree to be bound by these Terms and Conditions and all applicable laws and regulations of the 
                Emirate of Abu Dhabi and the United Arab Emirates.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-navy-800 dark:text-white">
                2. Nature of Website & Non-Binding Inquiries
              </h2>
              <p className="text-content-muted dark:text-slate-400">
                Alhisan.com is an informational corporate trading website. Content published herein does not constitute 
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
                All branding, trademarks, text, graphics, and layout designs on Alhisan.com are the proprietary intellectual 
                property of Alhisan General Trading Company or its licensors and are protected under UAE and international copyright laws.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-navy-800 dark:text-white">
                4. Governing Law & Jurisdiction
              </h2>
              <p className="text-content-muted dark:text-slate-400">
                These terms shall be governed by and construed in accordance with the federal laws of the United Arab Emirates 
                and the local laws applicable in the Emirate of Abu Dhabi. Any dispute arising out of or in connection with this 
                website shall be subject to the exclusive jurisdiction of the competent courts of Abu Dhabi, UAE.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
