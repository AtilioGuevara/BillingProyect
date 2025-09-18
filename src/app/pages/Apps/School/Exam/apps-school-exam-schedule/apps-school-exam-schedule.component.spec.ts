import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsSchoolExamScheduleComponent } from './apps-school-exam-schedule.component';

describe('AppsSchoolExamScheduleComponent', () => {
  let component: AppsSchoolExamScheduleComponent;
  let fixture: ComponentFixture<AppsSchoolExamScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsSchoolExamScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsSchoolExamScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
