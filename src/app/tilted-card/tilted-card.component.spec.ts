import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiltedCardComponent } from './tilted-card.component';

describe('TiltedCardComponent', () => {
  let component: TiltedCardComponent;
  let fixture: ComponentFixture<TiltedCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiltedCardComponent]
    });
    fixture = TestBed.createComponent(TiltedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
