import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartRangeAreaComponent } from './apexchart-range-area.component';

describe('ApexchartRangeAreaComponent', () => {
  let component: ApexchartRangeAreaComponent;
  let fixture: ComponentFixture<ApexchartRangeAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexchartRangeAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexchartRangeAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
