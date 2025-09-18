import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsHospitalDepartmentsComponent } from './apps-hospital-departments.component';

describe('AppsHospitalDepartmentsComponent', () => {
  let component: AppsHospitalDepartmentsComponent;
  let fixture: ComponentFixture<AppsHospitalDepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsHospitalDepartmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsHospitalDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
