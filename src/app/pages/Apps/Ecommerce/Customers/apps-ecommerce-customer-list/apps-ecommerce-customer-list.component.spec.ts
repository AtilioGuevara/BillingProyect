import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEcommerceCustomerListComponent } from './apps-ecommerce-customer-list.component';

describe('AppsEcommerceCustomerListComponent', () => {
  let component: AppsEcommerceCustomerListComponent;
  let fixture: ComponentFixture<AppsEcommerceCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsEcommerceCustomerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsEcommerceCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
