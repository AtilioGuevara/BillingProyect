import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEcommerceCreateProductsComponent } from './apps-ecommerce-create-products.component';

describe('AppsEcommerceCreateProductsComponent', () => {
  let component: AppsEcommerceCreateProductsComponent;
  let fixture: ComponentFixture<AppsEcommerceCreateProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsEcommerceCreateProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsEcommerceCreateProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
