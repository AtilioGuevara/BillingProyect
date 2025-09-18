import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRangeComponent } from './form-range.component';

describe('FormRangeComponent', () => {
  let component: FormRangeComponent;
  let fixture: ComponentFixture<FormRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
