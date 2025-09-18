import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputSpinComponent } from './form-input-spin.component';

describe('FormInputSpinComponent', () => {
  let component: FormInputSpinComponent;
  let fixture: ComponentFixture<FormInputSpinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInputSpinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInputSpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
