import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsSchoolTeachersOverviewComponent } from './apps-school-teachers-overview.component';

describe('AppsSchoolTeachersOverviewComponent', () => {
  let component: AppsSchoolTeachersOverviewComponent;
  let fixture: ComponentFixture<AppsSchoolTeachersOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsSchoolTeachersOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsSchoolTeachersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
