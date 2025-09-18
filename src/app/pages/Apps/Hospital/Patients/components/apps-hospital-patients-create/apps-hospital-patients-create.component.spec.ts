import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsHospitalPatientsCreateComponent } from './apps-hospital-patients-create.component';

describe('AppsHospitalPatientsCreateComponent', () => {
  let component: AppsHospitalPatientsCreateComponent;
  let fixture: ComponentFixture<AppsHospitalPatientsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsHospitalPatientsCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsHospitalPatientsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
