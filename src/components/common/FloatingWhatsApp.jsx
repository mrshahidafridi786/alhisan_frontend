import React, { useState } from 'react';
import { siteConfig } from '../../data/siteConfig';

export const FloatingWhatsApp = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={siteConfig.contact.whatsApp.waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Alhisan on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 group"
      style={{ textDecoration: 'none' }}
    >
      {/* Tooltip label — slides in from left on hover */}
      <div
        className={`
          hidden sm:block bg-white text-gray-800 text-xs font-semibold px-3 py-2 rounded-lg shadow-premium
          border border-gray-100 whitespace-nowrap transition-all duration-300 ease-out
          ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
        `}
      >
        💬 Chat on WhatsApp
        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0
          border-t-[6px] border-t-transparent
          border-l-[6px] border-l-white
          border-b-[6px] border-b-transparent">
        </div>
      </div>

      {/* WhatsApp Logo Button */}
      <div className="relative">
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-30"></span>

        {/* Official WhatsApp Logo Image */}
        <div
          className="
            w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden
            shadow-premium hover:shadow-xl
            transform transition-all duration-300
            hover:scale-110 active:scale-95
          "
          style={{
            filter: hovered
              ? 'drop-shadow(0 6px 20px rgba(37,211,102,0.5))'
              : 'drop-shadow(0 4px 10px rgba(37,211,102,0.35))',
          }}
        >
          <img
            src="/assets/whatsapp.svg"
            alt="WhatsApp"
            className="w-full h-full object-cover"
            draggable="false"
          />
        </div>
      </div>
    </a>
  );
};
