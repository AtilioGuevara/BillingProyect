import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSignupModernComponent } from './auth-signup-modern.component';

describe('AuthSignupModernComponent', () => {
  let component: AuthSignupModernComponent;
  let fixture: ComponentFixture<AuthSignupModernComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSignupModernComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSignupModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
