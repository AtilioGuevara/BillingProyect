import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiButtonNavigationComponent } from './ui-button-navigation.component';

describe('UiButtonNavigationComponent', () => {
  let component: UiButtonNavigationComponent;
  let fixture: ComponentFixture<UiButtonNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiButtonNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiButtonNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
