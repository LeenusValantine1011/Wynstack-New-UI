import { Component } from '@angular/core';

@Component({
  selector: 'app-webservice',
  templateUrl: './webservice.component.html',
  styleUrls: ['./webservice.component.css'],
})
export class WebserviceComponent {
  selectedService: string = 'Website Development'; // default value

  onClick(service: string) {
    this.selectedService = service;  // update when user clicks
  }
}


