import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDatatablesBorderedComponent } from './table-datatables-bordered.component';

describe('TableDatatablesBorderedComponent', () => {
  let component: TableDatatablesBorderedComponent;
  let fixture: ComponentFixture<TableDatatablesBorderedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDatatablesBorderedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDatatablesBorderedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
