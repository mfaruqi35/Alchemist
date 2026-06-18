import Phaser from 'phaser';
import Player from '../objects/Player';

export default class MainScene extends Phaser.Scene {
  private interactKey!: Phaser.Input.Keyboard.Key;
  private notebookKey!: Phaser.Input.Keyboard.Key;
  private inventoryKey!: Phaser.Input.Keyboard.Key;
  private interactPrompt!: Phaser.GameObjects.Text;
  private activeWorkspaceId: string | null = null;
  private player!: Player;

  constructor() {
    super('MainScene');
  }

  preload(): void {
    // Map
    this.load.image('lab_background', '/images/Maps.webp');

    // Character
    this.load.image('player_front', '/player/apd/apd_front.webp');
    this.load.image('player_back', '/player/apd/apd_backward.webp');
    this.load.image('player_right', '/player/apd/apd_right.webp');
    this.load.image('player_left', '/player/apd/apd_left.webp');
  }

  create(): void {
    const width = this.scale.width;
    const height = this.scale.height;

    const bg = this.add.image(width / 2, height / 2, 'lab_background');

    const scaleY = height / bg.height;
    bg.setScale(scaleY);

    // Instansiasi player menggunakan class baru
    this.player = new Player(this, 222, 320);

    const obstacles = this.physics.add.staticGroup();

    // Obstacles
    const centerTable = this.add.zone(745, 575, 600, 250);
    this.physics.add.existing(centerTable, true);
    obstacles.add(centerTable);

    const sink = this.add.zone(1374, 778, 185, 295);
    this.physics.add.existing(sink, true);
    obstacles.add(sink);

    const wallTop = this.add.zone(697, 158, 1340, 270);
    this.physics.add.existing(wallTop, true);
    obstacles.add(wallTop);

    const wallLeft = this.add.zone(40, 373, 30, 155);
    this.physics.add.existing(wallLeft, true);
    obstacles.add(wallLeft);

    const wallRight = this.add.zone(1450, 598, 30, 55);
    this.physics.add.existing(wallRight, true);
    obstacles.add(wallRight);

    const wallBot1 = this.add.zone(305, 1016, 280, 20);
    this.physics.add.existing(wallBot1, true);
    obstacles.add(wallBot1);

    const wallBot2 = this.add.zone(1257, 1016, 420, 20);
    this.physics.add.existing(wallBot2, true);
    obstacles.add(wallBot2);

    const bins = this.add.zone(1413, 388, 100, 360);
    this.physics.add.existing(bins, true);
    obstacles.add(bins);

    const storage = this.add.zone(92, 740, 140, 575);
    this.physics.add.existing(storage, true);
    obstacles.add(storage);

    const analyzeTable = this.add.zone(747, 980, 600, 90);
    this.physics.add.existing(analyzeTable, true);
    obstacles.add(analyzeTable);

    this.physics.add.collider(this.player, obstacles);

    if (this.input.keyboard) {
      this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      this.notebookKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
      this.inventoryKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    }

    this.interactPrompt = this.add.text(width / 2, height / 2, 'Tekan E untuk mulai eksperimen', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 },
    });

    this.interactPrompt.setOrigin(0.5);
    this.interactPrompt.setScrollFactor(0);
    this.interactPrompt.setVisible(false);

    const workspaceData = [
      { id: 'buret_station', name: 'Meja Titrasi', x: 745, y: 575, w: 650, h: 260 },
      { id: 'storage', name: 'Lemari', x: 200, y: 800, w: 150, h: 150 },
      { id: 'meja_analisis', name: 'Meja Analisis', x: 747, y: 980, w: 200, h: 150 },
      { id: 'apd', name: 'Alat Pelindung Diri', x: 430, y: 200, w: 220, h: 200 },
      { id: 'wastafel_cuci', name: 'Wastafel Pembilasan', x: 1374, y: 778, w: 220, h: 320 },
    ];

    workspaceData.forEach((data) => {
      const zone = this.add.zone(data.x, data.y, data.w, data.h);
      this.physics.add.existing(zone, true);

      this.physics.add.overlap(
        this.player,
        zone,
        () => {
          this.activeWorkspaceId = data.id;

          this.interactPrompt.setText(`Tekan E untuk menggunakan ${data.name}`);
          this.interactPrompt.setVisible(true);
        },
        undefined,
        this
      );
    });
  }

  update(): void {
    if (!this.player) return;

    this.player.update();

    if (Phaser.Input.Keyboard.JustDown(this.notebookKey)) {
      this.handleOpenGlobalOverlay('notebook');
      return;
    }
    if (Phaser.Input.Keyboard.JustDown(this.inventoryKey)) {
      this.handleOpenGlobalOverlay('inventory');
      return;
    }

    if (this.activeWorkspaceId !== null) {
      if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
        this.handleTransitionWorkspace(this.activeWorkspaceId);
      }

      this.activeWorkspaceId = null;
    } else {
      this.interactPrompt.setVisible(false);
    }
  }

  private handleTransitionWorkspace(workspaceId: string): void {
    console.log(`Transisi ke WORKSPACE ${workspaceId}`);

    switch (workspaceId) {
      case 'buret_station':
        this.scene.pause();
        this.scene.launch('TitrationScene');
        break;
      default:
        console.warn(`Workspace ID ${workspaceId} belum terintegrasi dengan scene.`);
        break;
    }
  }

  private handleOpenGlobalOverlay(overlayId: string): void {
    console.log(`Membuka Global Overly ${overlayId}`);
    this.scene.pause();
    switch (overlayId) {
      case 'notebook':
        this.scene.launch('NotebookScene');
        break;
      case 'inventory':
        this.scene.launch('InventoryScene'); // Membuka file InventoryScene.ts Anda
        break;
      default:
        this.scene.resume('MainScene'); // Pengaman jika ID tidak ditemukan
        break;
    }
  }
}
