import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartHeatmapComponent } from './apexchart-heatmap.component';

describe('ApexchartHeatmapComponent', () => {
  let component: ApexchartHeatmapComponent;
  let fixture: ComponentFixture<ApexchartHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexchartHeatmapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexchartHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
