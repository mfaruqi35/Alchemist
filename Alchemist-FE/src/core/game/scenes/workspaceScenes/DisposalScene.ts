import Phaser from 'phaser';

export default class DisposalScene extends Phaser.Scene {
  private escKeyHandler!: (event: KeyboardEvent) => void;
  private trashBin!: Phaser.GameObjects.Image;
  private items: Phaser.GameObjects.Image[] = [];

  constructor() {
    super('DisposalScene');
  }

  preload() {
    this.load.image('labs_bg', '/images/labs.webp');
    this.load.image('tongsampah', '/images/tongsampah.webp');
    this.load.image('item11', '/images/item11.webp');
    this.load.image('item12', '/images/item12.webp');
    this.load.image('item13', '/images/item13.webp');
    this.load.image('item14', '/images/item14.webp');
    this.load.image('item15', '/images/item15.webp');
  }

  create(): void {
    const width = this.scale.width;
    const height = this.scale.height;

    // Full screen background
    const bg = this.add.image(width / 2, height / 2, 'labs_bg');
    // Scale background to cover screen
    const scaleX = width / bg.width;
    const scaleY = height / bg.height;
    const scale = Math.max(scaleX, scaleY);
    bg.setScale(scale);
    bg.setTint(0x555555); // Darken a bit so UI stands out

    // Semi-transparent overlay to make it look like a menu
    this.add.rectangle(0, 0, width, height, 0x000000, 0.4).setOrigin(0, 0);

    // Judul Scene
    this.add
      .text(width / 2, 80, 'Fasilitas Pembuangan Limbah', {
        fontFamily: 'Arial',
        fontSize: '36px',
        color: '#ffffff',
        fontStyle: 'bold',
        shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 4, fill: true }
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 130, 'Tarik item dari inventaris ke tong sampah untuk membuangnya.', {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#e0e0e0',
        shadow: { offsetX: 1, offsetY: 1, color: '#000', blur: 2, fill: true }
      })
      .setOrigin(0.5);

    // Trash Bin (Drop Zone)
    this.trashBin = this.add.image(width / 2, height / 2 - 20, 'tongsampah');
    this.trashBin.setScale(0.9);
    
    // Create a drop zone over the trash bin
    const binZone = this.add.zone(this.trashBin.x, this.trashBin.y, this.trashBin.displayWidth, this.trashBin.displayHeight)
      .setRectangleDropZone(this.trashBin.displayWidth, this.trashBin.displayHeight);

    // --- Hotbar UI ---
    const hotbarY = height - 120;
    const slotSize = 90;
    const padding = 15;
    const startX = width / 2 - (5 * slotSize + 4 * padding) / 2 + slotSize / 2;

    const hotbarContainer = this.add.rectangle(width / 2, hotbarY, 5 * slotSize + 6 * padding, slotSize + 2 * padding, 0x222222, 0.9);
    hotbarContainer.setStrokeStyle(3, 0x555555);

    const itemKeys = ['item11', 'item12', 'item13', 'item14', 'item15'];

    for (let i = 0; i < 5; i++) {
      const x = startX + i * (slotSize + padding);
      const slot = this.add.rectangle(x, hotbarY, slotSize, slotSize, 0x111111);
      slot.setStrokeStyle(2, 0x444444);
      
      this.add.text(x - slotSize/2 + 8, hotbarY - slotSize/2 + 8, `${i + 1}`, {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#aaaaaa',
      });

      // Spawn item
      const itemKey = itemKeys[i];
      const item = this.add.image(x, hotbarY, itemKey);
      
      // Calculate scale to fit inside slot
      const itemScale = Math.min((slotSize - 20) / item.width, (slotSize - 20) / item.height);
      item.setScale(itemScale);
      
      item.setInteractive({ cursor: 'grab' });
      this.input.setDraggable(item);

      item.setData('startX', x);
      item.setData('startY', hotbarY);
      item.setData('baseScale', itemScale);
      item.setData('itemId', itemKey);

      this.items.push(item);
    }

    // Drag events
    this.input.on('dragstart', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) => {
      this.children.bringToTop(gameObject);
      const baseScale = gameObject.getData('baseScale');
      gameObject.setScale(baseScale * 1.3); // Slightly larger when holding
    });

    this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image, dragX: number, dragY: number) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('dragenter', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image, dropZone: Phaser.GameObjects.Zone) => {
      // Glow or highlight bin
      this.trashBin.setTint(0xddffdd);
    });

    this.input.on('dragleave', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image, dropZone: Phaser.GameObjects.Zone) => {
      this.trashBin.clearTint();
    });

    this.input.on('drop', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image, dropZone: Phaser.GameObjects.Zone) => {
      this.trashBin.clearTint();
      
      const itemId = gameObject.getData('itemId');
      
      // LOGIKA MATCHING (SESUAIKAN ITEM MANA YANG BOLEH DIBUANG)
      // Contoh: Anggap item11 dan item13 adalah limbah cair/berbahaya yang tidak boleh ke tong sampah biasa.
      // Anda bisa mengganti array ini dengan item yang benar-benar cocok.
      const matchItems = ['item12', 'item14', 'item15']; // Item yang BISA dibuang ke tong sampah
      const isMatch = matchItems.includes(itemId);

      if (!isMatch) {
        // Apabila tidak match berikan alert
        this.dispatchGameAlert(
          `Item ini tidak cocok dibuang ke tong sampah ini! Harap buang ke tempat yang sesuai.`,
          'Pembuangan Ditolak',
          'error'
        );
        
        // Snap back
        gameObject.x = gameObject.getData('startX');
        gameObject.y = gameObject.getData('startY');
        gameObject.setScale(gameObject.getData('baseScale'));
      } else {
        // MATCH: Item berhasil dibuang
        this.dispatchGameAlert(
          'Limbah berhasil dibuang ke tempat yang benar.',
          'Pembuangan Berhasil',
          'success'
        );
        
        // Destroy the item or make it invisible
        gameObject.destroy();
      }
    });

    this.input.on('dragend', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image, dropped: boolean) => {
      if (!dropped && gameObject.active) {
        // Snap back if not dropped on zone
        gameObject.x = gameObject.getData('startX');
        gameObject.y = gameObject.getData('startY');
        gameObject.setScale(gameObject.getData('baseScale'));
      }
    });

    // Close button
    const closeBtn = this.add
      .text(width / 2, hotbarY + 90, '[ ESC ] Tutup', {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#ffffff',
        backgroundColor: '#4B2F89',
        padding: { x: 20, y: 10 },
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

  private dispatchGameAlert(message: string, title: string, icon: 'success' | 'error' | 'warning' | 'info') {
    window.dispatchEvent(
      new CustomEvent('game-alert', {
        detail: { message, title, icon }
      })
    );
  }

  private closeMenu(): void {
    window.removeEventListener('keydown', this.escKeyHandler);

    this.scene.resume('MainScene');
    this.scene.stop();
  }
}
