import Phaser from 'phaser';

export default class NotebookScene extends Phaser.Scene {
  private escKeyHandler!: (event: KeyboardEvent) => void;

  constructor() {
    super('NotebookScene');
  }

  create(): void {
    const width = this.scale.width;
    const height = this.scale.height;

    const backdrop = this.add.rectangle(0, 0, width, height, 0x000000, 0.5);
    backdrop.setOrigin(0, 0);

    const notebookLayout = this.add.rectangle(width / 2, height / 2, 700, 500, 0xf5f5dc);
    notebookLayout.setStrokeStyle(6, 0x8b4513); // Garis tepi cokelat tua

    this.add
      .text(width / 2, height / 2 - 180, 'BUKU CATATAN JURNAL LAB', {
        fontFamily: 'Courier New',
        fontSize: '28px',
        color: '#8b4513',
      })
      .setOrigin(0.5);

    // Konten Dummy Catatan
    const dummyText =
      '- Prosedur 1: Gunakan APD sebelum memulai.\n' +
      '- Prosedur 2: Bilas gelas kimia di wastafel.\n' +
      '- Prosedur 3: Isi buret dengan larutan asam.\n' +
      '- Prosedur 4: Catat perubahan warna indikator.';

    this.add.text(width / 2 - 300, height / 2 - 100, dummyText, {
      fontFamily: 'Courier New',
      fontSize: '18px',
      color: '#000000',
      lineSpacing: 12,
    });

    // Tombol Tutup
    const closeBtn = this.add
      .text(width / 2, height / 2 + 180, '[ Tutup Catatan ]', {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#ff0000',
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
