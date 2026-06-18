import Phaser from 'phaser';

export default class TitrationScene extends Phaser.Scene {
  private qteBg!: Phaser.GameObjects.Image;
  private qteTarget!: Phaser.GameObjects.Image;
  private qteIndicator!: Phaser.GameObjects.Image;

  private isTitrasiActive: boolean = false;
  private volumeBuret: number = 50.0;
  private volumeTetesan: number = 0.0;
  private targetVolume: number = 25.0;
  private lajuIndikatorQTE: number = 4;
  private arahIndikatorQTE: number = 1;

  private volumeText!: Phaser.GameObjects.Text;
  private statusText!: Phaser.GameObjects.Text;

  private cairanBuret!: Phaser.GameObjects.Rectangle;

  private qteKey!: Phaser.Input.Keyboard.Key;

  private cairanErlenmeyer!: Phaser.GameObjects.Graphics;
  private erlenmeyerX: number = 0;
  private erlenmeyerY: number = 0;
  private skalaErlenmeyerGlobal: number = 0.3;

  constructor() {
    super('TitrationScene');
  }

  preload(): void {
    this.load.image('scene_background', 'images/titrationWorkspace.webp');
    this.load.image('statif', '/images/statif.webp');
    this.load.image('erlenmeyer3', '/images/erlenmeyer3.webp');
    this.load.image('buret', '/images/buret.webp');
    this.load.image('qte_bg', '/images/qte_bar.webp');
    this.load.image('qte_target', '/images/qte_target.webp');
    this.load.image('qte_indicator', '/images/qte_indicator.webp');
  }

  create(): void {
    const width = this.scale.width;
    const height = this.scale.height;

    const centerX = width / 2;
    const centerY = height / 2;

    const qteX = centerX + 350;
    const qteY = centerY;
    this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0, 0);
    this.add.image(centerX, centerY, 'scene_background');

    const skalaAlat = 0.6;
    this.skalaErlenmeyerGlobal = 0.3;

    // Inisialisasi UI QTE
    this.qteBg = this.add.image(qteX, qteY, 'qte_bg').setScale(skalaAlat);
    this.qteTarget = this.add.image(qteX, qteY + 60, 'qte_target').setScale(skalaAlat);
    this.qteIndicator = this.add.image(qteX, qteY - 150, 'qte_indicator').setScale(skalaAlat);

    this.setQTEVisibility(false);

    this.volumeText = this.add.text(
      50,
      150,
      `Volume Netralisasi: 0.0 mL / ${this.targetVolume} mL`,
      {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#ffff00',
      }
    );

    this.statusText = this.add.text(
      50,
      190,
      'Status: Keran Tertutup. Klik Stopcock untuk membuka.',
      {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#ffffff',
      }
    );

    if (this.input.keyboard) {
      this.qteKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    const statif = this.add.image(centerX - 10, centerY - 100, 'statif');
    statif.setScale(skalaAlat);

    // Set koordinat dasar Erlenmeyer untuk masking cairan
    this.erlenmeyerX = centerX + 30;
    this.erlenmeyerY = centerY + 180;

    // Cairan Erlenmeyer digambar di belakang glass asset
    this.cairanErlenmeyer = this.add.graphics();
    this.updateCairanErlenmeyer(
      this.erlenmeyerX,
      this.erlenmeyerY + 65,
      this.skalaErlenmeyerGlobal
    );

    const buret = this.add.image(centerX + 30, centerY - 250, 'buret');
    buret.setScale(skalaAlat);

    const erlenmeyer = this.add.image(this.erlenmeyerX, this.erlenmeyerY, 'erlenmeyer3');
    erlenmeyer.setScale(this.skalaErlenmeyerGlobal);

    // Sensor Utama Stopcock Keran Buret
    const keranX = centerX + 70;
    const keranY = centerY + 30;
    const radiusSensor = 15;

    const petunjukKeran = this.add.graphics();
    petunjukKeran.fillStyle(0xffff00, 0.7);
    petunjukKeran.fillCircle(keranX, keranY, radiusSensor);
    petunjukKeran.lineStyle(2, 0xffff00, 0.8);
    petunjukKeran.strokeCircle(keranX, keranY, radiusSensor);

    this.tweens.add({
      targets: petunjukKeran,
      alpha: 0.2,
      duration: 800,
      yoyo: true,
      loop: -1,
    });
    const keranSensor = this.add.zone(keranX, keranY, radiusSensor * 2, radiusSensor * 2);
    keranSensor.setInteractive({ useHandCursor: true });

    keranSensor.on('pointerdown', () => {
      this.isTitrasiActive = !this.isTitrasiActive;

      if (this.isTitrasiActive) {
        this.statusText.setText('Status: Keran Terbuka! Tekan SPASI tepat di zona hijau!');
        this.statusText.setColor('#00ff00');
        this.setQTEVisibility(true);
      } else {
        this.statusText.setText('Status: Keran Ditutup. Klik kembali untuk melanjutkan.');
        this.statusText.setColor('#ffffff');
        this.setQTEVisibility(false);
      }
    });

    const batasAtasBuretY = 87;
    const posisiKeranY = centerY - 55;
    const tinggiMaksCairan = posisiKeranY - batasAtasBuretY;

    this.cairanBuret = this.add.rectangle(
      centerX + 32,
      batasAtasBuretY,
      24 * skalaAlat,
      tinggiMaksCairan,
      0xadd8e6,
      0.8
    );
    this.cairanBuret.setOrigin(0.5, 0);

    this.add.text(50, 50, 'SIMULASI TITRASI ASAM-BASA', {
      fontFamily: 'Arial',
      fontSize: '28px',
      color: '#ffffff',
    });

    this.add.text(50, 100, 'Tekan ESC untuk kembali ke Laboratorium Utama', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#aaaaaa',
    });

    this.setupEscKey();
  }

  update(): void {
    if (!this.isTitrasiActive) return;

    const batasAtasBar = this.qteBg.y - this.qteBg.displayHeight / 2 + 10;
    const batasBawahBar = this.qteBg.y + this.qteBg.displayHeight / 2 - 10;

    this.qteIndicator.y += this.lajuIndikatorQTE * this.arahIndikatorQTE;

    if (this.qteIndicator.y >= batasBawahBar) {
      this.arahIndikatorQTE = -1;
    } else if (this.qteIndicator.y <= batasAtasBar) {
      this.arahIndikatorQTE = 1;
    }

    if (Phaser.Input.Keyboard.JustDown(this.qteKey)) {
      this.prosesTetesanTitrasi();
    }
  }

  private setQTEVisibility(visible: boolean): void {
    this.qteBg.setVisible(visible);
    this.qteTarget.setVisible(visible);
    this.qteIndicator.setVisible(visible);
  }

  private updateCairanErlenmeyer(x: number, y: number, skala: number): void {
    this.cairanErlenmeyer.clear();

    let warnaCairan = 0xffffff;
    let alphaCairan = 0.5;

    if (this.volumeTetesan >= 24.8 && this.volumeTetesan <= 25.2) {
      warnaCairan = 0xffb6c1;
      alphaCairan = 0.7;
    } else if (this.volumeTetesan > 25.2) {
      warnaCairan = 0xff00ff;
      alphaCairan = 0.9;
    }

    this.cairanErlenmeyer.fillStyle(warnaCairan, alphaCairan);

    const dasarLebar = 390 * skala;
    const atasLebar = 110 * skala;
    const tinggiDasarAwal = 70 * skala;

    const tambahanTinggiPiksel = this.volumeTetesan * 4 * skala;
    const tinggiCairanMaksimal = tinggiDasarAwal + tambahanTinggiPiksel;

    const offsetSudut = 20 * skala;
    const bottomY = y + 70 * skala;
    const topY = bottomY - tinggiCairanMaksimal;

    const kiriBawahX = x - dasarLebar / 2;
    const kananBawahX = x + dasarLebar / 2;
    const kananAtasX = x + atasLebar / 2;
    const kiriAtasX = x - atasLebar / 2;

    this.cairanErlenmeyer.beginPath();
    this.cairanErlenmeyer.moveTo(kiriAtasX, topY);
    this.cairanErlenmeyer.lineTo(kananAtasX, topY);
    this.cairanErlenmeyer.lineTo(kananBawahX - offsetSudut, bottomY - offsetSudut);
    this.cairanErlenmeyer.lineTo(kananBawahX - offsetSudut * 2, bottomY);
    this.cairanErlenmeyer.lineTo(kiriBawahX + offsetSudut * 2, bottomY);
    this.cairanErlenmeyer.lineTo(kiriBawahX + offsetSudut, bottomY - offsetSudut);
    this.cairanErlenmeyer.closePath();
    this.cairanErlenmeyer.fillPath();
  }

  private setupEscKey(): void {
    const escHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        window.removeEventListener('keydown', escHandler);
        this.scene.resume('MainScene');
        this.scene.stop();
      }
    };
    window.addEventListener('keydown', escHandler);
  }

  private prosesTetesanTitrasi(): void {
    if (this.cairanBuret.height <= 0) {
      this.cairanBuret.height = 0;
      this.isTitrasiActive = false;
      this.setQTEVisibility(false);

      this.flashStatusText('#ff0000', 'PERINGATAN: Cairan di dalam buret sudah habis!');
      return;
    }

    const jarakHit = Math.abs(this.qteIndicator.y - this.qteTarget.y);
    const toleransiHit = this.qteTarget.displayHeight / 2;

    let volumeDitambahkan = 0;

    if (jarakHit <= toleransiHit) {
      if (this.volumeTetesan >= 22.0) {
        volumeDitambahkan = 0.2;
      } else {
        volumeDitambahkan = 1.0;
      }
      this.flashStatusText('#00ff00', 'HIT SUKSES!');
    } else {
      volumeDitambahkan = 2.5;
      this.flashStatusText('#ff0000', 'MISS! Cairan Tumpah Terlalu Banyak!');
    }

    const pikselPerMiliBuret = 4;
    const penguranganTinggi = volumeDitambahkan * pikselPerMiliBuret;

    if (this.cairanBuret.height - penguranganTinggi <= 0) {
      const sisaTinggi = this.cairanBuret.height;
      const sisaVolumeBuret = sisaTinggi / pikselPerMiliBuret;

      this.volumeTetesan += sisaVolumeBuret;
      this.volumeBuret = 0;

      this.cairanBuret.y += sisaTinggi;
      this.cairanBuret.height = 0;
      this.isTitrasiActive = false;
      this.setQTEVisibility(false);
      this.flashStatusText('#ff0000', 'PERINGATAN: Cairan di dalam buret telah habis!');
    } else {
      this.volumeTetesan += volumeDitambahkan;
      this.volumeBuret -= volumeDitambahkan;

      this.cairanBuret.y += penguranganTinggi;
      this.cairanBuret.height -= penguranganTinggi;
    }

    this.volumeText.setText(
      `Volume Netralisasi: ${this.volumeTetesan.toFixed(1)} mL / ${this.targetVolume} mL`
    );

    this.periksaPerwarnaKimiaAtauHabis();
  }

  private periksaPerwarnaKimiaAtauHabis(): void {
    this.updateCairanErlenmeyer(
      this.erlenmeyerX,
      this.erlenmeyerY + 65,
      this.skalaErlenmeyerGlobal
    );

    if (this.cairanBuret.height <= 0) {
      this.statusText.setText(
        'STATUS: Cairan buret habis. Silakan tekan ESC untuk mengulang eksperimen.'
      );
      this.statusText.setColor('#ff0000');
      return;
    }

    if (this.volumeTetesan >= 24.8 && this.volumeTetesan <= 25.2) {
      this.statusText.setText('STATUS: TITIK AKHIR TERCAPAI! Segera tutup keran buret!');
      this.statusText.setColor('#00ff00');
    } else if (this.volumeTetesan > 25.2) {
      this.statusText.setText('STATUS: OVER-TITRATION! Larutan terlalu basa (Gagal).');
      this.statusText.setColor('#ff00ff');
    }
  }

  private flashStatusText(warnaHex: string, pesan: string): void {
    this.statusText.setColor(warnaHex);
    this.statusText.setText(`Status: ${pesan}`);
  }
}
