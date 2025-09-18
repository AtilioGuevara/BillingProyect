import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAdvancedThreeDEffectComponent } from './ui-advanced-three-d-effect.component';

describe('UiAdvancedThreeDEffectComponent', () => {
  let component: UiAdvancedThreeDEffectComponent;
  let fixture: ComponentFixture<UiAdvancedThreeDEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiAdvancedThreeDEffectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiAdvancedThreeDEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
