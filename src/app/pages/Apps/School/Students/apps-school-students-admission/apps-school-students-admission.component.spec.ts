import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsSchoolStudentsAdmissionComponent } from './apps-school-students-admission.component';

describe('AppsSchoolStudentsAdmissionComponent', () => {
  let component: AppsSchoolStudentsAdmissionComponent;
  let fixture: ComponentFixture<AppsSchoolStudentsAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsSchoolStudentsAdmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsSchoolStudentsAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
