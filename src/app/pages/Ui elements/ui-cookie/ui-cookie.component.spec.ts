import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCookieComponent } from './ui-cookie.component';

describe('UiCookieComponent', () => {
  let component: UiCookieComponent;
  let fixture: ComponentFixture<UiCookieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCookieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiCookieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
