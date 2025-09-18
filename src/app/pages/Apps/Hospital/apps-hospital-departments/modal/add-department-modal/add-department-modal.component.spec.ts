import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartmentModalComponent } from './add-department-modal.component';

describe('AddDepartmentModalComponent', () => {
  let component: AddDepartmentModalComponent;
  let fixture: ComponentFixture<AddDepartmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDepartmentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDepartmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
