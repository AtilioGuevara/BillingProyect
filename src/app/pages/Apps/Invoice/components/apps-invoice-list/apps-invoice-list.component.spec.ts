import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsInvoiceListComponent } from './apps-invoice-list.component';

describe('AppsInvoiceListComponent', () => {
  let component: AppsInvoiceListComponent;
  let fixture: ComponentFixture<AppsInvoiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsInvoiceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
