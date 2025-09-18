import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePricingListComponent } from './page-pricing-list.component';

describe('PagePricingListComponent', () => {
  let component: PagePricingListComponent;
  let fixture: ComponentFixture<PagePricingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePricingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagePricingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
