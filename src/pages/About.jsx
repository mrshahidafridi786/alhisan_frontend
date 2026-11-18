import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { 
  Target, 
  Compass, 
  ArrowRight, 
  CheckCircle2,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';

export const About = () => {
  const { openQuoteModal } = useOutletContext();
  const { t, products, leadership, isRTL } = useLanguage();

  return (
    <div className="bg-surface-warm dark:bg-[#071524] transition-colors duration-300">
      <SEO
        title="About Alhisan | Corporate Overview & International Trading Values"
        description="Learn about Alhisan General Trading Company, an Abu Dhabi based international trading enterprise operating across industrial minerals, chemical commodities, food products, and spices."
        canonical="/about"
      />

      {/* Page Hero Header */}
      <section className="relative py-20 lg:py-24 bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1800&q=80"
            alt="International trading logistics and cargo ports representing cross-border commerce"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/90 to-navy-900/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-widest mb-4">
              <span className="w-6 h-[1.5px] bg-gold-400"></span>
              <span>{t('aboutPage.heroBadge')}</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              {t('aboutPage.heroTitle')}
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              {t('aboutPage.heroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Section 1 & 2: About Alhisan & Our Business Overview */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block">
                  {t('aboutPage.storyBadge')}
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-800 dark:text-white tracking-tight">
                  {t('aboutPage.storyTitle')}
                </h2>
              </div>
              <p className="text-content-main dark:text-slate-200 text-base leading-relaxed">
                {t('aboutPage.storyP1')}
              </p>
              <p className="text-content-muted dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                {t('aboutPage.storyP2')}
              </p>
              <div className="p-5 rounded-xl bg-surface-light dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 text-sm space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 dark:text-gold-400 shrink-0 mt-0.5" />
                  <p className="text-navy-800 dark:text-slate-200">
                    <strong>{t('footer.jurisdiction')}</strong>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 dark:text-gold-400 shrink-0 mt-0.5" />
                  <p className="text-navy-800 dark:text-slate-200">
                    <strong>{t('footer.nature')}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-premium border border-surface-border dark:border-navy-700/80">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
                  alt="Corporate executive handshake and professional international business relationship"
                  className="w-full h-[440px] object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3, 4 & 5: Vision, Mission & Business Values */}
      <section className="py-20 lg:py-28 bg-surface-light dark:bg-[#0A1B2A] border-y border-surface-border dark:border-navy-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Our Vision */}
            <div className="p-8 lg:p-10 rounded-2xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-navy-800 text-gold-400 flex items-center justify-center mb-6 shadow-subtle border border-gold-500/30">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-navy-800 dark:text-white mb-4">
                  {t('aboutPage.visionTitle')}
                </h3>
                <p className="text-content-main dark:text-slate-300 text-base leading-relaxed">
                  {t('aboutPage.visionDesc')}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-surface-border/60 dark:border-navy-800">
                <span className="text-xs font-semibold text-gold-600 dark:text-gold-400 uppercase tracking-widest">
                  AL HISAN AL ASWA
                </span>
              </div>
            </div>

            {/* Our Mission */}
            <div className="p-8 lg:p-10 rounded-2xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-navy-800 text-gold-400 flex items-center justify-center mb-6 shadow-subtle border border-gold-500/30">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-navy-800 dark:text-white mb-4">
                  {t('aboutPage.missionTitle')}
                </h3>
                <p className="text-content-main dark:text-slate-300 text-base leading-relaxed">
                  {t('aboutPage.missionDesc')}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-surface-border/60 dark:border-navy-800">
                <span className="text-xs font-semibold text-gold-600 dark:text-gold-400 uppercase tracking-widest">
                  ABU DHABI • UAE
                </span>
              </div>
            </div>
          </div>

          {/* Section 5: Our Business Values */}
          <div className="mt-16 pt-12 border-t border-surface-border dark:border-navy-800">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block mb-2">
                {t('aboutPage.valuesBadge')}
              </span>
              <h3 className="font-heading text-3xl font-extrabold text-navy-800 dark:text-white">
                {t('aboutPage.valuesTitle')}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle">
                <div className="text-gold-600 dark:text-gold-400 font-heading font-black text-2xl mb-2">01</div>
                <h4 className="font-heading text-base font-bold text-navy-800 dark:text-white mb-2">{t('aboutPage.v1Title')}</h4>
                <p className="text-content-muted dark:text-slate-400 text-xs leading-relaxed">
                  {t('aboutPage.v1Desc')}
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle">
                <div className="text-gold-600 dark:text-gold-400 font-heading font-black text-2xl mb-2">02</div>
                <h4 className="font-heading text-base font-bold text-navy-800 dark:text-white mb-2">{t('aboutPage.v2Title')}</h4>
                <p className="text-content-muted dark:text-slate-400 text-xs leading-relaxed">
                  {t('aboutPage.v2Desc')}
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle">
                <div className="text-gold-600 dark:text-gold-400 font-heading font-black text-2xl mb-2">03</div>
                <h4 className="font-heading text-base font-bold text-navy-800 dark:text-white mb-2">{t('aboutPage.v3Title')}</h4>
                <p className="text-content-muted dark:text-slate-400 text-xs leading-relaxed">
                  {t('aboutPage.v3Desc')}
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle">
                <div className="text-gold-600 dark:text-gold-400 font-heading font-black text-2xl mb-2">04</div>
                <h4 className="font-heading text-base font-bold text-navy-800 dark:text-white mb-2">{t('aboutPage.v4Title')}</h4>
                <p className="text-content-muted dark:text-slate-400 text-xs leading-relaxed">
                  {t('aboutPage.v4Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Our Trading Categories */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block mb-2">
                {t('productGrid.badge')}
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-800 dark:text-white">
                {t('footer.colCategories')}
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300"
            >
              <span>{t('productGrid.viewAll')}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.slug}`}
                className="group p-5 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle hover:shadow-premium hover:border-gold-500/50 dark:hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-32 rounded-lg overflow-hidden bg-navy-900 mb-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="font-heading text-base font-bold text-navy-800 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-content-muted dark:text-slate-400 text-xs mt-2 line-clamp-3">
                    {item.shortDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-border/60 dark:border-navy-800 text-xs font-semibold text-navy-800 dark:text-slate-200 group-hover:text-gold-600 dark:group-hover:text-gold-400 flex items-center gap-1">
                  <span>{t('productGrid.explore')}</span>
                  <ArrowRight className={`w-3.5 h-3.5 text-gold-500 ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Leadership Preview */}
      <section className="py-20 lg:py-28 bg-surface-light dark:bg-[#0A1B2A] border-t border-surface-border dark:border-navy-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block mb-2">
              {t('leadershipSection.badge')}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-800 dark:text-white">
              {t('leadershipSection.title')}
            </h2>
            <p className="mt-3 text-content-muted dark:text-slate-400 text-sm sm:text-base">
              {t('leadershipSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member) => (
              <div
                key={member.id}
                className="p-8 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle text-center flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full border-2 border-gold-500/50 overflow-hidden mb-5 bg-navy-800 shadow-subtle">
                  {member.portrait ? (
                    <img
                      src={member.portrait}
                      alt={member.portraitPlaceholder?.alt || member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gold-400">
                      <span className="font-heading text-2xl font-bold">
                        {member.portraitPlaceholder?.initials || 'EXE'}
                      </span>
                      <span className="text-[8px] uppercase tracking-widest text-slate-300">
                        {t('leadershipSection.executiveTag')}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-heading text-lg font-bold text-navy-800 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-gold-600 dark:text-gold-400 font-semibold text-xs uppercase tracking-wider mt-1 mb-3">
                  {member.title}
                </p>
                <p className="text-content-muted dark:text-slate-400 text-xs leading-relaxed">
                  {member.bioPlaceholder}
                </p>
                <div className="mt-4 pt-3 border-t border-surface-border/60 dark:border-navy-800 text-[11px] text-slate-400 dark:text-slate-500 w-full text-center">
                  <span>{t('leadershipSection.companyLocation')}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/leadership"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-navy-800 dark:text-gold-400 bg-white dark:bg-navy-800 border border-surface-border dark:border-navy-700 hover:border-gold-500 shadow-subtle transition-colors"
            >
              <span>{t('leadershipSection.viewProfiles')}</span>
              <ArrowRight className={`w-4 h-4 text-gold-500 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 8: Contact CTA */}
      <section className="py-20 bg-navy-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block">
            {t('cta.badge')}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            {t('cta.title')}
          </h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            {t('cta.subtitle')}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold bg-gold-500 text-navy-900 hover:bg-gold-400 shadow-premium transition-colors"
            >
              {t('cta.buttonContact')}
            </Link>
            <button
              onClick={() => openQuoteModal()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold bg-navy-800 hover:bg-navy-700 text-white border border-slate-700 transition-colors"
            >
              {t('quoteModal.title')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
