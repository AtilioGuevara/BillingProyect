import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEcommerceProductsGridComponent } from './apps-ecommerce-products-grid.component';

describe('AppsEcommerceProductsGridComponent', () => {
  let component: AppsEcommerceProductsGridComponent;
  let fixture: ComponentFixture<AppsEcommerceProductsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsEcommerceProductsGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsEcommerceProductsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
