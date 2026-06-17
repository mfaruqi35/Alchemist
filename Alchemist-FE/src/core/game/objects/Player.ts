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
  }

  update(): void {
    if (!this.cursors || !this.wasdKeys) return;

    this.setVelocity(0);

    if (this.cursors.left?.isDown || this.wasdKeys.A.isDown) {
      this.setVelocityX(-this.moveSpeed);
      this.setTexture('player_left');
    } else if (this.cursors.right?.isDown || this.wasdKeys.D.isDown) {
      this.setVelocityX(this.moveSpeed);
      this.setTexture('player_right');
    } else if (this.cursors.up?.isDown || this.wasdKeys.W.isDown) {
      this.setVelocityY(-this.moveSpeed);
      this.setTexture('player_front');
    } else if (this.cursors.down?.isDown || this.wasdKeys.S.isDown) {
      this.setVelocityY(this.moveSpeed);
      this.setTexture('player_back');
    }
  }
}
