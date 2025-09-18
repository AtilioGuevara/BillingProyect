import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTicketModalComponent } from './new-ticket-modal.component';

describe('NewTicketModalComponent', () => {
  let component: NewTicketModalComponent;
  let fixture: ComponentFixture<NewTicketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTicketModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
