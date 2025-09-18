import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalOrderSummaryComponent } from './final-order-summary.component';

describe('FinalOrderSummaryComponent', () => {
  let component: FinalOrderSummaryComponent;
  let fixture: ComponentFixture<FinalOrderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalOrderSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalOrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
