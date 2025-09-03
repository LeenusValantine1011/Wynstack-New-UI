import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.css']
})
export class BrandingComponent {
  selectedService: string = '';

  onClick(service: string) {
    this.selectedService = service;
  }
}

