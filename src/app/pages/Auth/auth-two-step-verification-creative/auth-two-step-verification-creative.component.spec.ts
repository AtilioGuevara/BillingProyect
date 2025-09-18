import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTwoStepVerificationCreativeComponent } from './auth-two-step-verification-creative.component';

describe('AuthTwoStepVerificationCreativeComponent', () => {
  let component: AuthTwoStepVerificationCreativeComponent;
  let fixture: ComponentFixture<AuthTwoStepVerificationCreativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthTwoStepVerificationCreativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthTwoStepVerificationCreativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
