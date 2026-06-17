import Phaser from 'phaser';

interface WASDKeys {
  W: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
}

export default class MainScene extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasdKeys!: WASDKeys;

  constructor() {
    super('MainScene');
  }

  preload(): void {
    const textures = this.textures;
    if (!textures.exists('player_placeholder')) {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 48;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(0, 0, 32, 48);
        textures.addCanvas('player_placeholder', canvas);
      }
    }
  }

  create(): void {
    this.player = this.physics.add.sprite(400, 300, 'player-placeholder');
    this.player.setCollideWorldBounds(true);

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();

      this.wasdKeys = this.input.keyboard.addKeys({
        W: Phaser.Input.Keyboard.KeyCodes.W,
        A: Phaser.Input.Keyboard.KeyCodes.A,
        S: Phaser.Input.Keyboard.KeyCodes.S,
        D: Phaser.Input.Keyboard.KeyCodes.D,
      }) as WASDKeys;
    }
  }

  update(): void {
    if (!this.player || !this.cursors) return;

    const speed = 200;

    this.player.setVelocity(0);

    if (this.cursors.left?.isDown || this.wasdKeys.A.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right?.isDown || this.wasdKeys.D.isDown) {
      this.player.setVelocityX(speed);
    }

    if (this.cursors.up?.isDown || this.wasdKeys.W.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down?.isDown || this.wasdKeys.S.isDown) {
      this.player.setVelocityY(speed);
    }

    if (this.player.body) {
      this.player.body.velocity.normalize().scale(speed);
    }
  }
}
