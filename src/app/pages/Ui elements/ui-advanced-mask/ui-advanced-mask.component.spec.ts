import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAdvancedMaskComponent } from './ui-advanced-mask.component';

describe('UiAdvancedMaskComponent', () => {
  let component: UiAdvancedMaskComponent;
  let fixture: ComponentFixture<UiAdvancedMaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiAdvancedMaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiAdvancedMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
