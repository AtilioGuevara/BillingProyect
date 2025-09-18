import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallModalComponent } from './video-call-modal.component';

describe('VideoCallModalComponent', () => {
  let component: VideoCallModalComponent;
  let fixture: ComponentFixture<VideoCallModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoCallModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoCallModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
