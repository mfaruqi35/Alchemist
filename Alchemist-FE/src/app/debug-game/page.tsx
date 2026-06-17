'use client';
import dynamic from 'next/dynamic';

const GameCanvas = dynamic(() => import('@/components/canvas/GameCanvas'), {
  ssr: false,
});

export default function Home() {
  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#1a1a1a',
      }}
    >
      <GameCanvas />
    </main>
  );
}
