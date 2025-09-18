import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEcommerceCustomerUserComponent } from './apps-ecommerce-customer-user.component';

describe('AppsEcommerceCustomerUserComponent', () => {
  let component: AppsEcommerceCustomerUserComponent;
  let fixture: ComponentFixture<AppsEcommerceCustomerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsEcommerceCustomerUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsEcommerceCustomerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
