import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartRadialbarComponent } from './apexchart-radialbar.component';

describe('ApexchartRadialbarComponent', () => {
  let component: ApexchartRadialbarComponent;
  let fixture: ComponentFixture<ApexchartRadialbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexchartRadialbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexchartRadialbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
