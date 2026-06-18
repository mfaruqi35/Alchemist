import Phaser from 'phaser';

export default class StorageScene extends Phaser.Scene {
  constructor() {
    super('StorageScene');
  }

  preload(): void {
    this.load.image('scene_background_storage', '/images/storageWorkspace.webp');
  }

  create(): void {
    const width = this.scale.width;
    const height = this.scale.height;

    const centerX = width / 2;
    const centerY = height / 2;

    // Layer 1: Background & Overlay Gelap
    this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0, 0);
    this.add.image(centerX, centerY, 'scene_background_storage');

    // Teks HUD Utama
    this.add.text(50, 50, 'GUDANG PENYIMPANAN ALAT & BAHAN', {
      fontFamily: 'AlchemistPixel',
      fontSize: '28px',
      color: '#ffffff',
    });

    this.add.text(50, 100, 'Tekan ESC untuk kembali ke Laboratorium Utama', {
      fontFamily: 'AlchemistPixel',
      fontSize: '18px',
      color: '#aaaaaa',
    });

    this.setupEscKey();
  }

  private setupEscKey(): void {
    const escHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        window.removeEventListener('keydown', escHandler);
        this.scene.resume('MainScene');
        this.scene.stop();
      }
    };
    window.addEventListener('keydown', escHandler);
  }
}
