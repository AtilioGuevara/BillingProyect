import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEcommerceOrdersOverviewComponent } from './apps-ecommerce-orders-overview.component';

describe('AppsEcommerceOrdersOverviewComponent', () => {
  let component: AppsEcommerceOrdersOverviewComponent;
  let fixture: ComponentFixture<AppsEcommerceOrdersOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsEcommerceOrdersOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsEcommerceOrdersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
