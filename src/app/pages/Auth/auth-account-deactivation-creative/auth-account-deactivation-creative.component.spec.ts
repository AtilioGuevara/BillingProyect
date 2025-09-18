import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAccountDeactivationCreativeComponent } from './auth-account-deactivation-creative.component';

describe('AuthAccountDeactivationCreativeComponent', () => {
  let component: AuthAccountDeactivationCreativeComponent;
  let fixture: ComponentFixture<AuthAccountDeactivationCreativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthAccountDeactivationCreativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthAccountDeactivationCreativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
