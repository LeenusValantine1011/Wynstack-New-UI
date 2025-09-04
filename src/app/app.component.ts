import { Component, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  showNav = false;

  constructor(private router: Router, private renderer: Renderer2) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNav = event.urlAfterRedirects === '/contact';
      }
    });

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (event.urlAfterRedirects === '/contact') {
            this.renderer.addClass(document.body, 'contact-dark-bg');
          } else {
            this.renderer.removeClass(document.body, 'contact-dark-bg');
          }
        }
      });
  }
}
