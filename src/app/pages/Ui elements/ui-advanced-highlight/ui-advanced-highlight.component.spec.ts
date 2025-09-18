import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAdvancedHighlightComponent } from './ui-advanced-highlight.component';

describe('UiAdvancedHighlightComponent', () => {
  let component: UiAdvancedHighlightComponent;
  let fixture: ComponentFixture<UiAdvancedHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiAdvancedHighlightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiAdvancedHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
