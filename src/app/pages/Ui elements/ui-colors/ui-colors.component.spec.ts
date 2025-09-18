import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiColorsComponent } from './ui-colors.component';

describe('UiColorsComponent', () => {
  let component: UiColorsComponent;
  let fixture: ComponentFixture<UiColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiColorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
