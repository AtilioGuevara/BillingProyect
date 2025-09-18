import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsHospitalPatientsListsComponent } from './apps-hospital-patients-lists.component';

describe('AppsHospitalPatientsListsComponent', () => {
  let component: AppsHospitalPatientsListsComponent;
  let fixture: ComponentFixture<AppsHospitalPatientsListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsHospitalPatientsListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsHospitalPatientsListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
