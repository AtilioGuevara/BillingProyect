import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsHospitalStaffListsComponent } from './apps-hospital-staff-lists.component';

describe('AppsHospitalStaffListsComponent', () => {
  let component: AppsHospitalStaffListsComponent;
  let fixture: ComponentFixture<AppsHospitalStaffListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsHospitalStaffListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsHospitalStaffListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
