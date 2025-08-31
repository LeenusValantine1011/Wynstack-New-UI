import { Component } from '@angular/core';

@Component({
  selector: 'app-digitalmarketingservice',
  templateUrl: './digitalmarketingservice.component.html',
  styleUrls: ['./digitalmarketingservice.component.css']
})
export class DigitalmarketingserviceComponent {
  selectedService: string = 'Digital Marketing'; // default value

  onClick(service: string) {
    this.selectedService = service;  // update when user clicks
  }
}


