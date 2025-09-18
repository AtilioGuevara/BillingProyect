import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsSchoolTeachersPayrollComponent } from './apps-school-teachers-payroll.component';

describe('AppsSchoolTeachersPayrollComponent', () => {
  let component: AppsSchoolTeachersPayrollComponent;
  let fixture: ComponentFixture<AppsSchoolTeachersPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsSchoolTeachersPayrollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsSchoolTeachersPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
