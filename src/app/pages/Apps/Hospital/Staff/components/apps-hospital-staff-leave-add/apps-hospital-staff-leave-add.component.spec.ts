import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsHospitalStaffLeaveAddComponent } from './apps-hospital-staff-leave-add.component';

describe('AppsHospitalStaffLeaveAddComponent', () => {
  let component: AppsHospitalStaffLeaveAddComponent;
  let fixture: ComponentFixture<AppsHospitalStaffLeaveAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsHospitalStaffLeaveAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsHospitalStaffLeaveAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
