import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartSlopeComponent } from './apexchart-slope.component';

describe('ApexchartSlopeComponent', () => {
  let component: ApexchartSlopeComponent;
  let fixture: ComponentFixture<ApexchartSlopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexchartSlopeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexchartSlopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
