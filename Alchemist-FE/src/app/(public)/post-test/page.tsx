import type { Metadata } from 'next';
import { Suspense } from 'react';

import ContainerPostTest from './_containers/post-test';

export const metadata: Metadata = {
  title: 'Post Test - Alchemist',
  description: 'Evaluasi akhir materi laboratorium Alchemist',
};

export default function PostTestPage() {
  return (
    <Suspense>
      <ContainerPostTest />
    </Suspense>
  );
}
