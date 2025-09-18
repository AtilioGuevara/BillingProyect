import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAdvancedBotComponent } from './ui-advanced-bot.component';

describe('UiAdvancedBotComponent', () => {
  let component: UiAdvancedBotComponent;
  let fixture: ComponentFixture<UiAdvancedBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiAdvancedBotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiAdvancedBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
