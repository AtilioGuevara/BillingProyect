import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartMixedComponent } from './apexchart-mixed.component';

describe('ApexchartMixedComponent', () => {
  let component: ApexchartMixedComponent;
  let fixture: ComponentFixture<ApexchartMixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexchartMixedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexchartMixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
