import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicineModalComponent } from './add-medicine-modal.component';

describe('AddMedicineModalComponent', () => {
  let component: AddMedicineModalComponent;
  let fixture: ComponentFixture<AddMedicineModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMedicineModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMedicineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
