import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAdvancedSwiperComponent } from './ui-advanced-swiper.component';

describe('UiAdvancedSwiperComponent', () => {
  let component: UiAdvancedSwiperComponent;
  let fixture: ComponentFixture<UiAdvancedSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiAdvancedSwiperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiAdvancedSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
