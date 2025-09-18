import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsHospitalAppointmentsBookComponent } from './apps-hospital-appointments-book.component';

describe('AppsHospitalAppointmentsBookComponent', () => {
  let component: AppsHospitalAppointmentsBookComponent;
  let fixture: ComponentFixture<AppsHospitalAppointmentsBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsHospitalAppointmentsBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsHospitalAppointmentsBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
