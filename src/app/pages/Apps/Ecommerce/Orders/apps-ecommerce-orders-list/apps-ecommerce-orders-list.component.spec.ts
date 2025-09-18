import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEcommerceOrdersListComponent } from './apps-ecommerce-orders-list.component';

describe('AppsEcommerceOrdersListComponent', () => {
  let component: AppsEcommerceOrdersListComponent;
  let fixture: ComponentFixture<AppsEcommerceOrdersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsEcommerceOrdersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsEcommerceOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
