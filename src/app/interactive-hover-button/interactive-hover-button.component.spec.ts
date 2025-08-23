import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveHoverButtonComponent } from './interactive-hover-button.component';

describe('InteractiveHoverButtonComponent', () => {
  let component: InteractiveHoverButtonComponent;
  let fixture: ComponentFixture<InteractiveHoverButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InteractiveHoverButtonComponent]
    });
    fixture = TestBed.createComponent(InteractiveHoverButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
