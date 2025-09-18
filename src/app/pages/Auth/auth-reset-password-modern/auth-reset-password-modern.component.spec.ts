import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthResetPasswordModernComponent } from './auth-reset-password-modern.component';

describe('AuthResetPasswordModernComponent', () => {
  let component: AuthResetPasswordModernComponent;
  let fixture: ComponentFixture<AuthResetPasswordModernComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthResetPasswordModernComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthResetPasswordModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
