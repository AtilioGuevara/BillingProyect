import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditorsComponent } from './form-editors.component';

describe('FormEditorsComponent', () => {
  let component: FormEditorsComponent;
  let fixture: ComponentFixture<FormEditorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
