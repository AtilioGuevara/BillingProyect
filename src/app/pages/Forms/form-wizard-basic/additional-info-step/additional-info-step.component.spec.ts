import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInfoStepComponent } from './additional-info-step.component';

describe('AdditionalInfoStepComponent', () => {
  let component: AdditionalInfoStepComponent;
  let fixture: ComponentFixture<AdditionalInfoStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionalInfoStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalInfoStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
