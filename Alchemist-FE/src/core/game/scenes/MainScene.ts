import Phaser from 'phaser';

import Player from '../objects/Player';

export default class MainScene extends Phaser.Scene {
  private interactKey!: Phaser.Input.Keyboard.Key;
  private questKey!: Phaser.Input.Keyboard.Key;
  private inventoryKey!: Phaser.Input.Keyboard.Key;
  private activeWorkspaceId: string | null = null;
  private interactPromptText: string | null = null;
  private currentPromptText: string | null = null;
  private workspaces: { zone: Phaser.GameObjects.Zone; data: any }[] = [];
  private player!: Player;
  private dynamicInteractPrompt!: Phaser.GameObjects.Text;

  constructor() {
    super('MainScene');
  }

  preload(): void {
    // Map
    this.load.image('lab_background', '/images/mapnew.webp');

    // Character
    this.load.image('player_front', '/player/apd/apd_front.webp');
    this.load.image('player_back', '/player/apd/apd_backward.webp');
    this.load.image('player_right', '/player/apd/apd_right.webp');
    this.load.image('player_left', '/player/apd/apd_left.webp');
    this.load.spritesheet('player_walk_back_sheet', '/player/apd/walk_back.webp', {
      frameWidth: 350,
      frameHeight: 604,
    });

    // UI
    this.load.image('modul_lab', '/images/modulLab.webp');
  }

  create(): void {
    const width = this.scale.width;
    const height = this.scale.height;
    this.dynamicInteractPrompt = this.add
      .text(0, 0, '', {
        fontFamily: 'Arial', // Ganti dengan 'AlchemistPixel' jika custom font sudah aktif
        fontSize: '18px',
        color: '#ffffff',
        fontStyle: 'bold',
        backgroundColor: '#000000aa',
        padding: { x: 12, y: 6 },
        align: 'center',
      })
      .setOrigin(0.5);

    // Sembunyikan di awal permainan sebelum ada zona yang didekati
    this.dynamicInteractPrompt.setVisible(false);
    // Set depth tinggi agar selalu merender di atas layer player maupun meja
    this.dynamicInteractPrompt.setDepth(200);

    const bg = this.add.image(width / 2, height / 2, 'lab_background');
    const objX = width - 550;
    const objY = 125;

    // const objectiveBorder = this.add.image(objX, objY, 'objective_border');
    // objectiveBorder.setScale(0.55);
    // objectiveBorder.setScrollFactor(0); // Fixed position on screen

    const objectiveText = `Tentukan konsentrasi larutan NaOH yang tidak diketahui menggunakan larutan standar HCl 0,2 M sebanyak 25 mL.\n\nAlur:\n- Keselamatan lab: pakai APD\n- Storage: ambil HCl 0,2 M, larutan NaOH unknown, indikator fenolftalein, buret, erlenmeyer\n- Titrasi: isi buret dengan HCl, masukkan NaOH ke erlenmeyer, titrasi sampai warna berubah, catat volume HCl\n- Analysis: hitung konsentrasi NaOH dengan M1V1 = M2V2\n- Disposal: cek pH sisa larutan, buang ke kontainer yang sesuai`;

    const objTextObj = this.add.text(objX, objY - 10, objectiveText, {
      fontFamily: 'Roboto',
      fontSize: '9px',
      color: '#',
      fontStyle: 'normal', // Tambahkan baris ini untuk membuat teks bold
      wordWrap: { width: 400, useAdvancedWrap: true },
      lineSpacing: 4,
    });

    objTextObj.setOrigin(0.5);
    objTextObj.setScrollFactor(0);

    const scaleY = height / bg.height;
    bg.setScale(scaleY);

    // Tambahkan Icon Modul Lab di pojok kanan atas
    const modulLabIcon = this.add.image(width - 80, 70, 'modul_lab');
    modulLabIcon.setScale(0.8);
    modulLabIcon.setScrollFactor(0);
    modulLabIcon.setDepth(300);

    // Instansiasi player menggunakan class baru
    this.player = new Player(this, 222, 320);

    const obstacles = this.physics.add.staticGroup();

    // Obstacles
    const centerTable = this.add.zone(690, 555, 590, 290);
    this.physics.add.existing(centerTable, true);
    obstacles.add(centerTable);

    const sink = this.add.zone(1374, 778, 185, 295);
    this.physics.add.existing(sink, true);
    obstacles.add(sink);

    const wallTop = this.add.zone(697, 120, 1340, 270);
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

    // -------------------

    if (this.input.keyboard) {
      this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      this.questKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
      this.inventoryKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    }

    this.events.on('pause', () => {
      this.interactPromptText = null;
      this.currentPromptText = null;
      if (this.dynamicInteractPrompt) this.dynamicInteractPrompt.setVisible(false);
      window.dispatchEvent(new CustomEvent('interact-prompt', { detail: null }));
    });

    this.events.on('sleep', () => {
      this.interactPromptText = null;
      this.currentPromptText = null;
      if (this.dynamicInteractPrompt) this.dynamicInteractPrompt.setVisible(false);
      window.dispatchEvent(new CustomEvent('interact-prompt', { detail: null }));
    });

    this.events.on('shutdown', () => {
      this.interactPromptText = null;
      this.currentPromptText = null;
      if (this.dynamicInteractPrompt) this.dynamicInteractPrompt.setVisible(false);
      window.dispatchEvent(new CustomEvent('interact-prompt', { detail: null }));
    });

    const workspaceData = [
      { id: 'buret_station', name: 'Meja Titrasi', x: 700, y: 575, w: 650, h: 260 },
      { id: 'storage', name: 'Lemari', x: 110, y: 800, w: 150, h: 150 },
      { id: 'meja_analisis', name: 'Meja Analisis', x: 700, y: 980, w: 500, h: 150 },
      { id: 'apd', name: 'Alat Pelindung Diri', x: 420, y: 200, w: 250, h: 200 },
      { id: 'wastafel', name: 'Wastafel', x: 1374, y: 778, w: 220, h: 320 },
      { id: 'bins', name: 'Tong Sampah', x: 1413, y: 388, w: 180, h: 300 },
      { id: 'exit', name: 'Keluar', x: 120, y: 200, w: 180, h: 200 },
      { id: 'quest', name: 'Quest', x: 950, y: 200, w: 350, h: 200 },
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

    if (Phaser.Input.Keyboard.JustDown(this.questKey)) {
      this.handleOpenGlobalOverlay('quest');
      return;
    }
    if (Phaser.Input.Keyboard.JustDown(this.inventoryKey)) {
      this.handleOpenGlobalOverlay('inventory');
      return;
    }

    let isOverlapping = false;
    let overlappingId = null;
    let overlappingName = null;
    let overlappingWs = null;

    for (const ws of this.workspaces) {
      if (this.physics.overlap(this.player, ws.zone)) {
        isOverlapping = true;
        overlappingId = ws.data.id;
        overlappingName = ws.data.name;
        overlappingWs = ws;
        break;
      }
    }

    if (isOverlapping && overlappingWs) {
      this.activeWorkspaceId = overlappingId;
      if (overlappingId === 'exit') {
        this.interactPromptText = 'Tekan E untuk keluar';
      } else if (overlappingId == 'quest') {
        this.interactPromptText = 'Tekan E untuk melihat quest';
      } else {
        this.interactPromptText = `Tekan E untuk pakai\n${overlappingName}`;
      }

      this.dynamicInteractPrompt.setText(this.interactPromptText);
      this.dynamicInteractPrompt.setPosition(
        overlappingWs.data.x,
        overlappingWs.data.y - overlappingWs.data.h / 2 - 25
      );
      this.dynamicInteractPrompt.setVisible(true);

      if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
        this.handleTransitionWorkspace(this.activeWorkspaceId!);
      }
    } else {
      this.activeWorkspaceId = null;
      this.interactPromptText = null;
      if (this.dynamicInteractPrompt) {
        this.dynamicInteractPrompt.setVisible(false);
      }
    }

    if (this.currentPromptText !== this.interactPromptText) {
      this.currentPromptText = this.interactPromptText;
      window.dispatchEvent(new CustomEvent('interact-prompt', { detail: null }));
    }
  }

  private handleTransitionWorkspace(workspaceId: string): void {
    console.log(`Transisi ke WORKSPACE ${workspaceId}`);

    switch (workspaceId) {
      case 'buret_station':
        this.scene.pause();
        this.scene.launch('TitrationScene');
        break;
      case 'meja_analisis':
        this.scene.pause();
        this.scene.launch('AnalyzeTableScene');
        break;
      case 'bins':
        this.scene.pause();
        this.scene.launch('DisposalScene');
        break;
      case 'storage':
        this.scene.pause();
        this.scene.launch('StorageScene');
        break;
      case 'apd':
        this.scene.pause();
        this.scene.launch('APDScene');
        break;
      case 'wastafel':
        this.scene.pause();
        this.scene.launch('WastafelScene');
        break;
      case 'exit':
        window.location.href = '/menu';
        break;
      case 'quest':
        this.scene.pause();
        this.scene.launch('QuestScene');
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
      case 'quest':
        this.scene.launch('QuestScene');
        break;
      case 'inventory':
        this.scene.launch('InventoryScene');
        break;
      default:
        this.scene.resume('MainScene');
        break;
    }
  }
}
