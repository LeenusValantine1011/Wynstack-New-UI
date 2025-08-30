import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalmarketingserviceComponent } from './digitalmarketingservice.component';

describe('DigitalmarketingserviceComponent', () => {
  let component: DigitalmarketingserviceComponent;
  let fixture: ComponentFixture<DigitalmarketingserviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DigitalmarketingserviceComponent]
    });
    fixture = TestBed.createComponent(DigitalmarketingserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
