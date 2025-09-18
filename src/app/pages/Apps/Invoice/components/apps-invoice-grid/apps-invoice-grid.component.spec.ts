import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsInvoiceGridComponent } from './apps-invoice-grid.component';

describe('AppsInvoiceGridComponent', () => {
  let component: AppsInvoiceGridComponent;
  let fixture: ComponentFixture<AppsInvoiceGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsInvoiceGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsInvoiceGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
