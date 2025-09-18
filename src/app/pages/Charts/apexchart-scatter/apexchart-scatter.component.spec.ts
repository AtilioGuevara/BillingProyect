import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartScatterComponent } from './apexchart-scatter.component';

describe('ApexchartScatterComponent', () => {
  let component: ApexchartScatterComponent;
  let fixture: ComponentFixture<ApexchartScatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexchartScatterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexchartScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
