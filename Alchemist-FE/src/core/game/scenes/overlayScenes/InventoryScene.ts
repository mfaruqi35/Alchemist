import Phaser from 'phaser';

export default class InventoryScene extends Phaser.Scene {
  private escKeyHandler!: (event: KeyboardEvent) => void;

  constructor() {
    super('InventoryScene');
  }

  create(): void {
    const width = this.scale.width;
    const height = this.scale.height;

    const backdrop = this.add.rectangle(0, 0, width, height, 0x000000, 0.5);
    backdrop.setOrigin(0, 0);

    const inventoryLayout = this.add.rectangle(width / 2, height / 2, 600, 400, 0x1a1a1a);
    inventoryLayout.setStrokeStyle(4, 0x00ff00);

    // Judul Inventaris
    this.add
      .text(width / 2, height / 2 - 140, 'TAS INVENTARIS BAHAN KIMA', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#00ff00',
      })
      .setOrigin(0.5);

    for (let i = 0; i < 4; i++) {
      const slotX = width / 2 - 180 + i * 120;
      const slotY = height / 2;

      this.add.rectangle(slotX, slotY, 90, 90, 0x333333).setStrokeStyle(2, 0x555555);

      if (i === 0) {
        this.add
          .text(slotX, slotY, 'Gelas\nKimia', {
            fontSize: '12px',
            color: '#ffffff',
            align: 'center',
          })
          .setOrigin(0.5);
      } else {
        this.add
          .text(slotX, slotY, 'Kosong', {
            fontSize: '12px',
            color: '#666666',
          })
          .setOrigin(0.5);
      }
    }

    const closeBtn = this.add
      .text(width / 2, height / 2 + 130, '[ Tutup Inventaris ]', {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#ffffff',
        backgroundColor: '#cc0000',
        padding: { x: 10, y: 5 },
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
