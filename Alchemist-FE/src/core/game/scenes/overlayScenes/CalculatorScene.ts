import Phaser from 'phaser';

export default class CalculatorScene extends Phaser.Scene {
  private display!: Phaser.GameObjects.Text;
  private currentExpression: string = '';
  private escKeyHandler!: (event: KeyboardEvent) => void;

  constructor() {
    super('CalculatorScene');
  }

  create(): void {
    const width = this.scale.width;
    const height = this.scale.height;

    const backdrop = this.add.rectangle(0, 0, width, height, 0x000000, 0.6);
    backdrop.setOrigin(0, 0);

    const calcWidth = 400;
    const calcHeight = 550;
    const cx = width / 2;
    const cy = height / 2;

    // Calculator Body
    const body = this.add.rectangle(cx, cy, calcWidth, calcHeight, 0x222222);
    body.setStrokeStyle(4, 0x555555);

    this.add.text(cx, cy - 250, 'SCIENTIFIC CALCULATOR', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Calculator Display
    this.add.rectangle(cx, cy - 180, calcWidth - 40, 80, 0x9eaba0);
    this.display = this.add.text(cx + calcWidth / 2 - 30, cy - 180, '0', {
      fontFamily: 'Courier New',
      fontSize: '32px',
      color: '#000000',
      fontStyle: 'bold'
    }).setOrigin(1, 0.5);

    // Buttons Layout
    const btnLayout = [
      ['sin', 'cos', 'tan', 'sqrt', '^'],
      ['(', ')', 'C', 'AC', 'DEL'],
      ['7', '8', '9', '/', '*'],
      ['4', '5', '6', '-', '+'],
      ['1', '2', '3', 'exp', '='],
      ['0', '.', '00', 'ANS', '='] 
    ];

    const startX = cx - calcWidth / 2 + 50;
    const startY = cy - 80;
    const btnW = 50;
    const btnH = 45;
    const gapX = 12;
    const gapY = 15;

    btnLayout.forEach((row, i) => {
      row.forEach((label, j) => {
        if (label === '=') {
           if (i === 4 && j === 4) {
             // Big = button spanning two rows
             this.createButton(startX + j * (btnW + gapX), startY + i * (btnH + gapY) + (btnH + gapY) / 2 - gapY / 2, btnW, btnH * 2 + gapY, label, 0x4caf50);
           }
           return;
        }

        let color = 0x555555;
        if (['C', 'AC', 'DEL'].includes(label)) color = 0xf44336;
        else if (['/', '*', '-', '+', '^', 'sqrt'].includes(label)) color = 0xff9800;
        else if (['sin', 'cos', 'tan', 'exp', '(', ')', 'ANS'].includes(label)) color = 0x607d8b;

        this.createButton(startX + j * (btnW + gapX), startY + i * (btnH + gapY), btnW, btnH, label, color);
      });
    });

    const closeBtn = this.add.text(cx, cy + calcHeight / 2 + 30, '[ Tutup Kalkulator ]', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#ff0000',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    closeBtn.on('pointerdown', () => this.closeMenu());

    this.escKeyHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.closeMenu();
      }
    };
    window.addEventListener('keydown', this.escKeyHandler);
  }

  private createButton(x: number, y: number, w: number, h: number, label: string, color: number) {
    const btn = this.add.rectangle(x, y, w, h, color);
    btn.setStrokeStyle(2, 0x000000);
    btn.setInteractive({ useHandCursor: true });

    const txt = this.add.text(x, y, label, {
      fontFamily: 'Arial',
      fontSize: label.length > 2 ? '14px' : '18px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    btn.on('pointerover', () => btn.setAlpha(0.8));
    btn.on('pointerout', () => btn.setAlpha(1));
    btn.on('pointerdown', () => {
      btn.setFillStyle(0xffffff);
      this.time.delayedCall(100, () => btn.setFillStyle(color));
      this.handleInput(label);
    });
  }

  private handleInput(label: string) {
    if (label === 'AC') {
      this.currentExpression = '';
    } else if (label === 'C' || label === 'DEL') {
      this.currentExpression = this.currentExpression.slice(0, -1);
    } else if (label === '=') {
      try {
        const expr = this.currentExpression
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/tan\(/g, 'Math.tan(')
          .replace(/sqrt\(/g, 'Math.sqrt(')
          .replace(/exp\(/g, 'Math.exp(')
          .replace(/\^/g, '**')
          .replace(/ANS/g, '0');
        
        // Ensure trigonometric functions have brackets added implicitly if user forgets, though eval is strict
        // To be safe, we just let eval throw if it's invalid
        
         
        const result = eval(expr);
        this.currentExpression = String(Number(result.toFixed(6)));
      } catch (e) {
        this.currentExpression = 'Error';
      }
    } else {
      if (this.currentExpression === 'Error') this.currentExpression = '';
      
      // Auto-add bracket for functions
      if (['sin', 'cos', 'tan', 'sqrt', 'exp'].includes(label)) {
        this.currentExpression += label + '(';
      } else {
        this.currentExpression += label;
      }
    }

    this.display.setText(this.currentExpression || '0');
  }

  private closeMenu(): void {
    window.removeEventListener('keydown', this.escKeyHandler);
    this.scene.resume('AnalyzeTableScene');
    this.scene.stop();
  }
}
