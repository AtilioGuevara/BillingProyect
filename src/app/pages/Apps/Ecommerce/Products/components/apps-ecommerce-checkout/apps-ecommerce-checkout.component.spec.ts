import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEcommerceCheckoutComponent } from './apps-ecommerce-checkout.component';

describe('AppsEcommerceCheckoutComponent', () => {
  let component: AppsEcommerceCheckoutComponent;
  let fixture: ComponentFixture<AppsEcommerceCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsEcommerceCheckoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsEcommerceCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
