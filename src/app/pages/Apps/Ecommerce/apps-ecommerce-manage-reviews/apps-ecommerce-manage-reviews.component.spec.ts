import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEcommerceManageReviewsComponent } from './apps-ecommerce-manage-reviews.component';

describe('AppsEcommerceManageReviewsComponent', () => {
  let component: AppsEcommerceManageReviewsComponent;
  let fixture: ComponentFixture<AppsEcommerceManageReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsEcommerceManageReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsEcommerceManageReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
