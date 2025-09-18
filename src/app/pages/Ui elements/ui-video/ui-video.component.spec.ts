import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiVideoComponent } from './ui-video.component';

describe('UiVideoComponent', () => {
  let component: UiVideoComponent;
  let fixture: ComponentFixture<UiVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
