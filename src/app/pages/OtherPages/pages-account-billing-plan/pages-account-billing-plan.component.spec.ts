import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesAccountBillingPlanComponent } from './pages-account-billing-plan.component';

describe('PagesAccountBillingPlanComponent', () => {
  let component: PagesAccountBillingPlanComponent;
  let fixture: ComponentFixture<PagesAccountBillingPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesAccountBillingPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesAccountBillingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
