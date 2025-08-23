import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tilted-card',
  standalone: true,
  templateUrl: './tilted-card.component.html',
  styleUrls: ['./tilted-card.component.css']
})
export class TiltedCardComponent {
  @Input() imageUrl: string = '';
  @Input() label: string = '';

  @ViewChild('card', { static: true }) card!: ElementRef<HTMLDivElement>;

  // Apply tilt effect on mouse move
  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.card) return;
    const card = this.card.nativeElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 14; 
    const rotateY = ((x - centerX) / centerX) * 14; 

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  }

  // Reset when mouse leaves
  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.card) {
      this.card.nativeElement.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    }
  }
}
