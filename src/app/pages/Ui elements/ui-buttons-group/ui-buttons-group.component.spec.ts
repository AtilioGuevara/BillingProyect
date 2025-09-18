import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiButtonsGroupComponent } from './ui-buttons-group.component';

describe('UiButtonsGroupComponent', () => {
  let component: UiButtonsGroupComponent;
  let fixture: ComponentFixture<UiButtonsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiButtonsGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiButtonsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
