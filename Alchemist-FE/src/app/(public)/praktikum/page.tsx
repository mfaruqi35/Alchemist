import type { Metadata } from 'next';
import { Suspense } from 'react';

import ContainerPraktikum from './_containers/praktikum';

export const metadata: Metadata = {
  title: 'Modul Praktikum - Alchemist',
  description: 'Modul Pembelajaran Alchemist',
};

export default function PraktikumPage() {
  return (
    <Suspense>
      <ContainerPraktikum />
    </Suspense>
  );
}
