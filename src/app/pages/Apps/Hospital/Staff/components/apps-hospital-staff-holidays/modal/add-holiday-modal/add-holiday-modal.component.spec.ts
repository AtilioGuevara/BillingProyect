import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHolidayModalComponent } from './add-holiday-modal.component';

describe('AddHolidayModalComponent', () => {
  let component: AddHolidayModalComponent;
  let fixture: ComponentFixture<AddHolidayModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHolidayModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHolidayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
