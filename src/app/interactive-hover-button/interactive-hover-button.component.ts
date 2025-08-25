import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-interactive-hover-button',
  templateUrl: './interactive-hover-button.component.html',
  styleUrls: ['./interactive-hover-button.component.css']
})
export class InteractiveHoverButtonComponent {
  /** Button text */
  @Input() label = 'Button';

  /** Optional: set CSS vars from outside if you want to theme it */
  @HostBinding('style.--ihb-primary') @Input() primary = '#00FFE0';        // dot color
  @HostBinding('style.--ihb-onPrimary') @Input() onPrimary = '#AC99E8';     // hover text color
  @HostBinding('style.--ihb-bg') 
  @Input() bg: string = 'linear-gradient(90deg, rgba(137, 74, 255, 1) 0%, rgba(78, 44, 212, 1) 100%)'; // button bg
  @HostBinding('style.--ihb-fg') @Input() fg = '#AC99E8';                   // button text color
  @HostBinding('style.--ihb-border') @Input() border = '#d0d5dd';           // border color
}
