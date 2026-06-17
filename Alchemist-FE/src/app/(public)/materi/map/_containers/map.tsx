'use client';

import dynamic from 'next/dynamic';

const GameCanvas = dynamic(() => import('@/components/canvas/GameCanvas'), {
  ssr: false,
});

export default function ContainerMap() {
  return (
    <main className="w-full h-screen flex justify-center items-center bg-[#1a1a1a]">
      <GameCanvas />
    </main>
  );
}
