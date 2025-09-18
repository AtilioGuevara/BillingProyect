import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSignupBasicComponent } from './auth-signup-basic.component';

describe('AuthSignupBasicComponent', () => {
  let component: AuthSignupBasicComponent;
  let fixture: ComponentFixture<AuthSignupBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSignupBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSignupBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
