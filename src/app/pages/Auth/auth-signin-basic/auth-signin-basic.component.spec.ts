import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSigninBasicComponent } from './auth-signin-basic.component';

describe('AuthSigninBasicComponent', () => {
  let component: AuthSigninBasicComponent;
  let fixture: ComponentFixture<AuthSigninBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSigninBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSigninBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
