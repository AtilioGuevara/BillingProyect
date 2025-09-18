import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsChatDefaultComponent } from './apps-chat-default.component';

describe('AppsChatDefaultComponent', () => {
  let component: AppsChatDefaultComponent;
  let fixture: ComponentFixture<AppsChatDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsChatDefaultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsChatDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
