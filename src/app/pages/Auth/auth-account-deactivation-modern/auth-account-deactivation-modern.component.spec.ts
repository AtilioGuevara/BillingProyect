import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAccountDeactivationModernComponent } from './auth-account-deactivation-modern.component';

describe('AuthAccountDeactivationModernComponent', () => {
  let component: AuthAccountDeactivationModernComponent;
  let fixture: ComponentFixture<AuthAccountDeactivationModernComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthAccountDeactivationModernComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthAccountDeactivationModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
