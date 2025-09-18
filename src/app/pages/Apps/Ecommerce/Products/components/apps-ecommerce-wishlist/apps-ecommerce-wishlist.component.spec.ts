import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEcommerceWishlistComponent } from './apps-ecommerce-wishlist.component';

describe('AppsEcommerceWishlistComponent', () => {
  let component: AppsEcommerceWishlistComponent;
  let fixture: ComponentFixture<AppsEcommerceWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsEcommerceWishlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsEcommerceWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
