import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsCalenderDayviewComponent } from './apps-calender-dayview.component';

describe('AppsCalenderDayviewComponent', () => {
  let component: AppsCalenderDayviewComponent;
  let fixture: ComponentFixture<AppsCalenderDayviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsCalenderDayviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsCalenderDayviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
