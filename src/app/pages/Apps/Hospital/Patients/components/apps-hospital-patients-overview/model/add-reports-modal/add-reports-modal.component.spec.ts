import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReportsModalComponent } from './add-reports-modal.component';

describe('AddReportsModalComponent', () => {
  let component: AddReportsModalComponent;
  let fixture: ComponentFixture<AddReportsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReportsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReportsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
