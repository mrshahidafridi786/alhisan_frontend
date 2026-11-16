import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { productsData } from '../data/productsData';
import { API_BASE_URL } from '../utils/api';

export const Products = () => {
  const { openQuoteModal } = useOutletContext();
  const [items, setItems] = useState(productsData);

  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/public/products`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data?.length) {
            // Merge with local rich descriptions if matching slug
            const merged = json.data.map((item, idx) => {
              const localMatch = productsData.find((p) => p.slug === item.slug);
              return {
                id: item.slug || `prod-${idx}`,
                slug: item.slug,
                name: item.name,
                category: item.category,
                shortDescription: item.shortDescription || localMatch?.shortDescription,
                overview: item.shortDescription || localMatch?.overview,
                imageUrl: item.imageUrl || localMatch?.imageUrl || '/assets/logo.jpg',
                applications: localMatch?.applications || [
                  { title: 'Commercial Supply', description: 'Wholesale B2B trade fulfillment' },
                  { title: 'Industrial Processing', description: 'Standard industrial compliance' },
                ],
              };
            });
            setItems(merged);
          }
        }
      } catch (e) {
        // Fallback gracefully to productsData
      }
    };
    fetchLiveProducts();
  }, []);

  return (
    <div className="bg-surface-warm dark:bg-[#071524] transition-colors duration-300">
      <SEO
        title="Trading Portfolio | Industrial Materials & Commodity Categories"
        description="Explore Alhisan's international trading categories supplied from Abu Dhabi, UAE."
        canonical="/products"
      />

      {/* Page Header */}
      <section className="relative py-20 lg:py-24 bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=80"
            alt="International commodity cargo warehouse and logistics operations"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/90 to-navy-900/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-widest mb-4">
              <span className="w-6 h-[1.5px] bg-gold-400"></span>
              <span>International Commodity Portfolios</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Our Product Categories
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              Explore our core trading categories spanning foundational industrial minerals, 
              essential chemical raw materials, agricultural food commodities, and culinary spices.
            </p>
          </div>
        </div>
      </section>

      {/* Products Portfolio Grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {items.map((product, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={product.id}
                  className={`bg-white dark:bg-navy-900 rounded-2xl border border-surface-border dark:border-navy-700/80 shadow-subtle hover:shadow-premium transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Product Image Column */}
                  <div
                    className={`lg:col-span-5 relative h-72 sm:h-80 lg:h-auto overflow-hidden bg-navy-900 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-lg bg-navy-900/80 backdrop-blur-md text-gold-400 text-xs font-semibold uppercase tracking-wider border border-navy-700/60">
                        Category {idx + 1} of {items.length}
                      </span>
                    </div>
                  </div>

                  {/* Product Content Column */}
                  <div
                    className={`lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-semibold text-gold-600 dark:text-gold-400 uppercase tracking-widest block mb-2">
                        {product.category}
                      </span>
                      <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy-800 dark:text-white">
                        {product.name}
                      </h2>
                      <p className="mt-3 text-content-main dark:text-slate-300 text-base leading-relaxed">
                        {product.overview}
                      </p>

                      {/* Key Commercial Applications Highlights */}
                      <div className="mt-6 pt-6 border-t border-surface-border/60 dark:border-navy-800">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-navy-800 dark:text-white mb-3">
                          Typical Commercial Applications:
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-content-muted dark:text-slate-400">
                          {product.applications.slice(0, 4).map((app) => (
                            <div key={app.title} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                              <span className="font-medium text-slate-700 dark:text-slate-300">{app.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 pt-6 border-t border-surface-border/60 dark:border-navy-800 flex flex-wrap items-center gap-4">
                      <Link
                        to={`/products/${product.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-navy-800 dark:bg-navy-700 text-white hover:bg-navy-700 dark:hover:bg-navy-600 shadow-subtle transition-colors"
                      >
                        <span>Explore Details & Applications</span>
                        <ArrowRight className="w-4 h-4 text-gold-400" />
                      </Link>

                      <button
                        onClick={() => openQuoteModal(product.name)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white dark:bg-navy-800 text-navy-800 dark:text-slate-200 border border-surface-border dark:border-navy-700 hover:border-gold-500 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                      >
                        <FileText className="w-4 h-4 text-gold-500" />
                        <span>Request Quote for {product.name}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inquiry CTA */}
      <section className="py-20 bg-surface-light dark:bg-[#0A1B2A] border-t border-surface-border dark:border-navy-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block">
            Procurement & Commercial Terms
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-800 dark:text-white">
            Need Detailed Specifications or Sourcing Terms?
          </h2>
          <p className="text-content-muted dark:text-slate-400 text-base leading-relaxed">
            Because trade volumes, packaging formats, and delivery terms vary by market, 
            our trading desk prepares formal quotations tailored specifically to your enterprise requirements.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openQuoteModal()}
              className="px-8 py-3.5 rounded-xl text-sm font-semibold bg-navy-800 dark:bg-navy-700 text-white hover:bg-navy-700 dark:hover:bg-navy-600 border border-gold-500/40 shadow-premium transition-all"
            >
              Request a Custom Commercial Quotation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
