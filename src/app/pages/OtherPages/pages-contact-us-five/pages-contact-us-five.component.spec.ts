import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesContactUsFiveComponent } from './pages-contact-us-five.component';

describe('PagesContactUsFiveComponent', () => {
  let component: PagesContactUsFiveComponent;
  let fixture: ComponentFixture<PagesContactUsFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesContactUsFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesContactUsFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
