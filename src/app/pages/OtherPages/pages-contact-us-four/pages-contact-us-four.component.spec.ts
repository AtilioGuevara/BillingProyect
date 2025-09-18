import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesContactUsFourComponent } from './pages-contact-us-four.component';

describe('PagesContactUsFourComponent', () => {
  let component: PagesContactUsFourComponent;
  let fixture: ComponentFixture<PagesContactUsFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesContactUsFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesContactUsFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
