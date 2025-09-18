import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartRadarComponent } from './apexchart-radar.component';

describe('ApexchartRadarComponent', () => {
  let component: ApexchartRadarComponent;
  let fixture: ComponentFixture<ApexchartRadarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexchartRadarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexchartRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
