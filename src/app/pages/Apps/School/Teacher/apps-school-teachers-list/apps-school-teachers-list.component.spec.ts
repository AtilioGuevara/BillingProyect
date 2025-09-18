import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsSchoolTeachersListComponent } from './apps-school-teachers-list.component';

describe('AppsSchoolTeachersListComponent', () => {
  let component: AppsSchoolTeachersListComponent;
  let fixture: ComponentFixture<AppsSchoolTeachersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsSchoolTeachersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsSchoolTeachersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
