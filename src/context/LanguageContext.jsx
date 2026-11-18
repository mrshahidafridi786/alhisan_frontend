import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { translations, languages, defaultLanguage } from '../translations';
import { productsData as defaultProductsData } from '../data/productsData';
import { leadershipData as defaultLeadershipData } from '../data/leadershipData';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('alhisan-language');
      if (saved && translations[saved]) {
        return saved;
      }
    }
    return defaultLanguage;
  });

  const currentLanguage = useMemo(() => {
    return languages.find((l) => l.code === language) || languages[0];
  }, [language]);

  const isRTL = currentLanguage.dir === 'rtl';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.setAttribute('lang', language);
      root.setAttribute('dir', currentLanguage.dir);

      if (currentLanguage.dir === 'rtl') {
        root.classList.add('rtl');
      } else {
        root.classList.remove('rtl');
      }

      localStorage.setItem('alhisan-language', language);
    }
  }, [language, currentLanguage]);

  const setLanguage = (langCode) => {
    if (translations[langCode]) {
      setLanguageState(langCode);
    }
  };

  /**
   * Helper to retrieve nested keys like: t('nav.home') or t('hero.title')
   */
  const t = (path, fallback = '') => {
    if (!path) return fallback;
    const parts = path.split('.');

    // Look in active language
    let current = translations[language];
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        current = undefined;
        break;
      }
    }

    if (current !== undefined && current !== null && current !== '') {
      return current;
    }

    // Fall back to English
    let fallbackValue = translations.en;
    for (const part of parts) {
      if (fallbackValue && typeof fallbackValue === 'object' && part in fallbackValue) {
        fallbackValue = fallbackValue[part];
      } else {
        fallbackValue = undefined;
        break;
      }
    }

    if (fallbackValue !== undefined && fallbackValue !== null) {
      return fallbackValue;
    }

    return fallback || path;
  };

  /**
   * Returns productsData merged with translated text for the active language
   */
  const localizedProducts = useMemo(() => {
    const langProducts = translations[language]?.products || translations.en.products;
    return defaultProductsData.map((prod) => {
      let key = prod.id;
      if (key === 'soda-ash') key = 'sodaAsh';
      if (key === 'calcium-carbonate') key = 'calciumCarbonate';

      const trans = langProducts?.[key] || {};
      return {
        ...prod,
        name: trans.name || prod.name,
        category: trans.category || prod.category,
        shortDescription: trans.shortDescription || prod.shortDescription,
        heroSubtitle: trans.heroSubtitle || prod.heroSubtitle,
        overview: trans.overview || prod.overview,
      };
    });
  }, [language]);

  /**
   * Returns leadershipData merged with translated designations & bios for the active language
   */
  const localizedLeadership = useMemo(() => {
    const langLeadership = translations[language]?.leadership || translations.en.leadership;
    return defaultLeadershipData.map((member) => {
      let key = member.id;
      if (key === 'chairman') key = 'naser';
      if (key === 'ceo') key = 'muhammad';
      if (key === 'manager') key = 'marwan';

      const trans = langLeadership?.[key] || {};
      return {
        ...member,
        title: trans.title || member.title,
        department: trans.department || member.department,
        bioPlaceholder: trans.bio || member.bioPlaceholder,
      };
    });
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currentLanguage,
        languages,
        isRTL,
        t,
        products: localizedProducts,
        leadership: localizedLeadership,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
