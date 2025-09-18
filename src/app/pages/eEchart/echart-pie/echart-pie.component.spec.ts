import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartPieComponent } from './echart-pie.component';

describe('EchartPieComponent', () => {
  let component: EchartPieComponent;
  let fixture: ComponentFixture<EchartPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EchartPieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EchartPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
