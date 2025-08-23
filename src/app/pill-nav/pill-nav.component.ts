import { AfterViewInit, Component, ElementRef, Input, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { gsap } from 'gsap';

export interface PillNavItem {
  label: string;
  href: string;
}

@Component({
  selector: 'app-pill-nav',
  templateUrl: './pill-nav.component.html',
  styleUrls: ['./pill-nav.component.css']
})
export class PillNavComponent implements AfterViewInit {
  @Input() items: PillNavItem[] = [];
  @Input() activeHref: string = '#';

  isMobileMenuOpen = false;

  @ViewChildren('circleRefs') circleRefs!: QueryList<ElementRef<HTMLSpanElement>>;
  @ViewChild('mobileMenuRef') mobileMenuRef!: ElementRef<HTMLDivElement>;
  @ViewChild('navItemsRef') navItemsRef!: ElementRef<HTMLDivElement>;

  tlRefs: gsap.core.Timeline[] = [];
  activeTweenRefs: gsap.core.Tween[] = [];

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.layoutPills();
    window.addEventListener('resize', () => this.layoutPills());
  }

  layoutPills() {
    this.circleRefs.forEach((circleEl, i) => {
      const circle = circleEl.nativeElement;
      const pill = circle.parentElement as HTMLElement;
      if (!pill) return;

      const rect = pill.getBoundingClientRect();
      const { width: w, height: h } = rect;
      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

      const label = pill.querySelector<HTMLElement>('.pill-label');
      const white = pill.querySelector<HTMLElement>('.pill-label-hover');

      if (label) gsap.set(label, { y: 0 });
      if (white) gsap.set(white, { y: h + 12, opacity: 0 });

      this.tlRefs[i]?.kill();
      const tl = gsap.timeline({ paused: true });
      tl.to(circle, { scale: 1.2, xPercent: -50, duration: 0.5, ease: 'power3.out' });
      if (label) tl.to(label, { y: -(h + 8), duration: 0.5, ease: 'power3.out' }, 0);
      if (white) tl.to(white, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, 0);

      this.tlRefs[i] = tl;
    });
  }

  handleEnter(i: number) {
    const tl = this.tlRefs[i];
    if (!tl) return;
    this.activeTweenRefs[i]?.kill();
    this.activeTweenRefs[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease: 'power3.out' });
  }

  handleLeave(i: number) {
    const tl = this.tlRefs[i];
    if (!tl) return;
    this.activeTweenRefs[i]?.kill();
    this.activeTweenRefs[i] = tl.tweenTo(0, { duration: 0.2, ease: 'power3.out' });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    const menu = this.mobileMenuRef.nativeElement;

    if (this.isMobileMenuOpen) {
      gsap.set(menu, { visibility: 'visible' });
      gsap.fromTo(
        menu,
        { opacity: 0, y: 10, scaleY: 1 },
        { opacity: 1, y: 0, duration: 0.3 }
      );
    } else {
      gsap.to(menu, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        onComplete: () => {
          gsap.set(menu, { visibility: 'hidden' });
        }
      });
    }
  }
}
