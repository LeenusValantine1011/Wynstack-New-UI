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
  @HostBinding('style.--ihb-primary') @Input() primary = '#f2ff00';        // dot color
  @HostBinding('style.--ihb-onPrimary') @Input() onPrimary = '#ff0004';     // hover text color
  @HostBinding('style.--ihb-bg') @Input() bg = '#ffffff';                   // button bg
  @HostBinding('style.--ihb-fg') @Input() fg = '#000000';                   // button text color
  @HostBinding('style.--ihb-border') @Input() border = '#d0d5dd';           // border color
}
