import { Component } from '@angular/core';

@Component({
  selector: 'app-contentcreation',
  templateUrl: './contentcreation.component.html',
  styleUrls: ['./contentcreation.component.css']
})
export class ContentcreationComponent {
  selectedService: string = 'Content Creation';  // default service

  onClick(service: string) {
    this.selectedService = service;  // update when user clicks
  }
}
