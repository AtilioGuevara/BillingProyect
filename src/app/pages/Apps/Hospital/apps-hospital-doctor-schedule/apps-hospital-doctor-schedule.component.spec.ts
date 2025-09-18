import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsHospitalDoctorScheduleComponent } from './apps-hospital-doctor-schedule.component';

describe('AppsHospitalDoctorScheduleComponent', () => {
  let component: AppsHospitalDoctorScheduleComponent;
  let fixture: ComponentFixture<AppsHospitalDoctorScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsHospitalDoctorScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsHospitalDoctorScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
