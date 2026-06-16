'use client';

import MenuSection from '@/components/page/public/menu/menu-section';
import NavLayout from '@/core/layouts/nav.layout';

export default function ContainerMenu() {
  return (
    <NavLayout>
      <main className="w-full min-h-screen bg-background relative ">
        <MenuSection />
      </main>
    </NavLayout>
  );
}
