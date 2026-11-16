import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { productsData } from '../../data/productsData';
import { API_BASE_URL } from '../../utils/api';

export const ProductGrid = () => {
  const [items, setItems] = useState(productsData);

  useEffect(() => {
    const fetchLive = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/public/products`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data?.length) {
            const mapped = json.data.map((item, idx) => {
              const localMatch = productsData.find((p) => p.slug === item.slug);
              return {
                id: item.slug || `prod-${idx}`,
                slug: item.slug,
                name: item.name,
                category: item.category,
                shortDescription: item.shortDescription || localMatch?.shortDescription,
                imageUrl: item.imageUrl || localMatch?.imageUrl || '/assets/logo.jpg',
              };
            });
            setItems(mapped);
          }
        }
      } catch (e) {}
    };
    fetchLive();
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-surface-light dark:bg-[#0A1B2A] border-y border-surface-border dark:border-navy-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest mb-3">
              <span className="w-6 h-[1.5px] bg-gold-600 dark:bg-gold-400"></span>
              <span>Commercial Commodities & Materials</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy-800 dark:text-white tracking-tight">
              Our Product Portfolio
            </h2>
            <p className="mt-3 text-content-muted dark:text-slate-400 text-base">
              Explore our range of industrial materials and essential trading products.
            </p>
          </div>

          <div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy-800 dark:text-gold-400 hover:text-gold-600 dark:hover:text-gold-300 transition-colors group"
            >
              <span>View Full Trading Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold-600 dark:text-gold-400" />
            </Link>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((product, idx) => (
            <div
              key={product.id}
              className={`group flex flex-col bg-white dark:bg-navy-900 rounded-xl border border-surface-border dark:border-navy-700/80 overflow-hidden shadow-subtle hover:shadow-premium-hover hover:border-gold-500/40 dark:hover:border-gold-500/50 transition-all duration-300 ${
                idx === 3 || idx === 4 ? 'lg:col-span-1' : ''
              }`}
            >
              {/* Product Image Container */}
              <div className="relative h-60 overflow-hidden bg-navy-900">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent"></div>
                
                {/* Category Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-lg bg-navy-900/80 backdrop-blur-md text-gold-400 text-xs font-semibold uppercase tracking-wider border border-navy-700/60">
                    {product.category?.split('&')[0]}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-heading text-xl font-bold text-navy-800 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-2.5 text-content-muted dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-surface-border/60 dark:border-navy-800 flex items-center justify-between">
                  <Link
                    to={`/products/${product.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 dark:text-slate-200 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                  >
                    <span>Explore Product</span>
                    <ArrowRight className="w-4 h-4 text-gold-500 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    Trading Details
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
