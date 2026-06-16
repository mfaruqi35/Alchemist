'use client';
import CtaSection from '@/components/page/public/home/cta-section';
import FeaturesSection from '@/components/page/public/home/features-section';
import FlowSection from '@/components/page/public/home/flow-section';
import HeroSection from '@/components/page/public/home/hero-section';
import NavLayout from '@/core/layouts/nav.layout';

export default function ContainerHome() {

  return (
    <NavLayout>
      <main className="w-full min-h-screen bg-background relative flex flex-col">
        <HeroSection />
        <FeaturesSection />
        <FlowSection />
        <CtaSection />
      </main>
    </NavLayout>
  );
}
