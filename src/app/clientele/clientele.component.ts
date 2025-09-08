import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-clientele',
  templateUrl: './clientele.component.html',
  styleUrls: ['./clientele.component.css']
})
export class ClienteleComponent implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const elements = this.el.nativeElement.querySelectorAll('.animate-on-scroll');
    const onScroll = () => {
      elements.forEach((elem: HTMLElement) => {
        const rect = elem.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.9) { // 90% viewport height trigger
          this.renderer.addClass(elem, 'visible');
        }
      });
    };

    window.addEventListener('scroll', onScroll);
    // Trigger once immediately in case elements already in view
    onScroll();
  }
}
