import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDatatablesBasicComponent } from './table-datatables-basic.component';

describe('TableDatatablesBasicComponent', () => {
  let component: TableDatatablesBasicComponent;
  let fixture: ComponentFixture<TableDatatablesBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDatatablesBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDatatablesBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
