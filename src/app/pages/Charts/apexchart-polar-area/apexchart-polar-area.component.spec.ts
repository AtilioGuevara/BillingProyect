import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartPolarAreaComponent } from './apexchart-polar-area.component';

describe('ApexchartPolarAreaComponent', () => {
  let component: ApexchartPolarAreaComponent;
  let fixture: ComponentFixture<ApexchartPolarAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexchartPolarAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexchartPolarAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
