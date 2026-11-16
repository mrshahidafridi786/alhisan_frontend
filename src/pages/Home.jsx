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
        title="Alhisan Trading Company | Connecting Global Markets"
        description="Alhisan is an international trading company based in Abu Dhabi, UAE, dealing in essential industrial commodities, food products, spices, salt, soda ash, and calcium carbonate."
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
