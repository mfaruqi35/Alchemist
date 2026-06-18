import Phaser from 'phaser';

export default class AnalyzeTableScene extends Phaser.Scene {
  constructor() {
    super('AnalyzeTableScene');
  }

  preload(): void {
    this.load.image('analyze_table_bg', '/images/tabelAnalis.webp');
    this.load.image('calculator', '/images/calculator.webp');
  }

  create(): void {
    const width = this.scale.width;
    const height = this.scale.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const centerX1 = centerX - 270;
    const centerY1 = centerY + 220;

    this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0, 0);
    this.add.image(centerX, centerY, 'analyze_table_bg');

    const calculatorBtn = this.add.image(centerX1, centerY1, 'calculator');
    calculatorBtn.setScale(0.3);
    calculatorBtn.setInteractive({ useHandCursor: true });

    calculatorBtn.on('pointerdown', () => {
      this.scene.pause();
      this.scene.launch('CalculatorScene');
    });

    this.add.text(50, 50, 'MEJA TIMBANGAN DIGITAL (ANALISIS)', {
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
        this.scene.resume('MainScene');
        this.scene.stop();
      }
    };
    window.addEventListener('keydown', escHandler);
  }
}
