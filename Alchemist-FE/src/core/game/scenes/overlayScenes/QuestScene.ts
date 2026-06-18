import Phaser from 'phaser';

export default class QuestScene extends Phaser.Scene {
  private escKeyHandler!: (event: KeyboardEvent) => void;

  constructor() {
    super('QuestScene');
  }

  preload(): void {
    this.load.image('quest_overlay', '/images/quest_overlay.webp');
  }

  create(): void {
    const width = this.scale.width;
    const height = this.scale.height;

    // Background Image
    const bg = this.add.image(width / 2, height / 2, 'quest_overlay');
    const scaleX = width / bg.width;
    const scaleY = height / bg.height;
    const scale = Math.max(scaleX, scaleY);
    bg.setScale(scale);

    const objX = width - 550; // Whiteboard center X
    const objY = 185; // Whiteboard center Y

    // Title on whiteboard
    this.add
      .text(objX - 500, objY + 70, 'TUGAS LABORATORIUM', {
        fontFamily: 'Arial',
        fontSize: '42px',
        color: '#1a2a7a', // Blue marker color
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Quest Objective Text
    const objectiveText =
      'Tentukan konsentrasi larutan NaOH yang tidak diketahui menggunakan larutan standar HCl 0,2 M sebanyak 25 mL.\n\n' +
      'Alur:\n' +
      '- Keselamatan lab: pakai APD\n' +
      '- Storage: ambil HCl 0,2 M, larutan NaOH unknown, indikator fenolftalein, buret, erlenmeyer\n' +
      '- Titrasi: isi buret dengan HCl, masukkan NaOH ke erlenmeyer, titrasi sampai warna berubah, catat volume HCl\n' +
      '- Analysis: hitung konsentrasi NaOH dengan M1V1 = M2V2\n' +
      '- Disposal: cek pH sisa larutan, buang ke kontainer yang sesuai';

    this.add
      .text(objX - 250, objY + 380, objectiveText, {
        fontFamily: 'Arial',
        fontSize: '30px',
        color: '#222222', // Dark marker color
        lineSpacing: 6,
        wordWrap: { width: 1200, useAdvancedWrap: true },
      })
      .setOrigin(0.5);

    // Close Button below whiteboard
    const closeBtn = this.add
      .text(objX + 290, objY + 550, '[ Tutup Papan Tugas (Esc) ]', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#ff0000',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    closeBtn.on('pointerdown', () => this.closeMenu());

    this.escKeyHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.closeMenu();
      }
    };

    window.addEventListener('keydown', this.escKeyHandler);
  }

  private closeMenu(): void {
    window.removeEventListener('keydown', this.escKeyHandler);
    this.scene.resume('MainScene');
    this.scene.stop();
  }
}
