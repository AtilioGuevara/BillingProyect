import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAdvancedSimplebarComponent } from './ui-advanced-simplebar.component';

describe('UiAdvancedSimplebarComponent', () => {
  let component: UiAdvancedSimplebarComponent;
  let fixture: ComponentFixture<UiAdvancedSimplebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiAdvancedSimplebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiAdvancedSimplebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
