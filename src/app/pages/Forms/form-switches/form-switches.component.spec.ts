import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSwitchesComponent } from './form-switches.component';

describe('FormSwitchesComponent', () => {
  let component: FormSwitchesComponent;
  let fixture: ComponentFixture<FormSwitchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSwitchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSwitchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
