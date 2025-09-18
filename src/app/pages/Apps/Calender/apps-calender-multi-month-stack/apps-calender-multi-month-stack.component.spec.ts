import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsCalenderMultiMonthStackComponent } from './apps-calender-multi-month-stack.component';

describe('AppsCalenderMultiMonthStackComponent', () => {
  let component: AppsCalenderMultiMonthStackComponent;
  let fixture: ComponentFixture<AppsCalenderMultiMonthStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsCalenderMultiMonthStackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsCalenderMultiMonthStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
