import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewChatModalsComponent } from './add-new-chat-modals.component';

describe('AddNewChatModalsComponent', () => {
  let component: AddNewChatModalsComponent;
  let fixture: ComponentFixture<AddNewChatModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewChatModalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewChatModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
