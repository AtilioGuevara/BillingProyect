import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesAccountNotificationComponent } from './pages-account-notification.component';

describe('PagesAccountNotificationComponent', () => {
  let component: PagesAccountNotificationComponent;
  let fixture: ComponentFixture<PagesAccountNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesAccountNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesAccountNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
