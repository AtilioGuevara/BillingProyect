import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAccountDeactivationBasicComponent } from './auth-account-deactivation-basic.component';

describe('AuthAccountDeactivationBasicComponent', () => {
  let component: AuthAccountDeactivationBasicComponent;
  let fixture: ComponentFixture<AuthAccountDeactivationBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthAccountDeactivationBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthAccountDeactivationBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
