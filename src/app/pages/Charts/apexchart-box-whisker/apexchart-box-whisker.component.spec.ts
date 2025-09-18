import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartBoxWhiskerComponent } from './apexchart-box-whisker.component';

describe('ApexchartBoxWhiskerComponent', () => {
  let component: ApexchartBoxWhiskerComponent;
  let fixture: ComponentFixture<ApexchartBoxWhiskerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexchartBoxWhiskerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexchartBoxWhiskerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
