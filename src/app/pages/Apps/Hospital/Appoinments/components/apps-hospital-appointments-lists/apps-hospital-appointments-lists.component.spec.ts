import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsHospitalAppointmentsListsComponent } from './apps-hospital-appointments-lists.component';

describe('AppsHospitalAppointmentsListsComponent', () => {
  let component: AppsHospitalAppointmentsListsComponent;
  let fixture: ComponentFixture<AppsHospitalAppointmentsListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsHospitalAppointmentsListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsHospitalAppointmentsListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
