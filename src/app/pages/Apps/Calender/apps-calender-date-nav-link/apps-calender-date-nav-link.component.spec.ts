import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsCalenderDateNavLinkComponent } from './apps-calender-date-nav-link.component';

describe('AppsCalenderDateNavLinkComponent', () => {
  let component: AppsCalenderDateNavLinkComponent;
  let fixture: ComponentFixture<AppsCalenderDateNavLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsCalenderDateNavLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsCalenderDateNavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
