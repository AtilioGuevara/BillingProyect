import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientOverviewModalComponent } from './patient-overview-modal.component';

describe('PatientOverviewModalComponent', () => {
  let component: PatientOverviewModalComponent;
  let fixture: ComponentFixture<PatientOverviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientOverviewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientOverviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
