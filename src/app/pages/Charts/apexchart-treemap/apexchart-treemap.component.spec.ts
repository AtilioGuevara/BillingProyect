import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartTreemapComponent } from './apexchart-treemap.component';

describe('ApexchartTreemapComponent', () => {
  let component: ApexchartTreemapComponent;
  let fixture: ComponentFixture<ApexchartTreemapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexchartTreemapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexchartTreemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
