import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsHospitalStaffHolidaysComponent } from './apps-hospital-staff-holidays.component';

describe('AppsHospitalStaffHolidaysComponent', () => {
  let component: AppsHospitalStaffHolidaysComponent;
  let fixture: ComponentFixture<AppsHospitalStaffHolidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsHospitalStaffHolidaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsHospitalStaffHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
