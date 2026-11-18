import React, { useState } from 'react';
import { useParams, Link, Navigate, useOutletContext } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronRight, 
  FileText, 
  Info, 
  ShieldCheck, 
  MessageSquare
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { siteConfig } from '../data/siteConfig';
import { useLanguage } from '../context/LanguageContext';

export const ProductDetail = () => {
  const { slug } = useParams();
  const { openQuoteModal } = useOutletContext();
  const { t, products, isRTL } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Normalize slug matching using localized products
  const product = products.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  // Related products (all except current)
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  const images = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages 
    : [product.imageUrl];

  return (
    <div className="bg-surface-warm dark:bg-[#071524] transition-colors duration-300">
      <SEO
        title={`${product.name} | AL HISAN AL ASWA GENERAL TRADING`}
        description={product.shortDescription}
        canonical={`/products/${product.slug}`}
        ogImage={product.imageUrl}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-navy-900 border-b border-surface-border dark:border-navy-800 py-3 px-4 sm:px-6 lg:px-8 text-xs text-content-muted dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link to="/" className="hover:text-navy-800 dark:hover:text-gold-400 transition-colors">
            {t('nav.home')}
          </Link>
          <ChevronRight className={`w-3.5 h-3.5 text-slate-400 dark:text-slate-600 ${isRTL ? 'rotate-180' : ''}`} />
          <Link to="/products" className="hover:text-navy-800 dark:hover:text-gold-400 transition-colors">
            {t('nav.products')}
          </Link>
          <ChevronRight className={`w-3.5 h-3.5 text-slate-400 dark:text-slate-600 ${isRTL ? 'rotate-180' : ''}`} />
          <span className="text-navy-800 dark:text-gold-400 font-semibold">{product.name}</span>
        </div>
      </div>

      {/* 1. Product Hero Section */}
      <section className="relative py-16 lg:py-20 bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center opacity-20 filter blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/95 to-navy-900/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest block mb-3">
              {product.category}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {product.name}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              {product.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openQuoteModal(product.name)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gold-500 text-navy-900 hover:bg-gold-400 active:bg-gold-600 shadow-premium transition-all"
              >
                <FileText className="w-4 h-4 text-navy-950" />
                <span>{t('productDetail.requestQuoteBtn')}</span>
              </button>

              <a
                href={siteConfig.contact.whatsApp.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-navy-800 hover:bg-navy-700 text-emerald-400 border border-slate-700 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('productDetail.whatsAppBtn')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Image Gallery & Key Specifications Box */}
          <div className="lg:col-span-5 space-y-6">
            {/* 2. Product Image Gallery */}
            <div className="bg-white dark:bg-navy-900 rounded-2xl border border-surface-border dark:border-navy-700/80 p-4 shadow-subtle space-y-4">
              <div className="relative h-80 rounded-xl overflow-hidden bg-navy-900">
                <img
                  src={images[activeImageIndex]}
                  alt={`${product.name} trading view`}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-gold-500 ring-2 ring-gold-500/20'
                          : 'border-surface-border dark:border-navy-700 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Trading Inquiry Information Card */}
            <div className="p-6 rounded-2xl bg-surface-light dark:bg-[#0A1B2A] border border-surface-border dark:border-navy-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-navy-800 dark:text-gold-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                <span>{t('footer.colContact')}</span>
              </div>
              <p className="text-xs text-content-muted dark:text-slate-400 leading-relaxed">
                {t('productDetail.specsP2')}
              </p>
              <div className="pt-2 text-xs text-navy-800 dark:text-slate-200 space-y-2 border-t border-surface-border/60 dark:border-navy-800">
                <p className="flex items-center justify-between">
                  <span className="text-slate-500">{t('footer.colCompany')}:</span>
                  <span className="font-semibold">{t('footer.locationShort')}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-slate-500">{t('footer.nature')}:</span>
                  <span className="font-semibold">B2B Commercial</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Introduction, Overview, Applications, Specifications Notice */}
          <div className="lg:col-span-7 space-y-10">
            {/* 3 & 4. Product Introduction & Overview */}
            <div>
              <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block mb-2">
                {t('productDetail.overviewBadge')}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy-800 dark:text-white">
                {product.name}
              </h2>
              <p className="mt-4 text-content-main dark:text-slate-300 text-base leading-relaxed">
                {product.overview}
              </p>
            </div>

            {/* 5. Available Specifications Notice */}
            <div className="p-6 rounded-xl bg-white dark:bg-navy-900 border-l-4 border-l-gold-500 border border-surface-border dark:border-navy-700/80 shadow-subtle">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-gold-600 dark:text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading text-sm font-bold text-navy-800 dark:text-white">
                    {t('productDetail.specificationsTitle')}
                  </h3>
                  <p className="mt-2 text-xs text-content-muted dark:text-slate-400 leading-relaxed">
                    {t('productDetail.specsP1')}
                  </p>
                  <p className="mt-2 text-xs text-content-muted dark:text-slate-400">
                    {t('productDetail.specsP2')}
                  </p>
                </div>
              </div>
            </div>

            {/* 6. Applications and Uses */}
            {product.applications && product.applications.length > 0 && (
              <div>
                <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block mb-2">
                  {t('productDetail.overviewBadge')}
                </span>
                <h2 className="font-heading text-2xl font-extrabold text-navy-800 dark:text-white mb-6">
                  {t('productDetail.applicationsTitle')}
                </h2>
                <div className="space-y-4">
                  {product.applications.map((app, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle hover:border-gold-500/40 dark:hover:border-gold-500/50 transition-colors"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-7 h-7 rounded-full bg-navy-50 dark:bg-navy-800 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-heading text-base font-bold text-navy-800 dark:text-white">
                            {app.title}
                          </h4>
                          <p className="text-content-muted dark:text-slate-400 text-sm mt-1.5 leading-relaxed">
                            {app.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. Request a Quote CTA Box */}
            <div className="p-8 rounded-2xl bg-navy-900 text-white border border-navy-800 space-y-4">
              <span className="text-gold-400 text-xs font-semibold uppercase tracking-wider block">
                {t('productDetail.inquireTitle')}
              </span>
              <h3 className="font-heading text-2xl font-bold">
                {product.name}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {t('productDetail.inquireDesc')}
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => openQuoteModal(product.name)}
                  className="px-6 py-3 rounded-xl text-sm font-semibold bg-gold-500 text-navy-900 hover:bg-gold-400 transition-colors shadow-subtle"
                >
                  {t('productDetail.requestQuoteBtn')}
                </button>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-xl text-sm font-semibold bg-navy-800 hover:bg-navy-700 text-white border border-slate-700 transition-colors"
                >
                  {t('cta.buttonContact')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Related Products Section */}
        <div className="mt-24 pt-16 border-t border-surface-border dark:border-navy-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block mb-2">
                {t('productsPage.heroBadge')}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy-800 dark:text-white">
                {t('productDetail.relatedTitle')}
              </h2>
            </div>
            <Link
              to="/products"
              className="text-sm font-semibold text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 inline-flex items-center gap-1"
            >
              <span>{t('productGrid.viewAll')}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                to={`/products/${rel.slug}`}
                className="group bg-white dark:bg-navy-900 rounded-xl border border-surface-border dark:border-navy-700/80 overflow-hidden shadow-subtle hover:shadow-premium hover:border-gold-500/40 dark:hover:border-gold-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 overflow-hidden bg-navy-900">
                    <img
                      src={rel.imageUrl}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[11px] font-semibold text-gold-600 dark:text-gold-400 uppercase tracking-wider block mb-1">
                      {rel.category?.split('&')[0]}
                    </span>
                    <h4 className="font-heading text-lg font-bold text-navy-800 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                      {rel.name}
                    </h4>
                    <p className="text-content-muted dark:text-slate-400 text-xs mt-2 line-clamp-2">
                      {rel.shortDescription}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2 text-xs font-semibold text-navy-800 dark:text-slate-200 group-hover:text-gold-600 dark:group-hover:text-gold-400 flex items-center gap-1">
                  <span>{t('productGrid.explore')}</span>
                  <ArrowRight className={`w-3.5 h-3.5 text-gold-500 transition-transform ${isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
