import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormClipboardComponent } from './form-clipboard.component';

describe('FormClipboardComponent', () => {
  let component: FormClipboardComponent;
  let fixture: ComponentFixture<FormClipboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormClipboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormClipboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
