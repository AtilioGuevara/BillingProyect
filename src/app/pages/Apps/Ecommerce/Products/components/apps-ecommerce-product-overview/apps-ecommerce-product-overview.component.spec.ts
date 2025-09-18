import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEcommerceProductOverviewComponent } from './apps-ecommerce-product-overview.component';

describe('AppsEcommerceProductOverviewComponent', () => {
  let component: AppsEcommerceProductOverviewComponent;
  let fixture: ComponentFixture<AppsEcommerceProductOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsEcommerceProductOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsEcommerceProductOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
