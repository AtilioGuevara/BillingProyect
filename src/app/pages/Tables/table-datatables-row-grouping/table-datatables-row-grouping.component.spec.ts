import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDatatablesRowGroupingComponent } from './table-datatables-row-grouping.component';

describe('TableDatatablesRowGroupingComponent', () => {
  let component: TableDatatablesRowGroupingComponent;
  let fixture: ComponentFixture<TableDatatablesRowGroupingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDatatablesRowGroupingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDatatablesRowGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
