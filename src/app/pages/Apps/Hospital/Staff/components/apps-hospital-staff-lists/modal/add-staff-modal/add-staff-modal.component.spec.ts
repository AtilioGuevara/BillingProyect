import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffModalComponent } from './add-staff-modal.component';

describe('AddStaffModalComponent', () => {
  let component: AddStaffModalComponent;
  let fixture: ComponentFixture<AddStaffModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStaffModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStaffModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
