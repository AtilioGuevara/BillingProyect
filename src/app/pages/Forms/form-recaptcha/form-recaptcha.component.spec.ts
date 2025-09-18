import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRecaptchaComponent } from './form-recaptcha.component';

describe('FormRecaptchaComponent', () => {
  let component: FormRecaptchaComponent;
  let fixture: ComponentFixture<FormRecaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRecaptchaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRecaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
