import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesPricingComponent } from './pages-pricing.component';

describe('PagesPricingComponent', () => {
  let component: PagesPricingComponent;
  let fixture: ComponentFixture<PagesPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesPricingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
