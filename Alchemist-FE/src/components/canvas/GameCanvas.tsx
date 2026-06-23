'use client';

import { useEffect, useRef, useState } from 'react';

import MainScene from '@/core/game/scenes/MainScene';
import CalculatorScene from '@/core/game/scenes/overlayScenes/CalculatorScene';
import InventoryScene from '@/core/game/scenes/overlayScenes/InventoryScene'; // Impor di sini
import NotebookScene from '@/core/game/scenes/overlayScenes/NotebookScene';
import AnalyzeTableScene from '@/core/game/scenes/workspaceScenes/AnalyzeTableScene';
import DisposalScene from '@/core/game/scenes/workspaceScenes/DisposalScene';
import StorageScene from '@/core/game/scenes/workspaceScenes/StorageScene';
import TitrationScene from '@/core/game/scenes/workspaceScenes/TitrationScene';
import QuestScene from '@/core/game/scenes/overlayScenes/QuestScene';
import { useAlert } from '@/hooks/useAlert/costum-alert';

export default function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const [promptText, setPromptText] = useState<string | null>(null);
  const { toast: toastAlert } = useAlert();

  useEffect(() => {
    const handlePrompt = (e: Event) => {
      const customEvent = e as CustomEvent<string | null>;
      setPromptText(customEvent.detail);
    };

    const handleAlert = (e: Event) => {
      const customEvent = e as CustomEvent<{
        message: string;
        title: string;
        icon?: 'success' | 'error' | 'warning' | 'info';
      }>;
      toastAlert(customEvent.detail);
    };

    window.addEventListener('interact-prompt', handlePrompt);
    window.addEventListener('game-alert', handleAlert);

    return () => {
      window.removeEventListener('interact-prompt', handlePrompt);
      window.removeEventListener('game-alert', handleAlert);
    };
  }, [toastAlert]);

  useEffect(() => {
    async function initPhaser() {
      const Phaser = (await import('phaser')).default;

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
        scene: [
          MainScene,
          NotebookScene,
          InventoryScene,
          QuestScene,
          TitrationScene,
          AnalyzeTableScene,
          CalculatorScene,
          DisposalScene,
          StorageScene,
        ],
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
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 w-screen h-screen bg-black overflow-hidden"
      />
      {promptText && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="bg-black/80 text-white font-mono text-sm md:text-base lg:text-lg px-6 py-3 border-4 border-secondary rounded shadow-[4px_4px_0px_rgba(26,42,122,1)] tracking-wider">
            {promptText}
          </div>
        </div>
      )}
    </>
  );
}
