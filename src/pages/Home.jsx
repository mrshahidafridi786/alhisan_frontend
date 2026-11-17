import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Hero } from '../components/home/Hero';
import { CompanyIntro } from '../components/home/CompanyIntro';
import { ProductGrid } from '../components/home/ProductGrid';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { LeadershipSection } from '../components/home/LeadershipSection';
import { PartnershipCTA } from '../components/home/PartnershipCTA';

export const Home = () => {
  const { openQuoteModal } = useOutletContext();

  return (
    <>
      <SEO
        title="AL HISAN AL ASWA GENERAL TRADING | General Trading & Commercial Supply UAE"
        description="AL HISAN AL ASWA GENERAL TRADING — Trusted general trading, sourcing, and commercial supply partner in the UAE. Visit alhisanaue.com for products, inquiries, and business services."
        canonical="/"
      />

      <Hero onOpenQuote={openQuoteModal} />
      <CompanyIntro />
      <ProductGrid />
      <WhyChooseUs />
      <LeadershipSection />
      <PartnershipCTA onOpenQuote={openQuoteModal} />
    </>
  );
};
