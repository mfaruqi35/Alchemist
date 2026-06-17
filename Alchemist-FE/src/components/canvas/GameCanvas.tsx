'use client';

import { useEffect, useRef } from 'react';

export default function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    async function initPhaser() {
      const Phaser = (await import('phaser')).default;
      const MainScene = (await import('@/core/game/scenes/MainScene')).default;

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 1497,
        height: 1051,
        parent: containerRef.current,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        physics: {
          default: 'arcade', // Mengaktifkan sistem physics arcade untuk mendeteksi pergerakan dan tabrakan
          arcade: {
            gravity: { x: 0, y: 0 }, // Set 0 karena ini game top-down (tidak ada gravitasi jatuh)
            debug: true,
          },
        },
        scene: [MainScene],
      };

      if (!gameRef.current && containerRef.current) {
        gameRef.current = new Phaser.Game(config);
      }
    }

    initPhaser();

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#000000',
        overflow: 'hidden',
      }}
    />
  );
}
