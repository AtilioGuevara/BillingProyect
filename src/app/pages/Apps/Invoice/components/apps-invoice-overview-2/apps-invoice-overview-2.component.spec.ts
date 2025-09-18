import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsInvoiceOverview2Component } from './apps-invoice-overview-2.component';

describe('AppsInvoiceOverview2Component', () => {
  let component: AppsInvoiceOverview2Component;
  let fixture: ComponentFixture<AppsInvoiceOverview2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsInvoiceOverview2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsInvoiceOverview2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
