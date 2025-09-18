import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSignupCreativeComponent } from './auth-signup-creative.component';

describe('AuthSignupCreativeComponent', () => {
  let component: AuthSignupCreativeComponent;
  let fixture: ComponentFixture<AuthSignupCreativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSignupCreativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSignupCreativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
