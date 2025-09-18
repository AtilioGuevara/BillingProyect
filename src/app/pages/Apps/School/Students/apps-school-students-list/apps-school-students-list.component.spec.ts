import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsSchoolStudentsListComponent } from './apps-school-students-list.component';

describe('AppsSchoolStudentsListComponent', () => {
  let component: AppsSchoolStudentsListComponent;
  let fixture: ComponentFixture<AppsSchoolStudentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsSchoolStudentsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsSchoolStudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
