import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineTableComponent } from './medicine-table.component';

describe('MedicineTableComponent', () => {
  let component: MedicineTableComponent;
  let fixture: ComponentFixture<MedicineTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
