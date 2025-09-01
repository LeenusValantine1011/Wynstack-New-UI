import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentcreationComponent } from './contentcreation.component';

describe('ContentcreationComponent', () => {
  let component: ContentcreationComponent;
  let fixture: ComponentFixture<ContentcreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentcreationComponent]
    });
    fixture = TestBed.createComponent(ContentcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
