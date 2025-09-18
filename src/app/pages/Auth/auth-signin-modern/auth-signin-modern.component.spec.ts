import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSigninModernComponent } from './auth-signin-modern.component';

describe('AuthSigninModernComponent', () => {
  let component: AuthSigninModernComponent;
  let fixture: ComponentFixture<AuthSigninModernComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSigninModernComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSigninModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
