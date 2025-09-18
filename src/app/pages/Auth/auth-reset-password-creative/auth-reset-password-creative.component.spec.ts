import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthResetPasswordCreativeComponent } from './auth-reset-password-creative.component';

describe('AuthResetPasswordCreativeComponent', () => {
  let component: AuthResetPasswordCreativeComponent;
  let fixture: ComponentFixture<AuthResetPasswordCreativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthResetPasswordCreativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthResetPasswordCreativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
