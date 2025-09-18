import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsSchoolExamQuestionComponent } from './apps-school-exam-question.component';

describe('AppsSchoolExamQuestionComponent', () => {
  let component: AppsSchoolExamQuestionComponent;
  let fixture: ComponentFixture<AppsSchoolExamQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsSchoolExamQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsSchoolExamQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
