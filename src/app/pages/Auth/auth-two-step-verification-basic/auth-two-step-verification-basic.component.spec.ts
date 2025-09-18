import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTwoStepVerificationBasicComponent } from './auth-two-step-verification-basic.component';

describe('AuthTwoStepVerificationBasicComponent', () => {
  let component: AuthTwoStepVerificationBasicComponent;
  let fixture: ComponentFixture<AuthTwoStepVerificationBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthTwoStepVerificationBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthTwoStepVerificationBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
