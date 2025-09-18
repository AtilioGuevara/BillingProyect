import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsHospitalStaffLeavesComponent } from './apps-hospital-staff-leaves.component';

describe('AppsHospitalStaffLeavesComponent', () => {
  let component: AppsHospitalStaffLeavesComponent;
  let fixture: ComponentFixture<AppsHospitalStaffLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsHospitalStaffLeavesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsHospitalStaffLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
