import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-decrypted-text',
  templateUrl: './decrypted-text.component.html',
  styleUrls: ['./decrypted-text.component.css']
})
export class DecryptedTextComponent implements OnInit {
  @Input() text: string = 'Welcome to Wynstack';
  @Input() speed: number = 50; // ms between updates
  @Input() delay: number = 500; // ms before start
  @Input() characterSet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  displayedText: string = '';
  private intervalId: any;

  ngOnInit() {
    setTimeout(() => this.startDecryption(), this.delay);
  }

  private startDecryption() {
    let progress = 0;
    const finalText = this.text.split('');
    const total = finalText.length;

    this.intervalId = setInterval(() => {
      if (progress >= total) {
        clearInterval(this.intervalId);
        this.displayedText = this.text;
        return;
      }

      // Randomized output
      this.displayedText = finalText
        .map((char, index) =>
          index < progress
            ? char
            : this.randomChar()
        )
        .join('');

      progress++;
    }, this.speed);
  }

  private randomChar(): string {
    const i = Math.floor(Math.random() * this.characterSet.length);
    return this.characterSet[i];
  }
}
