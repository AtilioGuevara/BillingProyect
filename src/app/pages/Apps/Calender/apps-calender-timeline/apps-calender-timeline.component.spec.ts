import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsCalenderTimelineComponent } from './apps-calender-timeline.component';

describe('AppsCalenderTimelineComponent', () => {
  let component: AppsCalenderTimelineComponent;
  let fixture: ComponentFixture<AppsCalenderTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsCalenderTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsCalenderTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
