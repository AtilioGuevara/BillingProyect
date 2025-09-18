import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAutosizeComponent } from './form-autosize.component';

describe('FormAutosizeComponent', () => {
  let component: FormAutosizeComponent;
  let fixture: ComponentFixture<FormAutosizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAutosizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAutosizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
