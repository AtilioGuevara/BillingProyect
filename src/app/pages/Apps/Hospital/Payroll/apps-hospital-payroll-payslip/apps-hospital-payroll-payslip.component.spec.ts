import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsHospitalPayrollPayslipComponent } from './apps-hospital-payroll-payslip.component';

describe('AppsHospitalPayrollPayslipComponent', () => {
  let component: AppsHospitalPayrollPayslipComponent;
  let fixture: ComponentFixture<AppsHospitalPayrollPayslipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsHospitalPayrollPayslipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsHospitalPayrollPayslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
