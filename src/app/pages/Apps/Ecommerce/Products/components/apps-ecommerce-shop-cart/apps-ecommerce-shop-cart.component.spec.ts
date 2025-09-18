import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEcommerceShopCartComponent } from './apps-ecommerce-shop-cart.component';

describe('AppsEcommerceShopCartComponent', () => {
  let component: AppsEcommerceShopCartComponent;
  let fixture: ComponentFixture<AppsEcommerceShopCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsEcommerceShopCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsEcommerceShopCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
