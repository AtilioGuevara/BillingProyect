import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthForgotPasswordCreativeComponent } from './auth-forgot-password-creative.component';

describe('AuthForgotPasswordCreativeComponent', () => {
  let component: AuthForgotPasswordCreativeComponent;
  let fixture: ComponentFixture<AuthForgotPasswordCreativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthForgotPasswordCreativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthForgotPasswordCreativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
