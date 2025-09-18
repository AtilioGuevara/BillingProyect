import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthForgotPasswordBasicComponent } from './auth-forgot-password-basic.component';

describe('AuthForgotPasswordBasicComponent', () => {
  let component: AuthForgotPasswordBasicComponent;
  let fixture: ComponentFixture<AuthForgotPasswordBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthForgotPasswordBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthForgotPasswordBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
