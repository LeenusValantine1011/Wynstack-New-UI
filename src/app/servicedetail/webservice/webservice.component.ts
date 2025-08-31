import { Component } from '@angular/core';

@Component({
  selector: 'app-webservice',
  templateUrl: './webservice.component.html',
  styleUrls: ['./webservice.component.css'],
})
export class WebserviceComponent {
goBack() {
throw new Error('Method not implemented.');
}
  selectedService: string | null = null;

  onClick(service: string) {
    this.selectedService = service;
    console.log(`${service} clicked!`);
  }
}


