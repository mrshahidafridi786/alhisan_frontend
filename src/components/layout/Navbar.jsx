import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, FileText } from 'lucide-react';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageSelector } from '../common/LanguageSelector';
import { useLanguage } from '../../context/LanguageContext';
import { siteConfig } from '../../data/siteConfig';

export const Navbar = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
  }, [location.pathname]);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProductsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors tracking-wide py-2 ${
      isActive
        ? 'text-gold-600 dark:text-gold-400 font-semibold'
        : 'text-navy-800 dark:text-slate-200 hover:text-gold-600 dark:hover:text-gold-400'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-md ${
        isScrolled
          ? 'glass-nav shadow-subtle border-b border-surface-border dark:border-navy-700/80 py-3'
          : 'bg-surface-warm/95 dark:bg-navy-900/95 border-b border-surface-border/60 dark:border-navy-800/80 py-4'
      }`}
      style={{ position: 'sticky', top: 0, zIndex: 50 }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
          {/* Brand Logo */}
          <Logo />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink to="/" end className={navLinkClass}>
              {t('nav.home', 'Home')}
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              {t('nav.about', 'About Us')}
            </NavLink>

            <NavLink to="/leadership" className={navLinkClass}>
              {t('nav.leadership', 'Our Leadership')}
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              {t('nav.contact', 'Contact Us')}
            </NavLink>

            {/* Products Dropdown (Positioned Last in Nav Sequence) */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <div className="flex items-center gap-1 cursor-pointer">
                <NavLink to="/products" className={navLinkClass}>
                  {t('nav.products', 'Products')}
                </NavLink>
                <button
                  type="button"
                  aria-expanded={productsDropdownOpen}
                  aria-label="Toggle products menu"
                  onClick={(e) => {
                    e.preventDefault();
                    setProductsDropdownOpen(!productsDropdownOpen);
                  }}
                  className="p-1 text-slate-500 dark:text-slate-400 hover:text-navy-800 dark:hover:text-gold-400 focus:outline-none"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      productsDropdownOpen ? 'rotate-180 text-gold-600 dark:text-gold-400' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Dropdown Menu */}
              {productsDropdownOpen && (
                <div className={`absolute top-full ${isRTL ? 'left-0 lg:right-0' : 'right-0 lg:left-0'} w-64 pt-2 animate-fadeIn z-50`}>
                  <div className="bg-white dark:bg-navy-800 rounded-lg shadow-premium border border-surface-border dark:border-navy-700 py-2 px-1">
                    <Link
                      to="/products"
                      className="block px-3 py-2 text-xs font-semibold text-navy-800 dark:text-white hover:bg-surface-light dark:hover:bg-navy-700/60 rounded transition-colors uppercase tracking-wider border-b border-surface-border/60 dark:border-navy-700/60 mb-1"
                    >
                      {t('nav.allCategories', 'All Trading Categories →')}
                    </Link>
                    <Link
                      to="/products/salt"
                      className="block px-3 py-2 text-sm text-content-main dark:text-slate-200 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-surface-light dark:hover:bg-navy-700/60 rounded transition-colors"
                    >
                      {t('nav.salt', 'Salt')}
                    </Link>
                    <Link
                      to="/products/soda-ash"
                      className="block px-3 py-2 text-sm text-content-main dark:text-slate-200 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-surface-light dark:hover:bg-navy-700/60 rounded transition-colors"
                    >
                      {t('nav.sodaAsh', 'Soda Ash')}
                    </Link>
                    <Link
                      to="/products/calcium-carbonate"
                      className="block px-3 py-2 text-sm text-content-main dark:text-slate-200 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-surface-light dark:hover:bg-navy-700/60 rounded transition-colors"
                    >
                      {t('nav.calciumCarbonate', 'Calcium Carbonate')}
                    </Link>
                    <Link
                      to="/products/food"
                      className="block px-3 py-2 text-sm text-content-main dark:text-slate-200 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-surface-light dark:hover:bg-navy-700/60 rounded transition-colors"
                    >
                      {t('nav.food', 'Food Products')}
                    </Link>
                    <Link
                      to="/products/spices"
                      className="block px-3 py-2 text-sm text-content-main dark:text-slate-200 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-surface-light dark:hover:bg-navy-700/60 rounded transition-colors"
                    >
                      {t('nav.spices', 'Spices')}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Right: Language Selector + Theme Toggle + Request Quote CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSelector />
            <ThemeToggle />

            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide bg-navy-800 dark:bg-navy-700 text-white hover:bg-navy-700 dark:hover:bg-navy-600 active:bg-navy-900 border border-gold-500/40 shadow-subtle hover:shadow-gold-glow transition-all duration-300"
            >
              <span>{t('nav.requestQuote', 'Request a Quote')}</span>
              <ArrowRight className={`w-4 h-4 text-gold-400 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Mobile Right: Language Selector + Theme Toggle + Quote CTA + Menu Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
            <LanguageSelector isMobile={true} />
            <ThemeToggle className="h-9 w-9 p-0 rounded-lg shrink-0 flex items-center justify-center" />
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="h-9 px-2.5 sm:px-3 rounded-lg text-xs font-bold tracking-wide shrink-0 inline-flex items-center justify-center bg-gold-500 hover:bg-gold-400 text-navy-950 active:bg-gold-600 border border-gold-400/50 shadow-subtle transition-colors"
            >
              {t('nav.quote', 'Quote')}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9 p-0 rounded-lg shrink-0 inline-flex items-center justify-center text-navy-800 dark:text-slate-200 bg-surface-light dark:bg-navy-800 border border-surface-border dark:border-navy-700 hover:text-gold-600 dark:hover:text-gold-400 active:bg-slate-200 dark:active:bg-navy-700 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-surface-border dark:border-navy-700 bg-white dark:bg-navy-900 rounded-xl shadow-premium p-5 animate-fadeIn">
            <div className="flex flex-col gap-3">
              <NavLink
                to="/"
                end
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-surface-light dark:bg-navy-800 text-gold-600 dark:text-gold-400 font-semibold'
                      : 'text-navy-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-800/60'
                  }`
                }
              >
                {t('nav.home', 'Home')}
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-surface-light dark:bg-navy-800 text-gold-600 dark:text-gold-400 font-semibold'
                      : 'text-navy-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-800/60'
                  }`
                }
              >
                {t('nav.about', 'About Us')}
              </NavLink>

              <NavLink
                to="/leadership"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-surface-light dark:bg-navy-800 text-gold-600 dark:text-gold-400 font-semibold'
                      : 'text-navy-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-800/60'
                  }`
                }
              >
                {t('nav.leadership', 'Our Leadership')}
              </NavLink>

              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-surface-light dark:bg-navy-800 text-gold-600 dark:text-gold-400 font-semibold'
                      : 'text-navy-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-800/60'
                  }`
                }
              >
                {t('nav.contact', 'Contact Us')}
              </NavLink>

              <div className="border-t border-b border-surface-border/60 dark:border-navy-700/60 py-2.5 my-1">
                <Link
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest block hover:text-gold-500"
                >
                  {t('nav.allCategories', 'Products Portfolio →')}
                </Link>
                <div className="grid grid-cols-1 pl-3 mt-1 space-y-1">
                  <Link
                    to="/products/salt"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 px-2 rounded text-sm text-content-main dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-slate-50 dark:hover:bg-navy-800/40 block"
                  >
                    • {t('nav.salt', 'Salt')}
                  </Link>
                  <Link
                    to="/products/soda-ash"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 px-2 rounded text-sm text-content-main dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-slate-50 dark:hover:bg-navy-800/40 block"
                  >
                    • {t('nav.sodaAsh', 'Soda Ash')}
                  </Link>
                  <Link
                    to="/products/calcium-carbonate"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 px-2 rounded text-sm text-content-main dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-slate-50 dark:hover:bg-navy-800/40 block"
                  >
                    • {t('nav.calciumCarbonate', 'Calcium Carbonate')}
                  </Link>
                  <Link
                    to="/products/food"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 px-2 rounded text-sm text-content-main dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-slate-50 dark:hover:bg-navy-800/40 block"
                  >
                    • {t('nav.food', 'Food Products')}
                  </Link>
                  <Link
                    to="/products/spices"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 px-2 rounded text-sm text-content-main dark:text-slate-300 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-slate-50 dark:hover:bg-navy-800/40 block"
                  >
                    • {t('nav.spices', 'Spices')}
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-between px-3 py-2 border-t border-surface-border dark:border-navy-700/60 my-1">
                <span className="text-sm font-medium text-navy-800 dark:text-slate-200">Language</span>
                <LanguageSelector isMobile={true} />
              </div>

              <div className="flex items-center justify-between px-3 py-2 border-t border-surface-border dark:border-navy-700/60 my-1">
                <span className="text-sm font-medium text-navy-800 dark:text-slate-200">Appearance Mode</span>
                <ThemeToggle showLabel={true} />
              </div>

              <div className="pt-3 mt-2 border-t border-surface-border dark:border-navy-700">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuoteModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-navy-800 text-white hover:bg-navy-700 shadow-subtle"
                >
                  <FileText className="w-4 h-4 text-gold-400" />
                  <span>{t('nav.requestQuote', 'Request a Formal Quote')}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
