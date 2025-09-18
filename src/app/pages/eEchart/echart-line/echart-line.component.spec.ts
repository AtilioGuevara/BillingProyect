import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartLineComponent } from './echart-line.component';

describe('EchartLineComponent', () => {
  let component: EchartLineComponent;
  let fixture: ComponentFixture<EchartLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EchartLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EchartLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
