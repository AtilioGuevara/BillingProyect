import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCheckboxRadioComponent } from './form-checkbox-radio.component';

describe('FormCheckboxRadioComponent', () => {
  let component: FormCheckboxRadioComponent;
  let fixture: ComponentFixture<FormCheckboxRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCheckboxRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCheckboxRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
