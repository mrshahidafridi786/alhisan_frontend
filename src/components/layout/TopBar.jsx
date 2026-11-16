import React from 'react';
import { MapPin, Phone, MessageSquare, Building2 } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const TopBar = () => {
  return (
    <div className="bg-navy-900 border-b border-navy-800 text-content-light text-xs py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Location & Business Nature */}
        <div className="flex items-center gap-6 text-[11.5px] tracking-wide">
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>{siteConfig.location.fullFormatted}</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-slate-400 border-l border-navy-700/80 pl-4">
            <Building2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>{siteConfig.businessType}</span>
          </div>
        </div>

        {/* Right: Direct Business Telecommunications */}
        <div className="flex items-center gap-4 sm:gap-6 text-[11.5px]">
          {/* Primary Mobile */}
          <a
            href={siteConfig.contact.primaryPhone.telLink}
            className="flex items-center gap-1.5 text-slate-200 hover:text-gold-400 transition-colors"
            title="Call Primary Phone"
          >
            <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="font-medium">{siteConfig.contact.primaryPhone.formatted}</span>
          </a>

          {/* Landline */}
          <a
            href={siteConfig.contact.landline.telLink}
            className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-gold-400 transition-colors border-l border-navy-700/80 pl-4"
            title="Call Abu Dhabi Landline"
          >
            <span className="text-slate-400">Tel:</span>
            <span>{siteConfig.contact.landline.formatted}</span>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={siteConfig.contact.whatsApp.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors border-l border-navy-700/80 pl-4"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
