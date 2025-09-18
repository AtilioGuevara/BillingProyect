import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartPieComponent } from './apexchart-pie.component';

describe('ApexchartPieComponent', () => {
  let component: ApexchartPieComponent;
  let fixture: ComponentFixture<ApexchartPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexchartPieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexchartPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
