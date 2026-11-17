import React, { useEffect } from 'react';
import { siteConfig } from '../../data/siteConfig';

export const SEO = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = 'https://alhisanaue.com/assets/logo.jpg',
}) => {
  const fullTitle = title 
    ? `${title} | ${siteConfig.legalName} — Abu Dhabi` 
    : `${siteConfig.legalName} | General Trading & Commercial Supply UAE`;

  const metaDescription = description || 
    'AL HISAN AL ASWAD GENERAL TRADING — Trusted general trading, sourcing, and commercial supply partner in the UAE. Visit alhisanaue.com for products, inquiries, and business services.';

  const canonicalUrl = canonical ? `https://alhisanaue.com${canonical}` : 'https://alhisanaue.com/';

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags
    const updateMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', metaDescription);
    updateMeta('robots', 'index, follow');
    updateMeta('og:site_name', siteConfig.legalName, true);
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', metaDescription, true);
    updateMeta('og:url', canonicalUrl, true);
    updateMeta('og:type', ogType, true);
    updateMeta('og:image', ogImage, true);
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', metaDescription);
    updateMeta('twitter:image', ogImage);

    // Canonical link
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

    // Organization Schema
    const schemaId = 'alhisan-org-schema';
    let schemaScript = document.getElementById(schemaId);
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = schemaId;
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const orgData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: siteConfig.website,
      address: {
        '@type': 'PostalAddress',
        addressLocality: siteConfig.location.city,
        addressCountry: 'AE',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: siteConfig.contact.primaryPhone.raw,
          contactType: 'sales and trade inquiries',
          areaServed: 'AE',
          availableLanguage: ['en', 'ar'],
        },
        {
          '@type': 'ContactPoint',
          telephone: siteConfig.contact.landline.raw,
          contactType: 'office',
          areaServed: 'AE',
          availableLanguage: ['en', 'ar'],
        }
      ],
      founder: [
        {
          '@type': 'Person',
          name: 'Naser Almazrouie',
          jobTitle: 'Chairman',
        },
        {
          '@type': 'Person',
          name: 'Muhammad Almazrouie',
          jobTitle: 'CEO',
        },
        {
          '@type': 'Person',
          name: 'Marwan Israfeel',
          jobTitle: 'Manager',
        }
      ]
    };

    schemaScript.textContent = JSON.stringify(orgData);
  }, [fullTitle, metaDescription, canonicalUrl, ogType, ogImage]);

  return null;
};
