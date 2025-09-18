import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesContactUsTwoComponent } from './pages-contact-us-two.component';

describe('PagesContactUsTwoComponent', () => {
  let component: PagesContactUsTwoComponent;
  let fixture: ComponentFixture<PagesContactUsTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesContactUsTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesContactUsTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
