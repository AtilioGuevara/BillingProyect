import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDatatablesHoverComponent } from './table-datatables-hover.component';

describe('TableDatatablesHoverComponent', () => {
  let component: TableDatatablesHoverComponent;
  let fixture: ComponentFixture<TableDatatablesHoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDatatablesHoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDatatablesHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
