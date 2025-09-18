import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingInvoiceComponent } from './landing-invoice.component';

describe('LandingInvoiceComponent', () => {
  let component: LandingInvoiceComponent;
  let fixture: ComponentFixture<LandingInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
