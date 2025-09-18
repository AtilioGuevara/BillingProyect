import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSalEditComponent } from './emp-sal-edit.component';

describe('EmpSalEditComponent', () => {
  let component: EmpSalEditComponent;
  let fixture: ComponentFixture<EmpSalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpSalEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpSalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
