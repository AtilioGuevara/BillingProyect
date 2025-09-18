import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsSchoolParentsComponent } from './apps-school-parents.component';

describe('AppsSchoolParentsComponent', () => {
  let component: AppsSchoolParentsComponent;
  let fixture: ComponentFixture<AppsSchoolParentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsSchoolParentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsSchoolParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
