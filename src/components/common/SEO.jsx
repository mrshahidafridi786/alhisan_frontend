import React, { useEffect } from 'react';
import { siteConfig } from '../../data/siteConfig';

export const SEO = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = 'https://alhisan.com/og-image.jpg',
}) => {
  const fullTitle = title 
    ? `${title} | ${siteConfig.legalName} — Abu Dhabi` 
    : `${siteConfig.legalName} | International General Trading — Abu Dhabi, UAE`;

  const metaDescription = description || 
    'Alhisan General Trading Company is an international trading enterprise based in Abu Dhabi, UAE, dealing in essential industrial commodities, food products, spices, salt, soda ash, and calcium carbonate.';

  const canonicalUrl = canonical ? `https://alhisan.com${canonical}` : 'https://alhisan.com';

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
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', metaDescription, true);
    updateMeta('og:url', canonicalUrl, true);
    updateMeta('og:type', ogType, true);
    updateMeta('og:image', ogImage, true);
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
