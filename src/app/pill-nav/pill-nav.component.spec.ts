import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PillNavComponent } from './pill-nav.component';

describe('PillNavComponent', () => {
  let component: PillNavComponent;
  let fixture: ComponentFixture<PillNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PillNavComponent]
    });
    fixture = TestBed.createComponent(PillNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
