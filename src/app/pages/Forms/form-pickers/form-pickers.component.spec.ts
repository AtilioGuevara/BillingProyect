import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPickersComponent } from './form-pickers.component';

describe('FormPickersComponent', () => {
  let component: FormPickersComponent;
  let fixture: ComponentFixture<FormPickersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPickersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPickersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
