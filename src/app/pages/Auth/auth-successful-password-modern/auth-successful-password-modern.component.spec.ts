import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSuccessfulPasswordModernComponent } from './auth-successful-password-modern.component';

describe('AuthSuccessfulPasswordModernComponent', () => {
  let component: AuthSuccessfulPasswordModernComponent;
  let fixture: ComponentFixture<AuthSuccessfulPasswordModernComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSuccessfulPasswordModernComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSuccessfulPasswordModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
