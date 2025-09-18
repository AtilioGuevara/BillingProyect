import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsHospitalStaffAttendanceComponent } from './apps-hospital-staff-attendance.component';

describe('AppsHospitalStaffAttendanceComponent', () => {
  let component: AppsHospitalStaffAttendanceComponent;
  let fixture: ComponentFixture<AppsHospitalStaffAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsHospitalStaffAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsHospitalStaffAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
