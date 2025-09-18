import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAdvancedWordCounterComponent } from './ui-advanced-word-counter.component';

describe('UiAdvancedWordCounterComponent', () => {
  let component: UiAdvancedWordCounterComponent;
  let fixture: ComponentFixture<UiAdvancedWordCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiAdvancedWordCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiAdvancedWordCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
