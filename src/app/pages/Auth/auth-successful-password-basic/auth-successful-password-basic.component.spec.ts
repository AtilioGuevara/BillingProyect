import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSuccessfulPasswordBasicComponent } from './auth-successful-password-basic.component';

describe('AuthSuccessfulPasswordBasicComponent', () => {
  let component: AuthSuccessfulPasswordBasicComponent;
  let fixture: ComponentFixture<AuthSuccessfulPasswordBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSuccessfulPasswordBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSuccessfulPasswordBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
