'use client';

import MapSection from '@/components/page/public/materi/map-section';
import NavLayout from '@/core/layouts/nav.layout';

export default function ContainerMap() {
  return (
    <NavLayout>
      <main className="w-full min-h-screen bg-background relative flex flex-col">
        <MapSection />
      </main>
    </NavLayout>
  );
}
