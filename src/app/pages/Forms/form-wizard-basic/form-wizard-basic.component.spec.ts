import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWizardBasicComponent } from './form-wizard-basic.component';

describe('FormWizardBasicComponent', () => {
  let component: FormWizardBasicComponent;
  let fixture: ComponentFixture<FormWizardBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormWizardBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormWizardBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
