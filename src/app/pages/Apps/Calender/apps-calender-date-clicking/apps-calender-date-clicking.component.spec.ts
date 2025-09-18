import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsCalenderDateClickingComponent } from './apps-calender-date-clicking.component';

describe('AppsCalenderDateClickingComponent', () => {
  let component: AppsCalenderDateClickingComponent;
  let fixture: ComponentFixture<AppsCalenderDateClickingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsCalenderDateClickingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsCalenderDateClickingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
