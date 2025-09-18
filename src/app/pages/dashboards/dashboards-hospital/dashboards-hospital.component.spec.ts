import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsHospitalComponent } from './dashboards-hospital.component';

describe('DashboardsHospitalComponent', () => {
  let component: DashboardsHospitalComponent;
  let fixture: ComponentFixture<DashboardsHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardsHospitalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardsHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
