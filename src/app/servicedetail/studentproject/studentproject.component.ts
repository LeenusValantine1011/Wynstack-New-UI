import { Component } from '@angular/core';

@Component({
  selector: 'app-studentproject',
  templateUrl: './studentproject.component.html',
  styleUrls: ['./studentproject.component.css']
})
export class StudentprojectComponent {
  selectedService: string = 'Student Project Development';

  onClick(service: string) {
    this.selectedService = service;
  }
}
