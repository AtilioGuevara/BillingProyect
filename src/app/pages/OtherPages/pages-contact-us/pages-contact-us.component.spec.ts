import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesContactUsComponent } from './pages-contact-us.component';

describe('PagesContactUsComponent', () => {
  let component: PagesContactUsComponent;
  let fixture: ComponentFixture<PagesContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesContactUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
