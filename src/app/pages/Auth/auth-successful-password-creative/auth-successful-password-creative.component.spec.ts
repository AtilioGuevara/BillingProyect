import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSuccessfulPasswordCreativeComponent } from './auth-successful-password-creative.component';

describe('AuthSuccessfulPasswordCreativeComponent', () => {
  let component: AuthSuccessfulPasswordCreativeComponent;
  let fixture: ComponentFixture<AuthSuccessfulPasswordCreativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSuccessfulPasswordCreativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSuccessfulPasswordCreativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
