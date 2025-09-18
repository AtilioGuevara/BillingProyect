import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsPosUserLoginComponent } from './apps-pos-user-login.component';

describe('AppsPosUserLoginComponent', () => {
  let component: AppsPosUserLoginComponent;
  let fixture: ComponentFixture<AppsPosUserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsPosUserLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsPosUserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
