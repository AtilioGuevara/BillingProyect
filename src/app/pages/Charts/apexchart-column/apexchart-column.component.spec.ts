import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartColumnComponent } from './apexchart-column.component';

describe('ApexchartColumnComponent', () => {
  let component: ApexchartColumnComponent;
  let fixture: ComponentFixture<ApexchartColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexchartColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexchartColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
