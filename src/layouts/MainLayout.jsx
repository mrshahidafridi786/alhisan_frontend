import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { QuoteModal } from '../components/common/QuoteModal';
import { FloatingWhatsApp } from '../components/common/FloatingWhatsApp';
import { ScrollToTop } from '../components/common/ScrollToTop';

export const MainLayout = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState('');

  const handleOpenQuoteModal = (product = '') => {
    setQuoteProduct(product);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setQuoteProduct('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-warm dark:bg-[#071524] text-content-main dark:text-slate-100 selection:bg-gold-500 selection:text-white transition-colors duration-300">
      <ScrollToTop />
      <Navbar onOpenQuoteModal={() => handleOpenQuoteModal()} />

      <main className="flex-grow">
        {/* Pass down quote modal opener via Outlet context */}
        <Outlet context={{ openQuoteModal: handleOpenQuoteModal }} />
      </main>

      <Footer />
      <FloatingWhatsApp />

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuoteModal}
        initialProduct={quoteProduct}
      />
    </div>
  );
};
