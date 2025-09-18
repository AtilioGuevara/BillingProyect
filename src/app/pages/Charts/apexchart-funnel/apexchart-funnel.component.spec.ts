import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartFunnelComponent } from './apexchart-funnel.component';

describe('ApexchartFunnelComponent', () => {
  let component: ApexchartFunnelComponent;
  let fixture: ComponentFixture<ApexchartFunnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexchartFunnelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexchartFunnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
