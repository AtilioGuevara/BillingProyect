import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTwoStepVerificationModernComponent } from './auth-two-step-verification-modern.component';

describe('AuthTwoStepVerificationModernComponent', () => {
  let component: AuthTwoStepVerificationModernComponent;
  let fixture: ComponentFixture<AuthTwoStepVerificationModernComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthTwoStepVerificationModernComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthTwoStepVerificationModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
