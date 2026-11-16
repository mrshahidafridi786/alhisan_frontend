import React from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { siteConfig } from '../data/siteConfig';

export const Privacy = () => {
  return (
    <div className="bg-surface-warm dark:bg-[#071524] py-16 lg:py-24 transition-colors duration-300">
      <SEO
        title="Privacy Policy | Alhisan General Trading Company"
        description="Privacy policy and data governance practices of Alhisan General Trading Company, operating in Abu Dhabi, United Arab Emirates."
        canonical="/privacy"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-navy-900 rounded-2xl border border-surface-border dark:border-navy-700/80 shadow-subtle p-8 sm:p-12 space-y-8">
          <div>
            <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block mb-2">
              Corporate Governance
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-800 dark:text-white">
              Privacy Policy
            </h1>
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
              Last Updated: 2026 • Alhisan General Trading Company, Abu Dhabi, United Arab Emirates
            </p>
          </div>

          <div className="space-y-6 text-content-main dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-navy-800 dark:text-white">
                1. Overview & Commitment to Confidentiality
              </h2>
              <p className="text-content-muted dark:text-slate-400">
                Alhisan General Trading Company (&ldquo;Alhisan&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects the confidentiality 
                and privacy of visitors to Alhisan.com and commercial counterparties who communicate with our trading desk. 
                This Privacy Policy outlines how information submitted through our corporate website is handled.
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
                Collected information is utilized strictly for lawful commercial trading communications:
              </p>
              <ul className="list-disc list-inside space-y-1 text-content-muted dark:text-slate-400 text-sm pl-2">
                <li>Evaluating your commodity inquiry or quotation request</li>
                <li>Direct business communication from our Abu Dhabi commercial office</li>
                <li>Providing requested technical specifications and availability updates</li>
                <li>Complying with applicable UAE commercial laws and trade recordkeeping requirements</li>
              </ul>
              <p className="text-content-muted dark:text-slate-400">
                We do not sell, rent, lease, or monetize user data under any circumstances.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-navy-800 dark:text-white">
                4. Data Protection & Security
              </h2>
              <p className="text-content-muted dark:text-slate-400">
                We implement industry-standard administrative, physical, and technical measures to protect submitted 
                commercial inquiries against unauthorized access, loss, or misuse.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-navy-800 dark:text-white">
                5. Contact Regarding Privacy
              </h2>
              <p className="text-content-muted dark:text-slate-400">
                If you have questions regarding data governance or wish to update submitted contact records, please contact 
                our Abu Dhabi office via the primary telephone line ({siteConfig.contact.primaryPhone.formatted}) or our 
                contact inquiry form.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
