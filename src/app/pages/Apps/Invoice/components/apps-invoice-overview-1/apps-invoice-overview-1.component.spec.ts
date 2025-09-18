import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsInvoiceOverview1Component } from './apps-invoice-overview-1.component';

describe('AppsInvoiceOverview1Component', () => {
  let component: AppsInvoiceOverview1Component;
  let fixture: ComponentFixture<AppsInvoiceOverview1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsInvoiceOverview1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsInvoiceOverview1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
