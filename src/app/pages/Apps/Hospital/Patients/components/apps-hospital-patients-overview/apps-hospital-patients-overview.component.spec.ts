import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsHospitalPatientsOverviewComponent } from './apps-hospital-patients-overview.component';

describe('AppsHospitalPatientsOverviewComponent', () => {
  let component: AppsHospitalPatientsOverviewComponent;
  let fixture: ComponentFixture<AppsHospitalPatientsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsHospitalPatientsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsHospitalPatientsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
