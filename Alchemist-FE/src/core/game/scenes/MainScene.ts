import Phaser from 'phaser';

import Player from '../objects/Player';

export default class MainScene extends Phaser.Scene {
  private interactKey!: Phaser.Input.Keyboard.Key;
  private notebookKey!: Phaser.Input.Keyboard.Key;
  private inventoryKey!: Phaser.Input.Keyboard.Key;
  private activeWorkspaceId: string | null = null;
  private interactPromptText: string | null = null;
  private currentPromptText: string | null = null;
  private workspaces: { zone: Phaser.GameObjects.Zone; data: any }[] = [];
  private player!: Player;

  constructor() {
    super('MainScene');
  }

  preload(): void {
    // Map
    this.load.image('lab_background', '/images/map3.webp');

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
    const centerTable = this.add.zone(690, 540, 590, 250);
    this.physics.add.existing(centerTable, true);
    obstacles.add(centerTable);

    const sink = this.add.zone(1374, 778, 185, 295);
    this.physics.add.existing(sink, true);
    obstacles.add(sink);

    const wallTop = this.add.zone(697, 130, 1340, 270);
    this.physics.add.existing(wallTop, true);
    obstacles.add(wallTop);

    const wallLeft = this.add.zone(40, 373, 30, 155);
    this.physics.add.existing(wallLeft, true);
    obstacles.add(wallLeft);

    const wallBot1 = this.add.zone(305, 1016, 280, 20);
    this.physics.add.existing(wallBot1, true);
    obstacles.add(wallBot1);

    const wallBot2 = this.add.zone(1257, 1016, 420, 20);
    this.physics.add.existing(wallBot2, true);
    obstacles.add(wallBot2);

    const bins = this.add.zone(1400, 388, 120, 360);
    this.physics.add.existing(bins, true);
    obstacles.add(bins);

    const storage = this.add.zone(92, 740, 140, 575);
    this.physics.add.existing(storage, true);
    obstacles.add(storage);

    const analyzeTable = this.add.zone(700, 980, 600, 90);
    this.physics.add.existing(analyzeTable, true);
    obstacles.add(analyzeTable);

    this.physics.add.collider(this.player, obstacles);

    if (this.input.keyboard) {
      this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      this.notebookKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
      this.inventoryKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    }

    this.events.on('pause', () => {
      this.interactPromptText = null;
      this.currentPromptText = null;
      window.dispatchEvent(new CustomEvent('interact-prompt', { detail: null }));
    });

    this.events.on('sleep', () => {
      this.interactPromptText = null;
      this.currentPromptText = null;
      window.dispatchEvent(new CustomEvent('interact-prompt', { detail: null }));
    });

    this.events.on('shutdown', () => {
      this.interactPromptText = null;
      this.currentPromptText = null;
      window.dispatchEvent(new CustomEvent('interact-prompt', { detail: null }));
    });

    const workspaceData = [
      { id: 'buret_station', name: 'Meja Titrasi', x: 700, y: 575, w: 650, h: 260 },
      { id: 'storage', name: 'Lemari', x: 200, y: 800, w: 150, h: 150 },
      { id: 'meja_analisis', name: 'Meja Analisis', x: 747, y: 980, w: 200, h: 150 },
      { id: 'apd', name: 'Alat Pelindung Diri', x: 390, y: 200, w: 220, h: 200 },
      { id: 'wastafel_cuci', name: 'Wastafel Pembilasan', x: 1374, y: 778, w: 220, h: 320 },
      { id: 'bins', name: 'Tong Sampah', x: 1413, y: 388, w: 180, h: 300 },
    ];

    this.workspaces = workspaceData.map((data) => {
      const zone = this.add.zone(data.x, data.y, data.w, data.h);
      this.physics.add.existing(zone, true);
      return { zone, data };
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

    let isOverlapping = false;
    let overlappingId = null;
    let overlappingName = null;

    for (const ws of this.workspaces) {
      if (this.physics.overlap(this.player, ws.zone)) {
        isOverlapping = true;
        overlappingId = ws.data.id;
        overlappingName = ws.data.name;
        break;
      }
    }

    if (isOverlapping) {
      this.activeWorkspaceId = overlappingId;
      this.interactPromptText = `Tekan E untuk menggunakan ${overlappingName}`;

      if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
        this.handleTransitionWorkspace(this.activeWorkspaceId!);
      }
    } else {
      this.activeWorkspaceId = null;
      this.interactPromptText = null;
    }

    if (this.currentPromptText !== this.interactPromptText) {
      this.currentPromptText = this.interactPromptText;
      window.dispatchEvent(new CustomEvent('interact-prompt', { detail: this.currentPromptText }));
    }
  }

  private handleTransitionWorkspace(workspaceId: string): void {
    console.log(`Transisi ke WORKSPACE ${workspaceId}`);

    switch (workspaceId) {
      case 'buret_station':
        this.scene.pause();
        this.scene.launch('TitrationScene');
        break;
      case 'storage':
        this.scene.pause();
        this.scene.launch('StorageScene');
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
