import { Component } from '@angular/core';

@Component({
  selector: 'app-studentproject',
  templateUrl: './studentproject.component.html',
  styleUrls: ['./studentproject.component.css']
})
export class StudentprojectComponent {
  selectedService: string = '';

  onClick(service: string) {
    this.selectedService = service;
  }
}
