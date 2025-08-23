import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(InertiaPlugin);

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  _inertiaApplied: boolean;
}

@Component({
  selector: 'app-dot-grid',
  templateUrl: './dot-grid.component.html',
  styleUrls: ['./dot-grid.component.css'],
})
export class DotGridComponent implements AfterViewInit, OnDestroy {
  @ViewChild('wrapper', { static: true }) wrapperRef!: ElementRef<HTMLDivElement>;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() dotSize = 16;
  @Input() gap = 32;
  @Input() baseColor = '#AAAAAA';
  @Input() activeColor = '#5227FF';
  @Input() proximity = 150;
  @Input() speedTrigger = 100;
  @Input() shockRadius = 250;
  @Input() shockStrength = 5;
  @Input() maxSpeed = 5000;
  @Input() resistance = 750;
  @Input() returnDuration = 1.5;

  private dots: Dot[] = [];
  private pointer = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  };
  private circlePath: Path2D | null = null;
  private rafId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;

  private cleanupFns: (() => void)[] = [];

  // Bound event handlers
  private throttledMove = this.throttle(this.onMove.bind(this), 50);
  private boundClick = this.onClick.bind(this);
  private boundResize = () => this.buildGrid();

  ngAfterViewInit() {
    this.circlePath = new Path2D();
    this.circlePath.arc(0, 0, this.dotSize / 2, 0, Math.PI * 2);

    this.buildGrid();
    this.startDrawLoop();

    // Resize handling
    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(() => this.buildGrid());
      this.resizeObserver.observe(this.wrapperRef.nativeElement);
    } else {
      this.wrapperRef?.nativeElement?.addEventListener('resize', this.boundResize);
      this.cleanupFns.push(() => window.removeEventListener('resize', this.boundResize));
    }

    // Mouse events
    window.addEventListener('mousemove', this.throttledMove, { passive: true });
    window.addEventListener('click', this.boundClick);
    this.cleanupFns.push(() => {
      window.removeEventListener('mousemove', this.throttledMove);
      window.removeEventListener('click', this.boundClick);
    });
  }

  ngOnDestroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.resizeObserver) this.resizeObserver.disconnect();
    this.cleanupFns.forEach(fn => fn());
  }

  private buildGrid = () => {
    const wrap = this.wrapperRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + this.gap) / (this.dotSize + this.gap));
    const rows = Math.floor((height + this.gap) / (this.dotSize + this.gap));
    const cell = this.dotSize + this.gap;

    const gridW = cell * cols - this.gap;
    const gridH = cell * rows - this.gap;
    const startX = (width - gridW) / 2 + this.dotSize / 2;
    const startY = (height - gridH) / 2 + this.dotSize / 2;

    this.dots = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        this.dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });
      }
    }
  };

  private startDrawLoop() {
    const proxSq = this.proximity * this.proximity;
    const ctx = this.canvasRef.nativeElement.getContext('2d');

    const baseRgb = this.hexToRgb(this.baseColor);
    const activeRgb = this.hexToRgb(this.activeColor);

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

      for (const dot of this.dots) {
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - this.pointer.x;
        const dy = dot.cy - this.pointer.y;
        const dsq = dx * dx + dy * dy;

        let style = this.baseColor;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / this.proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          style = `rgb(${r},${g},${b})`;
        }

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;
        if (this.circlePath) ctx.fill(this.circlePath);
        ctx.restore();
      }

      this.rafId = requestAnimationFrame(draw);
    };

    draw();
  }

  private onMove(e: MouseEvent) {
    const now = performance.now();
    const dt = this.pointer.lastTime ? now - this.pointer.lastTime : 16;
    const dx = e.clientX - this.pointer.lastX;
    const dy = e.clientY - this.pointer.lastY;
    let vx = (dx / dt) * 1000;
    let vy = (dy / dt) * 1000;
    let speed = Math.hypot(vx, vy);

    if (speed > this.maxSpeed) {
      const scale = this.maxSpeed / speed;
      vx *= scale;
      vy *= scale;
      speed = this.maxSpeed;
    }

    this.pointer.lastTime = now;
    this.pointer.lastX = e.clientX;
    this.pointer.lastY = e.clientY;
    this.pointer.vx = vx;
    this.pointer.vy = vy;
    this.pointer.speed = speed;

    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.pointer.x = e.clientX - rect.left;
    this.pointer.y = e.clientY - rect.top;

    for (const dot of this.dots) {
      const dist = Math.hypot(dot.cx - this.pointer.x, dot.cy - this.pointer.y);
      if (speed > this.speedTrigger && dist < this.proximity && !dot._inertiaApplied) {
        dot._inertiaApplied = true;
        gsap.killTweensOf(dot);
        const pushX = dot.cx - this.pointer.x + vx * 0.005;
        const pushY = dot.cy - this.pointer.y + vy * 0.005;
        gsap.to(dot, {
          inertia: { xOffset: pushX, yOffset: pushY, resistance: this.resistance },
          onComplete: () => {
            gsap.to(dot, {
              xOffset: 0,
              yOffset: 0,
              duration: this.returnDuration,
              ease: 'elastic.out(1,0.75)',
            });
            dot._inertiaApplied = false;
          },
        });
      }
    }
  }

  private onClick(e: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    for (const dot of this.dots) {
      const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
      if (dist < this.shockRadius && !dot._inertiaApplied) {
        dot._inertiaApplied = true;
        gsap.killTweensOf(dot);
        const falloff = Math.max(0, 1 - dist / this.shockRadius);
        const pushX = (dot.cx - cx) * this.shockStrength * falloff;
        const pushY = (dot.cy - cy) * this.shockStrength * falloff;
        gsap.to(dot, {
          inertia: { xOffset: pushX, yOffset: pushY, resistance: this.resistance },
          onComplete: () => {
            gsap.to(dot, {
              xOffset: 0,
              yOffset: 0,
              duration: this.returnDuration,
              ease: 'elastic.out(1,0.75)',
            });
            dot._inertiaApplied = false;
          },
        });
      }
    }
  }

  private hexToRgb(hex: string) {
    const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!m) return { r: 0, g: 0, b: 0 };
    return {
      r: parseInt(m[1], 16),
      g: parseInt(m[2], 16),
      b: parseInt(m[3], 16),
    };
  }

  private throttle(func: (...args: any[]) => void, limit: number) {
    let lastCall = 0;
    return (...args: any[]) => {
      const now = performance.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        func(...args);
      }
    };
  }
}
