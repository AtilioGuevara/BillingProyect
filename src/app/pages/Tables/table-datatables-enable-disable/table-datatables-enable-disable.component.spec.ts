import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDatatablesEnableDisableComponent } from './table-datatables-enable-disable.component';

describe('TableDatatablesEnableDisableComponent', () => {
  let component: TableDatatablesEnableDisableComponent;
  let fixture: ComponentFixture<TableDatatablesEnableDisableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDatatablesEnableDisableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDatatablesEnableDisableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
