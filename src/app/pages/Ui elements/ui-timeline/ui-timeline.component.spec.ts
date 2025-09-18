import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTimelineComponent } from './ui-timeline.component';

describe('UiTimelineComponent', () => {
  let component: UiTimelineComponent;
  let fixture: ComponentFixture<UiTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
