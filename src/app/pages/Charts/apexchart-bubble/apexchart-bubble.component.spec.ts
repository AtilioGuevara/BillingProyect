import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexchartBubbleComponent } from './apexchart-bubble.component';

describe('ApexchartBubbleComponent', () => {
  let component: ApexchartBubbleComponent;
  let fixture: ComponentFixture<ApexchartBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApexchartBubbleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexchartBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
