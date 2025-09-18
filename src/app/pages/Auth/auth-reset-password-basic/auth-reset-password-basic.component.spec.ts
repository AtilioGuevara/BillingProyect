import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthResetPasswordBasicComponent } from './auth-reset-password-basic.component';

describe('AuthResetPasswordBasicComponent', () => {
  let component: AuthResetPasswordBasicComponent;
  let fixture: ComponentFixture<AuthResetPasswordBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthResetPasswordBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthResetPasswordBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
