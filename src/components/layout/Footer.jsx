import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, ArrowUpRight, ShieldCheck, Mail } from 'lucide-react';
import { Logo } from '../common/Logo';
import { siteConfig } from '../../data/siteConfig';

export const Footer = () => {
  return (
    <footer className="bg-navy-900 text-slate-300 border-t border-navy-800">
      {/* Upper Footer: Main columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1 & 2: Company Identity & Introduction */}
          <div className="lg:col-span-2 space-y-5">
            <Logo variant="light" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm pt-2">
              Alhisan General Trading Company is an international trading enterprise based in Abu Dhabi, United Arab Emirates. 
              We are dedicated to building sustainable, transparent business relationships through the commercial 
              trading of essential industrial commodities, food products, and minerals.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold-500 shrink-0"></span>
                <span>Jurisdiction: Abu Dhabi, United Arab Emirates</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold-500 shrink-0"></span>
                <span>Business Nature: International General Trading</span>
              </p>
            </div>
          </div>

          {/* Column 3: Quick Corporate Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white border-b border-navy-800 pb-2">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-gold-400 transition-colors">
                  About Alhisan
                </Link>
              </li>
              <li>
                <Link to="/leadership" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Our Leadership
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Contact Our Team
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Product Portfolio */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white border-b border-navy-800 pb-2">
              Trading Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products/salt" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Salt
                </Link>
              </li>
              <li>
                <Link to="/products/soda-ash" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Soda Ash
                </Link>
              </li>
              <li>
                <Link to="/products/calcium-carbonate" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Calcium Carbonate
                </Link>
              </li>
              <li>
                <Link to="/products/food" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Food Products
                </Link>
              </li>
              <li>
                <Link to="/products/spices" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Spices
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gold-400 hover:text-gold-300 font-medium transition-colors inline-flex items-center gap-1 pt-1">
                  <span>View All Categories</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Direct Commercial Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white border-b border-navy-800 pb-2">
              Trading Office
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>{siteConfig.location.fullFormatted}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <a
                  href={siteConfig.contact.primaryPhone.telLink}
                  className="hover:text-gold-400 transition-colors"
                >
                  {siteConfig.contact.primaryPhone.formatted}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <a
                  href={siteConfig.contact.landline.telLink}
                  className="hover:text-gold-400 transition-colors"
                >
                  {siteConfig.contact.landline.formatted} (Office)
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <a
                  href={siteConfig.contact.whatsApp.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 text-emerald-400 transition-colors"
                >
                  WhatsApp: {siteConfig.contact.whatsApp.formatted}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <a
                  href={siteConfig.contact.email.gmailCompose}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-400 text-slate-300 transition-colors truncate max-w-[200px]"
                  title="Click to compose direct email"
                >
                  {siteConfig.contact.email.formatted}
                </a>
              </div>
            </div>

            {/* Social Media Status Placeholders (Strict Compliance: Only become active when real URLs supplied) */}
            <div className="pt-2">
              <p className="text-xs text-slate-500 mb-2">Corporate Social Channels:</p>
              <div className="flex items-center gap-2">
                {/* Instagram */}
                <span
                  title="Instagram (Official channel URL to be published)"
                  className="w-8 h-8 rounded bg-navy-800 text-slate-500 flex items-center justify-center text-xs font-semibold cursor-not-allowed border border-navy-700/60"
                >
                  IG
                </span>
                {/* Facebook */}
                <span
                  title="Facebook (Official channel URL to be published)"
                  className="w-8 h-8 rounded bg-navy-800 text-slate-500 flex items-center justify-center text-xs font-semibold cursor-not-allowed border border-navy-700/60"
                >
                  FB
                </span>
                {/* X */}
                <span
                  title="X (Twitter) (Official channel URL to be published)"
                  className="w-8 h-8 rounded bg-navy-800 text-slate-500 flex items-center justify-center text-xs font-semibold cursor-not-allowed border border-navy-700/60"
                >
                  X
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Bar: Copyright & Legal */}
      <div className="border-t border-navy-800/80 bg-navy-950 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center md:text-left">
          <p>{siteConfig.copyright}</p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 sm:gap-x-6 gap-y-2">
            <Link to="/privacy" className="hover:text-gold-400 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-navy-800 hidden sm:inline">•</span>
            <Link to="/terms" className="hover:text-gold-400 transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-navy-800 hidden sm:inline">•</span>
            <Link
              to="/admin"
              className="hover:text-gold-400 text-slate-400 transition-colors flex items-center gap-1"
              title="Corporate Administrator Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-gold-500/70" />
              <span>Admin Portal</span>
            </Link>
            <span className="text-navy-800 hidden sm:inline">•</span>
            <span className="text-slate-500">Abu Dhabi, UAE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
