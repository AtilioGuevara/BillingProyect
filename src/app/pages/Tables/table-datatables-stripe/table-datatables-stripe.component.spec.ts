import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDatatablesStripeComponent } from './table-datatables-stripe.component';

describe('TableDatatablesStripeComponent', () => {
  let component: TableDatatablesStripeComponent;
  let fixture: ComponentFixture<TableDatatablesStripeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDatatablesStripeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDatatablesStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
