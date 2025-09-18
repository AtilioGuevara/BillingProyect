import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiGalleryComponent } from './ui-gallery.component';

describe('UiGalleryComponent', () => {
  let component: UiGalleryComponent;
  let fixture: ComponentFixture<UiGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
