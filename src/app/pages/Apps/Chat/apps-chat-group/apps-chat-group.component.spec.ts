import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsChatGroupComponent } from './apps-chat-group.component';

describe('AppsChatGroupComponent', () => {
  let component: AppsChatGroupComponent;
  let fixture: ComponentFixture<AppsChatGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsChatGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsChatGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
