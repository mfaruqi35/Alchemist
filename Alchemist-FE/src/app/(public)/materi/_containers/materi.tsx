'use client';

import MateriSection from '@/components/page/public/materi/materi-section';
import NavLayout from '@/core/layouts/nav.layout';

export default function ContainerMateri() {
  return (
    <NavLayout>
      <main className="w-full min-h-screen bg-background relative flex flex-col">
        <MateriSection />
      </main>
    </NavLayout>
  );
}
