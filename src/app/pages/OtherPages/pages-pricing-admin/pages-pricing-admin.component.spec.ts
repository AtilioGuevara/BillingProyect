import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesPricingAdminComponent } from './pages-pricing-admin.component';

describe('PagesPricingAdminComponent', () => {
  let component: PagesPricingAdminComponent;
  let fixture: ComponentFixture<PagesPricingAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesPricingAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesPricingAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
