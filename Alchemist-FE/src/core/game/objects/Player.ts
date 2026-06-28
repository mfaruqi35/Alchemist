import Phaser from 'phaser';

interface WASDKeys {
  W: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasdKeys!: WASDKeys;
  private moveSpeed: number = 250;
  private lastDirection: 'front' | 'back' | 'left' | 'right' = 'back';
  private lastTextureKey: string = '';

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player_back');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDisplaySize(270, 300);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(250, 350);
    body.setOffset(250, 330);
    this.setCollideWorldBounds(true);

    if (scene.input.keyboard) {
      this.cursors = scene.input.keyboard.createCursorKeys();
      this.wasdKeys = scene.input.keyboard.addKeys({
        W: Phaser.Input.Keyboard.KeyCodes.W,
        A: Phaser.Input.Keyboard.KeyCodes.A,
        S: Phaser.Input.Keyboard.KeyCodes.S,
        D: Phaser.Input.Keyboard.KeyCodes.D,
      }) as WASDKeys;
    }

    // Buat animasi berjalan ke belakang jika belum ada
    if (!scene.anims.exists('player_walk_back')) {
      scene.anims.create({
        key: 'player_walk_back',
        frames: scene.anims.generateFrameNumbers('player_walk_back_sheet', { start: 0, end: 3 }),
        frameRate: 4, // 250ms per frame (4 frames per second)
        repeat: -1,
      });
    }
  }

  private updateBodySize(): void {
    if (this.texture.key === this.lastTextureKey) return;
    this.lastTextureKey = this.texture.key;

    const body = this.body as Phaser.Physics.Arcade.Body;
    if (!body) return;

    if (this.texture.key === 'player_walk_back_sheet') {
      // Walk sheet frame size: 350 x 604
      const targetDisplayWidth = 169;
      const targetDisplayHeight = 302;
      const scaleX = targetDisplayWidth / 350;
      const scaleY = targetDisplayHeight / 604;

      // Target body display dimensions on screen
      const targetBodyWidth = 98.4;
      const targetBodyHeight = 148.1;

      // Unscaled dimensions
      const unscaledWidth = targetBodyWidth / scaleX; // 203.8
      const unscaledHeight = targetBodyHeight / scaleY; // 296.2

      // Center horizontally inside character (bbox center is 172.5)
      const unscaledOffsetX = 172.5 - unscaledWidth / 2; // 70.6

      // Align bottom with character's feet (bbox bottom is 559)
      const unscaledOffsetY = 559 - unscaledHeight; // 262.8

      body.setSize(unscaledWidth, unscaledHeight);
      body.setOffset(unscaledOffsetX, unscaledOffsetY);
    } else {
      // Idle sprites (e.g. apd_backward.webp is 686 x 709)
      // Menggunakan koordinat default yang pas untuk aset-aset idle
      body.setSize(250, 350);
      body.setOffset(250, 330);
    }
  }

  update(): void {
    if (!this.cursors || !this.wasdKeys) return;

    this.setVelocity(0);
    let moving = false;

    if (this.cursors.left?.isDown || this.wasdKeys.A.isDown) {
      this.setVelocityX(-this.moveSpeed);
      if (this.anims.isPlaying) this.anims.stop();
      this.setTexture('player_left');
      this.lastDirection = 'left';
      moving = true;
    } else if (this.cursors.right?.isDown || this.wasdKeys.D.isDown) {
      this.setVelocityX(this.moveSpeed);
      if (this.anims.isPlaying) this.anims.stop();
      this.setTexture('player_right');
      this.lastDirection = 'right';
      moving = true;
    } else if (this.cursors.up?.isDown || this.wasdKeys.W.isDown) {
      this.setVelocityY(-this.moveSpeed);
      if (this.anims.isPlaying) this.anims.stop();
      this.setTexture('player_front');
      this.lastDirection = 'front';
      moving = true;
    } else if (this.cursors.down?.isDown || this.wasdKeys.S.isDown) {
      this.setVelocityY(this.moveSpeed);
      this.anims.play('player_walk_back', true);
      this.lastDirection = 'back';
      moving = true;
    }

    if (!moving) {
      if (this.anims.isPlaying) this.anims.stop();
      if (this.lastDirection === 'back') {
        this.setTexture('player_back');
      } else if (this.lastDirection === 'front') {
        this.setTexture('player_front');
      } else if (this.lastDirection === 'left') {
        this.setTexture('player_left');
      } else if (this.lastDirection === 'right') {
        this.setTexture('player_right');
      }
    }

    // Set target display size sesuai texture aktif agar tidak melar/distorsi
    const targetWidth = this.texture.key === 'player_walk_back_sheet' ? 169 : 270;
    const targetHeight = this.texture.key === 'player_walk_back_sheet' ? 302 : 300;
    this.setDisplaySize(targetWidth, targetHeight);

    // Perbarui ukuran physics body agar cocok dengan texture aktif saat ini
    this.updateBodySize();
  }
}
