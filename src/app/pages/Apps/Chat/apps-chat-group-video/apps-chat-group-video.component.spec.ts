import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsChatGroupVideoComponent } from './apps-chat-group-video.component';

describe('AppsChatGroupVideoComponent', () => {
  let component: AppsChatGroupVideoComponent;
  let fixture: ComponentFixture<AppsChatGroupVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsChatGroupVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsChatGroupVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
