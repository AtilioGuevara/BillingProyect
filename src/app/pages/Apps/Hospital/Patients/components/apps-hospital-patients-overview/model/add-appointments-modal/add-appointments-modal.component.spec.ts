import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppointmentsModalComponent } from './add-appointments-modal.component';

describe('AddAppointmentsModalComponent', () => {
  let component: AddAppointmentsModalComponent;
  let fixture: ComponentFixture<AddAppointmentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAppointmentsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAppointmentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
