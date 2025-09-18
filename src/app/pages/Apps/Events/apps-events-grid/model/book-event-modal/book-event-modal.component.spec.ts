import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEventModalComponent } from './book-event-modal.component';

describe('BookEventModalComponent', () => {
  let component: BookEventModalComponent;
  let fixture: ComponentFixture<BookEventModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookEventModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
