import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAdvancedAnimationComponent } from './ui-advanced-animation.component';

describe('UiAdvancedAnimationComponent', () => {
  let component: UiAdvancedAnimationComponent;
  let fixture: ComponentFixture<UiAdvancedAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiAdvancedAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiAdvancedAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
