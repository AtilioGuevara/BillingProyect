import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOverviewModalComponent } from './book-overview-modal.component';

describe('BookOverviewModalComponent', () => {
  let component: BookOverviewModalComponent;
  let fixture: ComponentFixture<BookOverviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookOverviewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookOverviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
