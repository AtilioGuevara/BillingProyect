import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartTimelineComponent } from './apexchart-timeline.component';

describe('ApexchartTimelineComponent', () => {
  let component: ApexchartTimelineComponent;
  let fixture: ComponentFixture<ApexchartTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexchartTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexchartTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
