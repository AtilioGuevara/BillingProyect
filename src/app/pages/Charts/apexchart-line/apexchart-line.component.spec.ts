import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartLineComponent } from './apexchart-line.component';

describe('ApexchartLineComponent', () => {
  let component: ApexchartLineComponent;
  let fixture: ComponentFixture<ApexchartLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexchartLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexchartLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
