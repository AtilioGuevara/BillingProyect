import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartCandlestickComponent } from './apexchart-candlestick.component';

describe('ApexchartCandlestickComponent', () => {
  let component: ApexchartCandlestickComponent;
  let fixture: ComponentFixture<ApexchartCandlestickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexchartCandlestickComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexchartCandlestickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
