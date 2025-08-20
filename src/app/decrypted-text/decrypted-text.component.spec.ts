import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecryptedTextComponent } from './decrypted-text.component';

describe('DecryptedTextComponent', () => {
  let component: DecryptedTextComponent;
  let fixture: ComponentFixture<DecryptedTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecryptedTextComponent]
    });
    fixture = TestBed.createComponent(DecryptedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
