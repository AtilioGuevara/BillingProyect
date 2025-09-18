import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTooltipsComponent } from './ui-tooltips.component';

describe('UiTooltipsComponent', () => {
  let component: UiTooltipsComponent;
  let fixture: ComponentFixture<UiTooltipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiTooltipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiTooltipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
