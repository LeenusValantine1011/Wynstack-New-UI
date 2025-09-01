import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopifystoreComponent } from './shopifystore.component';

describe('ShopifystoreComponent', () => {
  let component: ShopifystoreComponent;
  let fixture: ComponentFixture<ShopifystoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopifystoreComponent]
    });
    fixture = TestBed.createComponent(ShopifystoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
