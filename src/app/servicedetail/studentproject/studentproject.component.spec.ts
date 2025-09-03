import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentprojectComponent } from './studentproject.component';

describe('StudentprojectComponent', () => {
  let component: StudentprojectComponent;
  let fixture: ComponentFixture<StudentprojectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentprojectComponent]
    });
    fixture = TestBed.createComponent(StudentprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
