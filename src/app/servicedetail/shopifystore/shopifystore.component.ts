import { Component } from '@angular/core';

@Component({
  selector: 'app-shopifystore',
  templateUrl: './shopifystore.component.html',
  styleUrls: ['./shopifystore.component.css']
})
export class ShopifystoreComponent {
  selectedService: string = 'Shopify Store Setup';

  onClick(service: string) {
    this.selectedService = service;
  }
}

