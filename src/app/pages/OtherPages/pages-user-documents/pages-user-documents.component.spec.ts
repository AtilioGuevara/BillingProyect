import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesUserDocumentsComponent } from './pages-user-documents.component';

describe('PagesUserDocumentsComponent', () => {
  let component: PagesUserDocumentsComponent;
  let fixture: ComponentFixture<PagesUserDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesUserDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesUserDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
