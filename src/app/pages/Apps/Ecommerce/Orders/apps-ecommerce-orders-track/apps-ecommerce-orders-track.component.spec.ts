import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEcommerceOrdersTrackComponent } from './apps-ecommerce-orders-track.component';

describe('AppsEcommerceOrdersTrackComponent', () => {
  let component: AppsEcommerceOrdersTrackComponent;
  let fixture: ComponentFixture<AppsEcommerceOrdersTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsEcommerceOrdersTrackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsEcommerceOrdersTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
