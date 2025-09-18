import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsSchoolAttendancesStudentsComponent } from './apps-school-attendances-students.component';

describe('AppsSchoolAttendancesStudentsComponent', () => {
  let component: AppsSchoolAttendancesStudentsComponent;
  let fixture: ComponentFixture<AppsSchoolAttendancesStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsSchoolAttendancesStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsSchoolAttendancesStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
