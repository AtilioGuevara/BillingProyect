import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsEcommerceProductsListComponent } from './ag-grid-products-list.component';

describe('AppsEcommerceProductsListComponent', () => {
  let component: AppsEcommerceProductsListComponent;
  let fixture: ComponentFixture<AppsEcommerceProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsEcommerceProductsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsEcommerceProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
