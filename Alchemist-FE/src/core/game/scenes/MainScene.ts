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
    // Map
    this.load.image('lab_background', '/images/Maps.webp');

    // Character
    this.load.image('player_front', '/player/apd/apd_front.webp');
    this.load.image('player_back', '/player/apd/apd_back.webp');
    this.load.image('player_right', '/player/apd/apd_right.webp');
    this.load.image('player_left', '/player/apd/apd_left.webp');
  }

  create(): void {
    const width = this.scale.width;
    const height = this.scale.height;

    const bg = this.add.image(width / 2, height / 2, 'lab_background');

    const scaleY = height / bg.height;
    bg.setScale(scaleY);

    this.player = this.physics.add.sprite(222, 320, 'player_front');
    this.player.setDisplaySize(250, 300);
    this.player.body.setSize(250, 350);
    this.player.body.setOffset(250, 330);
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

    // const chair = this.add.zone(911, 784, 120, 120);
    // this.physics.add.existing(chair, true);
    // obstacles.add(chair);

    this.physics.add.collider(this.player, obstacles);
    // Buat visual kotak yang terlihat jelas (berwarna hijau transparan)
    // const testBox = this.add.rectangle(747, 587, 100, 100, 0x00ff00, 0.4);

    // Aktifkan sistem physics statis
    // this.physics.add.existing(testBox, true);

    // Buat kotak bisa digeser dengan mouse
    // testBox.setInteractive({ draggable: true });

    // this.input.on(
    //   'drag',
    //   (
    //     pointer: Phaser.Input.Pointer,
    //     gameObject: Phaser.GameObjects.GameObject,
    //     dragX: number,
    //     dragY: number
    //   ) => {
    //     if (gameObject instanceof Phaser.GameObjects.Rectangle) {
    //       gameObject.x = dragX;
    //       gameObject.y = dragY;

    //       // Perbarui posisi physics body agar pembatas ikut bergeser saat digeret
    //       if (gameObject.body) {
    //         (gameObject.body as Phaser.Physics.Arcade.StaticBody).updateFromGameObject();
    //       }

    //       // Cetak posisi final di konsol untuk disalin ke kode asli
    //       console.log(`Posisi Baru Kotak -> X: ${Math.round(dragX)}, Y: ${Math.round(dragY)}`);
    //     }
    //   }
    // );

    // Masukkan ke grup obstacles Anda agar bisa ditabrak player saat uji coba pas atau tidaknya
    // obstacles.add(testBox);
  }

  update(): void {
    if (!this.player || !this.cursors) return;

    const speed = 250;
    this.player.setVelocity(0);

    if (this.cursors.left?.isDown || this.wasdKeys.A.isDown) {
      // Bergerak Kiri
      this.player.setVelocityX(-speed);
      this.player.setTexture('player_left');
    } else if (this.cursors.right?.isDown || this.wasdKeys.D.isDown) {
      // Bergerak Kanan
      this.player.setVelocityX(speed);
      this.player.setTexture('player_right');
    } else if (this.cursors.up?.isDown || this.wasdKeys.W.isDown) {
      // Bergerak Atas
      this.player.setVelocityY(-speed);
      this.player.setTexture('player_back');
    } else if (this.cursors.down?.isDown || this.wasdKeys.S.isDown) {
      // Bergerak Bawah
      this.player.setVelocityY(speed);
      this.player.setTexture('player_front');
    }
  }
}
