import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSigninCreativeComponent } from './auth-signin-creative.component';

describe('AuthSigninCreativeComponent', () => {
  let component: AuthSigninCreativeComponent;
  let fixture: ComponentFixture<AuthSigninCreativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSigninCreativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSigninCreativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
