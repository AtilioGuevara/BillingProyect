import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsSchoolLibraryBookComponent } from './apps-school-library-book.component';

describe('AppsSchoolLibraryBookComponent', () => {
  let component: AppsSchoolLibraryBookComponent;
  let fixture: ComponentFixture<AppsSchoolLibraryBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsSchoolLibraryBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsSchoolLibraryBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
