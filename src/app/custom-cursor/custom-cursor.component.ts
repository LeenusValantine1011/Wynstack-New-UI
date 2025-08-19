import { Component, OnInit, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-custom-cursor',
  templateUrl: './custom-cursor.component.html',
  styleUrls: ['./custom-cursor.component.css']
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  private cursor!: HTMLElement;
  private active = false;
  private lastX = 0;
  private lastY = 0;
  private currentX = 0;
  private currentY = 0;
  private pageX = 0;
  private pageY = 0;
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
    this.pageX = e.pageX;
    this.pageY = e.pageY;
    this.active = true;
    this.cursor.style.opacity = '0.25';
  };

  private onMouseLeave = () => {
    this.active = false;
    this.velocity = 0;
    this.cursor.style.opacity = '0';
  };

  private animate = () => {
    this.lastX = this.currentX;
    this.lastY = this.currentY;

    this.currentX += (this.pageX - this.currentX) * this.ease;
    this.currentY += (this.pageY - this.currentY) * this.ease;

    const deltaX = this.currentX - this.lastX;
    const deltaY = this.currentY - this.lastY;
    this.theta = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    const vX = this.clamp(Math.abs(deltaX) / this.threshold, 0, 1);
    const vY = this.clamp(Math.abs(deltaY) / this.threshold, 0, 1);
    this.velocity = (vX + vY) * 0.5;

    this.cursor.style.transform = `
      translate3d(${this.currentX}px, ${this.currentY}px, 0)
      rotate(${this.theta.toFixed()}deg)
      scaleX(${1 + this.velocity})
    `;
  };
}
