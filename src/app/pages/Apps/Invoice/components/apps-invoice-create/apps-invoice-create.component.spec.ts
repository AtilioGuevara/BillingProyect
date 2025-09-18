import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsInvoiceCreateComponent } from './apps-invoice-create.component';

describe('AppsInvoiceCreateComponent', () => {
  let component: AppsInvoiceCreateComponent;
  let fixture: ComponentFixture<AppsInvoiceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsInvoiceCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsInvoiceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
