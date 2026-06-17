import Phaser from 'phaser';

export default class TitrationScene extends Phaser.Scene {
  constructor() {
    super('TitrationScene');
  }
  preload(): void {
    // Layer 1: background

    this.load.image('scene_background', 'images/titrationWorkspace.webp');

    this.load.image('statif', '/images/statif.webp');
    this.load.image('erlenmayer', '/images/erlenmayer.webp');
    this.load.image('buret', '/images/buret.webp');
  }

  create(): void {
    const width = this.scale.width;
    const height = this.scale.height;

    // titik tengah layar sebagai acuan utama
    const centerX = width / 2;
    const centerY = height / 2;

    // Layer 1: Background
    this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0, 0);
    this.add.image(centerX, centerY, 'scene_background');

    // ==========================================
    // KONFIGURASI SKALA (Ganti angka ini untuk memperkecil/memperbesar)
    // ==========================================
    const skalaAlat = 0.48; // Mengurangi ukuran menjadi 50% dari ukuran asli AI
    const skalaErlenmayer = 0.2;

    // LAYERING 2: Cairan Placeholder (Akan otomatis berada di belakang Erlenmeyer)
    // Posisinya disesuaikan agar pas di dalam dasar perut erlenmeyer
    const cairanPlaceholder = this.add.rectangle(
      centerX + 30,
      centerY + 340,
      140 * skalaAlat,
      180 * skalaAlat,
      0xffffff,
      0.6
    );

    // LAYERING 3: Susunan Alat Kimia
    // 1. Statif (Digeser agak ke kiri dari buret dan dibalik horizontal agar klem menghadap kanan)
    const statif = this.add.image(centerX - 10, centerY - 50, 'statif');
    statif.setScale(skalaAlat);
    statif.setFlipX(true);

    // 2. Erlenmeyer (Diletakkan di bagian paling bawah meja)

    const buret = this.add.image(centerX - 40, centerY - 188, 'buret');
    buret.setScale(skalaAlat);
    buret.setFlipX(true);

    const erlenmeyer = this.add.image(centerX - 40, centerY + 180, 'erlenmayer');
    erlenmeyer.setScale(skalaErlenmayer);
    // 3. Buret (Diletakkan menggantung di atas erlenmeyer, menempel pada klem statif)

    // ==========================================
    // TEKS HUD & INPUT ESCAPE
    // ==========================================
    this.add.text(50, 50, 'SIMULASI TITRASI ASAM-BASA', {
      fontFamily: 'Arial',
      fontSize: '28px',
      color: '#ffffff',
    });

    this.add.text(50, 100, 'Tekan ESC untuk kembali ke Laboratorium Utama', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#aaaaaa',
    });

    this.setupEscKey();
  }

  private setupEscKey(): void {
    const escHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        window.removeEventListener('keydown', escHandler);
        this.scene.resume('MainScene'); // Berpindah scene kembali penuh
        this.scene.stop();
      }
    };
    window.addEventListener('keydown', escHandler);
  }
}
