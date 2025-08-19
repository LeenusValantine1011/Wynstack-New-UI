import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-herosection',
  templateUrl: './herosection.component.html',
  styleUrls: ['./herosection.component.css']
})
export class HerosectionComponent implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const btn = this.el.nativeElement.querySelector('.connect-btn');
    const span = btn.querySelector('span');

    btn.addEventListener('mouseenter', (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      (span as HTMLElement).style.left = `${relX}px`;
      (span as HTMLElement).style.top = `${relY}px`;
    });

    btn.addEventListener('mouseout', (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      (span as HTMLElement).style.left = `${relX}px`;
      (span as HTMLElement).style.top = `${relY}px`;
    });
  }
}
