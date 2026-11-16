/**
 * Alhisan Trading Company — Centralized Configuration
 * 
 * All contact information, placeholders, and missing client assets are managed here.
 * As official assets (logos, photography, verified addresses, social channels) are delivered,
 * they can be updated in this single source of truth.
 */

export const siteConfig = {
  name: 'Alhisan',
  legalName: 'Alhisan General Trading Company',
  businessType: 'General Trading Company',
  website: 'https://alhisan.com',
  location: {
    city: 'Abu Dhabi',
    country: 'United Arab Emirates',
    fullFormatted: 'Abu Dhabi, United Arab Emirates',
    // Street address and coordinates to be provided by client later.
    // Do not invent fictional addresses.
    addressDetail: null,
  },
  contact: {
    primaryPhone: {
      raw: '+971502377748',
      formatted: '+971 50 237 7748',
      telLink: 'tel:+971502377748',
      label: 'Primary Phone',
    },
    whatsApp: {
      raw: '+9710506380515',
      formatted: '+971 50 638 0515',
      // UAE international standard format without leading 0 for direct wa.me link
      internationalFormatted: '971506380515',
      waLink: 'https://wa.me/971506380515?text=Hello%20Alhisan%20General%20Trading%20Company%2C%20I%20would%20like%20to%20inquire%20about%20your%20trading%20services.',
      label: 'WhatsApp',
    },
    landline: {
      raw: '+97128741888',
      formatted: '+971 2 874 1888',
      telLink: 'tel:+97128741888',
      label: 'Abu Dhabi Landline',
    },
    email: {
      raw: 'info@alhisan.ae.com',
      formatted: 'info@alhisan.ae.com',
      mailto: 'mailto:info@alhisan.ae.com?subject=Commercial%20Inquiry%20-%20Alhisan%20General%20Trading%20Company',
      gmailCompose: 'https://mail.google.com/mail/?view=cm&fs=1&to=info@alhisan.ae.com&su=Commercial%20Inquiry%20-%20Alhisan%20General%20Trading%20Company',
      outlookCompose: 'https://outlook.live.com/mail/0/deeplink/compose?to=info@alhisan.ae.com&subject=Commercial%20Inquiry%20-%20Alhisan%20General%20Trading%20Company',
      label: 'Corporate Business Email',
    },
  },
  socialMedia: {
    // Social URLs to be provided later by the company.
    // Icons remain disabled or inactive until real URLs are supplied.
    instagram: null,
    facebook: null,
    x: null,
    linkedin: null,
  },
  logo: {
    isPlaceholder: false,
    imageUrl: '/assets/logo.jpg',
    altText: 'Al Hisan Al Aswad General Trading Logo — Abu Dhabi, UAE',
    brandText: 'ALHISAN',
    subText: 'AL ASWAD GENERAL TRADING • ABU DHABI',
  },
  copyright: '© 2026 Alhisan General Trading Company. All Rights Reserved.',
  navigation: [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Our Leadership', path: '/leadership' },
    { label: 'Contact Us', path: '/contact' },
    { 
      label: 'Products', 
      path: '/products',
      children: [
        { label: 'Salt', path: '/products/salt' },
        { label: 'Soda Ash', path: '/products/soda-ash' },
        { label: 'Calcium Carbonate', path: '/products/calcium-carbonate' },
        { label: 'Food Products', path: '/products/food' },
        { label: 'Spices', path: '/products/spices' },
      ]
    },
  ],
};
