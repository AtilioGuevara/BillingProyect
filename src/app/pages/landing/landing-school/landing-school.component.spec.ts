import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingSchoolComponent } from './landing-school.component';

describe('LandingSchoolComponent', () => {
  let component: LandingSchoolComponent;
  let fixture: ComponentFixture<LandingSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingSchoolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
