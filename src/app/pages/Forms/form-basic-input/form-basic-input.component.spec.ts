import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBasicInputComponent } from './form-basic-input.component';

describe('FormBasicInputComponent', () => {
  let component: FormBasicInputComponent;
  let fixture: ComponentFixture<FormBasicInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBasicInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBasicInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
