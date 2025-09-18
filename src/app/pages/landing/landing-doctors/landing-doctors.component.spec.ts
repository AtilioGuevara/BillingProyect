import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingDoctorsComponent } from './landing-doctors.component';

describe('LandingDoctorsComponent', () => {
  let component: LandingDoctorsComponent;
  let fixture: ComponentFixture<LandingDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingDoctorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
