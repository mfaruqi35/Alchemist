'use client';

import TestSection from '@/components/page/public/materi/test-section';
import NavLayout from '@/core/layouts/nav.layout';

export default function ContainerTest() {
  return (
    <NavLayout>
      <main className="w-full min-h-screen bg-background relative ">
        <TestSection />
      </main>
    </NavLayout>
  );
}
