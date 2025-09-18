import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStepComponent } from './profile-step.component';

describe('ProfileStepComponent', () => {
  let component: ProfileStepComponent;
  let fixture: ComponentFixture<ProfileStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
