import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsCalenderMultiMonthGridComponent } from './apps-calender-multi-month-grid.component';

describe('AppsCalenderMultiMonthGridComponent', () => {
  let component: AppsCalenderMultiMonthGridComponent;
  let fixture: ComponentFixture<AppsCalenderMultiMonthGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsCalenderMultiMonthGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsCalenderMultiMonthGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
