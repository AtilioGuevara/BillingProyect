import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthForgotPasswordModernComponent } from './auth-forgot-password-modern.component';

describe('AuthForgotPasswordModernComponent', () => {
  let component: AuthForgotPasswordModernComponent;
  let fixture: ComponentFixture<AuthForgotPasswordModernComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthForgotPasswordModernComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthForgotPasswordModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
