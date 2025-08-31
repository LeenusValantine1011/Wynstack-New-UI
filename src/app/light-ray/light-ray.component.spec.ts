import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightRayComponent } from './light-ray.component';

describe('LightRayComponent', () => {
  let component: LightRayComponent;
  let fixture: ComponentFixture<LightRayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LightRayComponent]
    });
    fixture = TestBed.createComponent(LightRayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
