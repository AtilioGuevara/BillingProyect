import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartAreaComponent } from './apexchart-area.component';

describe('ApexchartAreaComponent', () => {
  let component: ApexchartAreaComponent;
  let fixture: ComponentFixture<ApexchartAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexchartAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexchartAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
