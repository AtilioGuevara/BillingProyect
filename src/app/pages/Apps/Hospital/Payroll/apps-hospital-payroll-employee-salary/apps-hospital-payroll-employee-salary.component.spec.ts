import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsHospitalPayrollEmployeeSalaryComponent } from './apps-hospital-payroll-employee-salary.component';

describe('AppsHospitalPayrollEmployeeSalaryComponent', () => {
  let component: AppsHospitalPayrollEmployeeSalaryComponent;
  let fixture: ComponentFixture<AppsHospitalPayrollEmployeeSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsHospitalPayrollEmployeeSalaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsHospitalPayrollEmployeeSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
