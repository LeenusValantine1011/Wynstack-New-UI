import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotGridComponent } from './dot-grid.component';

describe('DotGridComponent', () => {
  let component: DotGridComponent;
  let fixture: ComponentFixture<DotGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DotGridComponent]
    });
    fixture = TestBed.createComponent(DotGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
