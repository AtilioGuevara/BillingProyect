import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFileInputComponent } from './form-file-input.component';

describe('FormFileInputComponent', () => {
  let component: FormFileInputComponent;
  let fixture: ComponentFixture<FormFileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFileInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
