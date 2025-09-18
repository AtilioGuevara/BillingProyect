import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesUserNotesComponent } from './pages-user-notes.component';

describe('PagesUserNotesComponent', () => {
  let component: PagesUserNotesComponent;
  let fixture: ComponentFixture<PagesUserNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesUserNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesUserNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
