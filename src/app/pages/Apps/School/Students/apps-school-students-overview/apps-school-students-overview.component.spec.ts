import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsSchoolStudentsOverviewComponent } from './apps-school-students-overview.component';

describe('AppsSchoolStudentsOverviewComponent', () => {
  let component: AppsSchoolStudentsOverviewComponent;
  let fixture: ComponentFixture<AppsSchoolStudentsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsSchoolStudentsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsSchoolStudentsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
