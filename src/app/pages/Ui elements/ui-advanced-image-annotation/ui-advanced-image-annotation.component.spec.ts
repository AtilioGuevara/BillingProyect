import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAdvancedImageAnnotationComponent } from './ui-advanced-image-annotation.component';

describe('UiAdvancedImageAnnotationComponent', () => {
  let component: UiAdvancedImageAnnotationComponent;
  let fixture: ComponentFixture<UiAdvancedImageAnnotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiAdvancedImageAnnotationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiAdvancedImageAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
