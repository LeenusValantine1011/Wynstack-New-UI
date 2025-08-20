import { Component, OnInit, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-custom-cursor',
  templateUrl: './custom-cursor.component.html',
  styleUrls: ['./custom-cursor.component.css']
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  private cursor!: HTMLElement;
  private lastX = 0;
  private lastY = 0;
  private currentX = 0;
  private currentY = 0;
  private mouseX = 0;
  private mouseY = 0;
  private velocity = 0;
  private theta = 0;
  private ease = 0.15;
  private threshold = 20;

  ngOnInit() {
    this.cursor = document.getElementById('custom-cursor') as HTMLElement;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseleave', this.onMouseLeave);

    gsap.ticker.add(this.animate);
  }

  ngOnDestroy() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseleave', this.onMouseLeave);

    gsap.ticker.remove(this.animate);
  }

  private clamp(num: number, min: number, max: number) {
    return Math.min(Math.max(num, min), max);
  }

  private onMouseMove = (e: MouseEvent) => {
    // Viewport coordinates
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    this.cursor.style.opacity = '0.25';
  };

  private onMouseLeave = () => {
    this.cursor.style.opacity = '0';
  };

  private animate = () => {
    this.lastX = this.currentX;
    this.lastY = this.currentY;

    // Smoothly follow the mouse
    this.currentX += (this.mouseX - this.currentX) * this.ease;
    this.currentY += (this.mouseY - this.currentY) * this.ease;

    const deltaX = this.currentX - this.lastX;
    const deltaY = this.currentY - this.lastY;
    this.theta = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    const vX = this.clamp(Math.abs(deltaX) / this.threshold, 0, 1);
    const vY = this.clamp(Math.abs(deltaY) / this.threshold, 0, 1);
    this.velocity = (vX + vY) * 0.5;

    // Transform using only viewport coordinates
    this.cursor.style.transform = `
      translate3d(${this.currentX}px, ${this.currentY}px, 0)
      rotate(${this.theta.toFixed()}deg)
      scaleX(${1 + this.velocity})
    `;
  };
}
